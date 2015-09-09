;
; A simple cache to store YouTube search results
;
; Frank Hale <frankhale@gmail.com>
; 8 September 2015
;
; License: GNU GPL v2
;

(ns toby.cache.core)

(def lodash (.-_ js/window))
(def moment (.-moment js/window))
(def expiration-cycle 900000) ; every 15 minutes

; {
;   "searchTerm": "Dash Berlin"
;   "timeAdded": "the time these results were added to the archive"
;   "expiresAfter:" "the time these results were added to the archive plus 1 hour"
;   "results": [
;     {
;       "description": "The Video Title",
;       "ytid": "The YouTube Video ID",
;       "thumbnails": {
;         "default": {
;           "url": "https://i.ytimg.com/vi/p68MTskBUnM/default.jpg"
;         },
;         "medium": {
;           "url": "https://i.ytimg.com/vi/p68MTskBUnM/mqdefault.jpg"
;         },
;         "high": {
;           "url": "https://i.ytimg.com/vi/p68MTskBUnM/hqdefault.jpg"
;         }
;       }
;     }
;   ]
; }
(def cache (atom []))

(defn add-to [search-term results]
  (let [search-term-lower (.trim (.toLowerCase search-term))
        now (.format (moment.))
        expire-after (.format (.add (moment.) 30 "minutes"))
        found (.find lodash (to-array @cache) #js { :searchTerm search-term-lower })]
    (when (nil? found)
      (swap! cache conj #js {
         :searchTerm search-term-lower
         :timeAdded now
         :expireAfter expire-after
         :results results
       }))))

(defn get-from [search-term]
  (when-not (empty? search-term)
    (let [search-term-lower (.trim (.toLowerCase search-term))
          found (.find lodash (to-array @cache) #js { :searchTerm search-term-lower })]
      (if-not (nil? found)
        (.-results found)
        [])))
  [])

(defn run-expire []
  (.setInterval js/window (fn []
    (when-not (empty? @cache)
      (.forEach lodash (to-array @cache)
        (fn [r]
          (let [now (moment.)
                is-expire-time-after-now (.isAfter (moment. (.-expireAfter r)) (moment.))]
            (when-not is-expire-time-after-now
              (let [cache-without-this-item (.reject lodash (to-array @cache) #js { "searchTerm" (.trim (.-searchTerm r))})]
                (reset! cache (into [] cache-without-this-item))))))))) expiration-cycle))
