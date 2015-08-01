;
; Toby - A YouTube player for the desktop
;
; Frank Hale <frankhale@gmail.com>
; 31 July 2015
;
; License: GNU GPL v2
;

(ns toby.core
  (:require
    [toby.server.core :as server]
    [jayq.core :as jq]
    [om.core :as om]
    [om.dom :as dom]))

(def fs (js/require "fs"))
(def path (js/require "path"))
(def process (js/require "process"))
(def remote (js/require "remote"))
(def keymaster (js/require "keymaster"))
(def shell (js/require "shell"))
(def search-youtube (js/require "youtube-search"))
(def browser (.getCurrentWindow remote))
(def browser-cookies (.-cookies (.-session (.-webContents browser))))
(def io (js/require "socket.io"))
(def lodash (.-_ js/window))

(def base-path (apply str (interpose path.sep [(.cwd process) "resources" "app"])))
(def assets-path (apply str (interpose path.sep [base-path "assets"])))
(def package-json-path (apply str (interpose path.sep [base-path "package.json"])))
(def data-path (apply str (interpose path.sep [assets-path "data"])))
(def data-json-path (apply str (interpose path.sep [data-path "data.json"])))
(def recently-played-json-path (apply str (interpose path.sep [data-path "recent.json"])))
(def youtube-api-key "AIzaSyB7AFwYCoI6ypTTSB2vnXdOtAe4hu5nP1E")
(def recently-played-entry-limit 50)
(def new-video-notification-display-timeout 2500)
(def server-port 5150)
(def video-filter-grayscale-value (atom 0))
(def video-filter-saturate-value (atom 0))
(def video-filter-sepia-value (atom 0))

(def app-title "Toby - A YouTube player for the desktop")

(defn load-data-file []
  (let [no-data #js { :groups [] :videos [] }]
    (try
      (let [data (.readFileSync fs data-json-path)
            data-obj (.parse js/JSON (.toString data))
            videos (.pluck lodash data-obj "videos")
            flattened-videos (.flatten lodash videos)
            final-data #js {
              :groups data-obj
              :videos flattened-videos
            }]
          final-data)
      (catch js/Object e no-data))))

(defn load-package-json []
  (let [no-data #js []]
    (try
      (let [data (.readFileSync fs package-json-path)
            data-obj (.parse js/JSON (.toString data))]
          data-obj)
      (catch js/Object e no-data))))

(defn load-recently-played-data-file []
  (let [no-data #js []]
    (try
      (let [data (.readFileSync fs recently-played-json-path)
            data-obj (.parse js/JSON (.toString data))]
          data-obj)
      (catch js/Object e no-data))))

; resizes the search box and search results DOM elements to fill up the window
; size proportionally.
(defn resize-search-elements [owner]
  (let [browser-size (.getContentSize browser)
        search-box (om/get-node owner "search-box")
        search-results (om/get-node owner "search-results")]
    (set! (.-height (.-style search-results)) (str (- (last browser-size) 100) "px"))
    (set! (.-width (.-style search-box)) (str (- (first browser-size) 20) "px"))))

(defn watch-file [file-path data-changed]
  (.watchFile fs file-path
    (fn [curr prev]
      (data-changed))))

(defn clear-search-box [owner]
  (let [search-box (om/get-node owner "search-box")]
    (when (> (.-length (.-value search-box)) 0)
      (set! (.-value search-box) ""))))

(defn update-recently-played-data-file [recently-played-data]
 (let [rpl-with-limit (.take lodash recently-played-data recently-played-entry-limit)]
   (.writeFile fs recently-played-json-path (.stringify js/JSON rpl-with-limit js/undefined 2)
    (fn [err] (when err (js/throw err))))))

; Oh no, LOL! There are circular dependencies ahead for add-to-recently-played-and-update-file
; and play-video
(declare play-video)

; Need to wait until we get all the information. This will be called
; multiple times and it appears as though YouTube doesn't provide the
; title on the first time, we have to wait until the video title is
; provided before we actually add this video to the recently played
; list.
(defn add-to-recently-played-and-update-file [video owner]
 (let [recently-played-data (om/get-state owner :recently-played-data)
       found (.find lodash recently-played-data #js { :ytid (.-ytid video) })]
   (when (and (not (empty? (.-description video))) (= found js/undefined))
     (let [new-rpl (.slice recently-played-data)]
       (.unshift new-rpl #js { :description (.-description video) :ytid (.-ytid video) :play-video (play-video video owner) })
       (update-recently-played-data-file new-rpl)))))

(defn play-video [video owner]
  (fn []
    (add-to-recently-played-and-update-file #js { :description (.-description video) :ytid (.-ytid video) } owner)
    (server/send "play" (.-ytid video))
    (clear-search-box owner)
    (om/update-state! owner #(assoc %
      :search-results []
      :current-video-title (.-description video)
      :current-video-id (.-ytid video)
      :webview-style #js { :visibility "visible" }
      :search-list-style #js { :display "none" }
      :search-results-style #js { :display "none" }
      :recently-played-style #js { :display "none" }))))

(defn show-recently-played-list-if-exists [owner]
 (let [recently-played-data (om/get-state owner :recently-played-data)]
   (when (> (.-length recently-played-data) 0)
     (om/set-state! owner :recently-played-style #js { :display "block" }))))

(defn get-search-results-from-youtube [search-term done]
  (search-youtube search-term #js { :maxResults 25, :key youtube-api-key, :type "video" } (fn [err results]
    (if-not err
      (done (apply array (map (fn [r] #js { :description (.-title r) :ytid (.-id r) }) results)))
      []))))

(defn get-search-results-from-data [data search-term]
  (let [results (.filter lodash data (fn [v] (.includes (.toLowerCase (.-description v)) search-term)))]
    (if (> (.-length results) 0)
      results
      [])))

(defn get-search-results-from-group [data group]
  (if (= group "all")
    (.-videos data)
    (let [group-data (.find lodash (.-groups data) (fn [g] (= group (.toLowerCase (.-title g)))))]
      (if (and (not (= group-data js/undefined)) (> (.-length (.-videos group-data)) 0))
        (.-videos group-data)
        []))))

(defn show-search-results [results owner]
  (if (= (.-length results) 1)
    ((play-video (first results) owner))
    (let [current-display (.-display (om/get-state owner :search-results-style))
          display (if (and (not= results js/undefined) (> (.-length results) 0)) "block" "none")]
      (when-not (= current-display display)
        (om/update-state! owner #(assoc %
        :search-results results
        :search-results-style #js { :display display }))))))

(defn handle-search [e owner]
  (if (and (= (.-keyCode e) 13) (> (.-length (.-value (.-target e))) 0))
    (let [video-data (om/get-state owner :video-data)
          search-term (.trim (.-value (.-target e)))
          search-term-lower (.trim (.toLowerCase search-term))]
      (if (re-matches #"^(youtube:|yt:)[\s\w\W]+" search-term-lower)
        (get-search-results-from-youtube (clojure.string/replace search-term-lower #"^(youtube:|yt:)" "")
          (fn [data-results] (show-search-results data-results owner)))
        (if (re-matches #"^(group:|g:)[\s\w\W]+" search-term-lower)
          (when-let [data-results (get-search-results-from-group video-data (.trim (clojure.string/replace search-term-lower #"^(group:|g:)" "")))]
            (show-search-results data-results owner))
          (let [data-results (get-search-results-from-data (.-videos video-data) search-term-lower)]
            (if (> (.-length data-results) 0)
              (show-search-results data-results owner)
              (get-search-results-from-youtube search-term-lower
                (fn [data-results] (show-search-results data-results owner))))))))
    (show-search-results #js [] owner)))

(defn toggle-search-play-list-and-webview [owner]
  (let [recently-played-data (om/get-state owner :recently-played-data)
        search-list-style (om/get-state owner :search-list-style)
        current-video-id (om/get-state owner :current-video-id)
        current-video-title (om/get-state owner :current-video-title)]
    (when-not (and (empty? current-video-title) (empty? current-video-id))
     (if (= search-list-style.display "block")
       (do
         (om/update-state! owner #(assoc %
           :search-list-style #js { :display "none" }
           :search-results-style #js { :display "none" }
           :recently-played-style #js { :display "none" }
           :webview-style #js { :visibility "visible" }))
         (.setTitle browser current-video-title)
         (clear-search-box owner))
       (do
         (om/update-state! owner #(assoc %
           :search-list-style #js { :display "block" }
           :recently-played-style #js { :display (if (> (.-length recently-played-data) 0) (str "block") (str "none")) }
           :webview-style #js { :visibility "hidden" }))
         (.setTitle browser app-title))))))

(defn handle-click [e owner]
  (let [title e.target.text
       dataset (.-dataset (. e -target))
       ytid (aget dataset "ytid")]
     ((play-video #js { :description title :ytid ytid } owner))))

(defn update-title [new-title ytid owner]
  (let [current-video-title (om/get-state owner :current-video-title)]
    (when (and (not (empty? new-title)) (not (= new-title current-video-title)))
      (om/update-state! owner #(assoc % :current-video-title new-title :current-video-id ytid))
      ; TODO: This should not be in this function!
      (when-not (= current-video-title "Play video with YouTube ID:")
        (add-to-recently-played-and-update-file #js { :description new-title :ytid ytid } owner)))))

(defn is-current-video-info-set [owner]
  (let [current-video-title (om/get-state owner :current-video-title)
        current-video-id (om/get-state owner :current-video-id)]
    (if (and (not (empty? current-video-id)) (not (empty? current-video-title)))
      true
      false)))

(defn add-video-to-misc-group [video-data new-entry]
  (let [misc-group (.find lodash (.-groups video-data) #js { :title "misc" })
        misc-group-entry #js { :title "misc" :videos #js [ new-entry ] }]
    (.push (.-videos video-data) new-entry)
    (if (= misc-group js/undefined)
      (do
        (.push (.-groups video-data) misc-group-entry)
        video-data)
      (do
        (.push (.-videos misc-group) new-entry)
        video-data))))

; At the end of a video a list of other videos is displayed. If a user
; clicks on one of these videos let's allow them to add that video if
; they like it to their data.json file.
;
; We'll add it to a group called 'misc' for the time being
(defn add-current-video-to-data-json [owner]
  (when (is-current-video-info-set owner)
    (let [current-video-title (om/get-state owner :current-video-title)
          current-video-id (om/get-state owner :current-video-id)
          new-entry #js { :description current-video-title :ytid current-video-id }
          video-data (clj->js (om/get-state owner :video-data))
          found-in-mem (.find lodash (.-videos video-data) #js { :ytid current-video-id })
          found-in-file (.find lodash (.-videos (load-data-file)) #js { :ytid current-video-id })]
      (when (and (= found-in-mem js/undefined) (= found-in-file js/undefined))
        (let [updated-video-data (add-video-to-misc-group video-data new-entry)
              json-obj (.stringify js/JSON (.-groups updated-video-data) js/undefined 2)]
          (.writeFile fs data-json-path json-obj (fn [err] (when err (js/console.log err))))
          (om/update-state! owner #(assoc %
            :video-data updated-video-data
            :new-video-notification (str "Added: " current-video-title)))
          (.setTimeout js/window (goog/bind (fn [] (om/set-state! owner :new-video-notification "")) owner) new-video-notification-display-timeout))))))

(defn add-play-handlers-to-recently-played-videos [owner]
  (.forEach lodash (om/get-state owner :recently-played-data)
    (fn [v] ((set! (.-play-video v) #(play-video v owner))))))

(defn recently-played-list-resize [owner]
  (let [browser-size (.getContentSize browser)
        recently-played (om/get-node owner "recently-played")
        recently-played-list (om/get-node owner "recently-played-list")]
    (set! (.-width (.-style recently-played)) (str (- (first browser-size) 30) "px"))
    (set! (.-height (.-style recently-played-list)) (str (- (last browser-size) 120) "px"))))

(defn toggle-video-filter-value [video-filter-atom min max]
  (if (= @video-filter-atom min)
    (reset! video-filter-atom max)
    (reset! video-filter-atom min))
  (str @video-filter-atom))

(defn set-youtube-transparent-ui []
  (.remove browser-cookies #js { :name "VISITOR_INFO1_LIVE" :url "http://youtube.com" } (fn [error] (when-not (nil? error) (js/console.log error))))
  (.set browser-cookies #js { :name "VISITOR_INFO1_LIVE" :value "Q06SngRDTGA" :url "http://youtube.com" :domain ".youtube.com" } (fn [error cookies] (when-not (nil? error) (js/console.log error)))))

;
; Notification component
;
(defn notification [data owner]
 (reify
   om/IInitState
   (init-state [_]
     { :notification-style #js { :display "none" }
       :message (:message data) })
   om/IWillReceiveProps
   (will-receive-props [_ next-props]
     (when-not (= (.-length (:message next-props)) 0)
        (om/set-state! owner { :message (:message next-props)
                               :notification-style #js { :display "block" } })
        ; set a timeout to hide the notification after 2.5 seconds
        (js/setTimeout
           (goog/bind
             (fn [] (om/set-state! owner { :notification-style #js { :display "none" } :message "" }))
             owner) new-video-notification-display-timeout)))
   om/IRenderState
   (render-state [_ {:keys [ notification-style message ] } ]
     (dom/div #js { :id "notification" :style notification-style } message))))

;
; Getting started component
;
; Eventually:
;   - List the various key bindings
;   - External link to README
;
; (defn getting-started-component [data owner]
;  (reify
;    om/IRender
;    (render [_]
;      (dom/div #js { :id "getting-started" }
;        (dom/h1 nil "Getting Started")))))

;
; Recently played list component
;
(defn recently-played-list [data owner]
  (reify
    om/IDidMount
    (did-mount [_]
      (.addEventListener js/window "resize" (fn [e] (recently-played-list-resize owner)))
      (recently-played-list-resize owner))
    om/IRender
    (render [_]
      (dom/div #js { :id "recently-played" :ref "recently-played" :style (:style data) }
        (dom/div #js { :id "recently-played-header" } "Recently Played")
        (dom/div #js { :id "recently-played-list" :ref "recently-played-list" }
          (apply dom/div nil
            (map (fn [r] (dom/a #js {
              :href "#"
              :data-ytid (.-ytid r)
              :onClick (.-play-video r)
              } (.-description r))) (.sortBy lodash (:videos data) "description"))))))))

;
; Video playback component
;
(defn video-playback [data owner]
  (reify
    om/IDidMount
    (did-mount [_]
      (let [webview (om/get-node owner "webview")]
        (.addEventListener webview "new-window" (fn [e] (.openExternal shell e.url)))
        (server/on "video-info" (goog/bind (fn [data]
          (let [update-title (om/get-state owner :update-title)]
            (.setTitle browser (.-title data))
            (when-not (= update-title js/undefined)
              (update-title (.-title data) (.-video_id data)))
                owner))))))
    om/IWillReceiveProps
    (will-receive-props [_ next-props]
      (om/update-state! owner #(assoc %
        :style (:style next-props)
        :update-title (:update-title next-props))))
    om/IRenderState
    (render-state [_ {:keys [style
                             update-title]}]
      (dom/div nil
        (js/React.createElement "webview" #js {
          :id "webview"
          :ref "webview"
          :src "../html/player.html"
          :style style })))))

;
; Video search component
;
(defn video-search [data owner]
  (reify
    om/IInitState
    (init-state [_]
      { :package (load-package-json)
        :video-data (load-data-file)
        :recently-played-data (load-recently-played-data-file)
        :search-results []
        :search-list-style #js { :display "block" }
        :search-results-style #js { :display "none" }
        :recently-played-style #js { :display "none" }
        :webview-style #js { :visibility "hidden" }
        :current-video-title ""
        :current-video-id ""
        :new-video-notification ""
        :update-title (goog/bind (fn [title ytid] (update-title title ytid owner)) owner) })
    om/IDidMount
    (did-mount [_]
      (set! (.-filter keymaster) (fn [e] true)) ; disable input et al filtering
      (keymaster "f1" #(toggle-search-play-list-and-webview owner))
      (keymaster "f5" #(add-current-video-to-data-json owner))
      (keymaster "f7" #(server/send "video-settings" #js { :grayscale (toggle-video-filter-value video-filter-grayscale-value 0 1) }))
      (keymaster "f8" #(server/send "video-settings" #js { :saturate (toggle-video-filter-value video-filter-saturate-value 0 2.5) }))
      (keymaster "f9" #(server/send "video-settings" #js { :sepia (toggle-video-filter-value video-filter-sepia-value 0 1) }))
      (keymaster "ctrl+r" (fn []
                            (server/close)
                            (.reload browser)))
      (.addEventListener js/window "resize" (fn [e] (resize-search-elements owner)))
      (resize-search-elements owner)
      (watch-file data-json-path (fn []
        (let [data (load-data-file)]
        (om/set-state! owner :video-data data))))
      (watch-file recently-played-json-path
        (fn []
          (let [data (load-recently-played-data-file)]
            (if (> (.-length data) 0)
              (do
                (om/set-state! owner :recently-played-data data)
                (om/set-state! owner :recently-played-style #js { :display "block" })
                (add-play-handlers-to-recently-played-videos owner))
              (om/set-state! owner :recently-played-style #js { :display "none" })))))
      (let [rpd (om/get-state owner :recently-played-data)]
        (when (> (.-length rpd) 0)
          (om/set-state! owner :recently-played-style #js { :display "block" })))
      (add-play-handlers-to-recently-played-videos owner))
    om/IRenderState
    (render-state [_ {:keys [package
                             search-results
                             recently-played-data
                             recently-played-style
                             search-list-style
                             search-results-style
                             webview-style
                             new-video-notification
                             update-title]}]
     (dom/div #js { :id "main-content" }
      (dom/h1 #js { :className "subdued-text" } (str (.-name package) " " (.-version package)))
      (dom/div #js { :id "search-list" :ref "search-list" :style search-list-style }
        (dom/input #js {
            :type "text"
            :id "search-box"
            :ref "search-box"
            :placeholder "search youtube or your saved videos..."
            :onKeyDown #(handle-search % owner) })
        (dom/div #js { :id "search-results" :ref "search-results" :style search-results-style }
          (apply dom/div nil
            (map (fn [video] (dom/a #js {
                   :href "#"
                   :data-ytid (.-ytid video)
                   :onClick #(handle-click % owner) } (.-description video))) search-results))))
        (om/build recently-played-list { :videos recently-played-data :style recently-played-style})
        (om/build video-playback { :style webview-style :update-title update-title })
        (om/build notification { :message new-video-notification })))))

(jq/document-ready
  (do
    (server/listen server-port)
    (om/root video-search [] {:target (. js/document (getElementById "ui"))})
    (server/on "youtube-api-ready"
      (fn []
        (let [$mc (jq/$ :#main-content)
              $loading (jq/$ :#loading)]
          (set-youtube-transparent-ui)
          (jq/css $mc {:visibility "visible"})
          (jq/fade-out $loading "fast")
          (jq/fade-in (jq/hide $mc) "slow"))))))
