(ns toby.server.core)

(def io ((js/require "socket.io")))
(def lodash (.-_ js/window))

(def listeners (atom []))
(def socketio (atom nil))

(defn send [type data]
  (when-not (nil? socketio)
    (.emit @socketio type data)))

(defn on [type func]
  (swap! listeners conj #js { :type type :func func }))

(defn fire
  ([type]
    (fire type nil))
  ([type data]
  (when (> (.-length (clj->js @listeners)) 0)
   (let [ls (.where lodash (clj->js @listeners) (clj->js { :type type }))]
     (.forEach lodash ls (fn [l]
        (if-not (nil? data)
          (.func l data)
          (.func l))))))))

(defn listen [port]
  (do
    (.listen io port)
    (js/console.log (str "socket.io server listening on port: " port))
    (.on io "connection"
      (fn [socket]
        (do
          (.on socket "error" (fn [err] (js/console.log err)))
          (.on socket "video-info" (fn [data] (fire "video-info" data)))
          ;(.on socket "youtube-player-state-changed" (fn [data] (js/console.log data)))
          (.on socket "youtube-api-ready"
            (fn []
              (do
                (reset! socketio socket)
                (js/console.log "call fire for youtube api ready...")
                (fire "youtube-api-ready")))))))))
