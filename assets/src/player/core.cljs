;
; Toby - A YouTube player for the desktop
;
; Frank Hale <frankhale@gmail.com>
; 4 September 2015
;
; License: GNU GPL v2
;
(ns player.core)

(def player (atom nil))
(def video-title (atom nil))
(def socket (js/io "http://localhost:5150"))
(def lodash (.-_ js/window))

(def tag (.createElement js/document "script"))
(def first-script-tag (first (array-seq (.getElementsByTagName js/document "script"))))

(defn on-player-state-change [e]
 (let [video-info (.getVideoData (.-target e))]
  (when-not (= @video-title video-info.title)
    (reset! video-title video-info.title)
    (.emit socket "video-info" video-info))))

(defn set-webkit-filter [video-player setting value]
  (.css video-player "-webkit-filter" (str setting "(" value ")")))

(defn hide-annotations []
  ; NOTE: This may or may not be enough to stop all annotations, will revisit if I find
  ; a video that this doesn't work on.
  (let [video-player (.contents (js/jQuery "#player"))
        annotations (.find video-player ".annotation")
        legacy-annotations (.find video-player ".video-legacy-annotations")]
    (.css annotations "display" "none")
    (.css legacy-annotations "display" "none")))

; well clicking one of the suggested videos added the thumbnails to the recently
; played list, at least I did something right! LOL! =)

(defn on-youtube-api-ready []
  (.emit socket "youtube-api-ready")
  (.on socket "play" (fn [ytid]
   (if (nil? @player)
     (do
       (reset! player (YT.Player. "player" #js {
         :videoId ytid
         :playerVars #js { :autoplay 1 :autohide 1 }
         :events #js { :onStateChange on-player-state-change }}))
       (js/setInterval hide-annotations 1000)
       (.on socket "video-settings" (fn [settings]
         (let [video-player (.find (.contents (js/jQuery "#player")) ".html5-main-video")
               grayscale-value (.-grayscale settings)
               saturate-value (.-saturate settings)
               sepia-value (.-sepia settings)]
           (when-not (= grayscale-value js/undefined)
            (set-webkit-filter video-player "grayscale" grayscale-value))
           (when-not (= saturate-value js/undefined)
            (set-webkit-filter video-player "saturate" saturate-value))
           (when-not (= sepia-value js/undefined)
            (set-webkit-filter video-player "sepia" sepia-value))))))
      (.loadVideoById @player ytid)))))

(aset js/window "onYouTubeIframeAPIReady" on-youtube-api-ready)
(set! (.-src tag) "https://www.youtube.com/iframe_api")
(.insertBefore (.-parentNode first-script-tag) tag first-script-tag)
