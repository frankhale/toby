;
; A simple store to archive YouTube search results
;
; Frank Hale <frankhale@gmail.com>
; 7 September 2015
;
; License: GNU GPL v2
;

(ns toby.archive.core)

(def lodash (.-_ js/window))
(def moment (.-moment js/window))
(def expiration 3600000) ; Going to hard code this for now

; The schema of this array has not been defined yet. This is an array of objects
; so off the top of my head an object will probably look like this:
;
; {
;   "search-term": "Dash Berlin"
;   "time-added": "the time these results were added to the archive"
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
(def store (atom []))

;
; store will contain an array of objects which consist of the the following:
;
;  - search term
;  - search results
;  - time added to store
;  - length of time until expiration
;
; Basically what I'm going to do to get started is that we'll just call this
; function and it will determine if the results need to be added or not.
; Initially this will make this simpler. We'll just call it each time a YouTube
; search is performed [and add the results as necessary].
(defn add-to [search-term results]
  (let [search-term-lower (.trim (.toLowerCase search-term))
        found (.find lodash (to-array @store) #js { :search-term search-term-lower })]
    (when (nil? found)
      (js/console.log (str "adding " search-term " to archive...")
      (swap! store conj #js {
          :search-term search-term-lower
          :time-added (.format (moment.))
          :results results
        })))))

(defn get-from [search-term]
  (let [search-term-lower (.trim (.toLowerCase search-term))
        found (.find lodash (to-array @store) #js { :search-term search-term-lower })]
    (if-not (nil? found)
      (.-results found))
      []))

(defn run-expire []
  (.setInterval js/window (fn [] (
    (when-not (empty? @store)
      ; figure out if any of the various search results need to be expired
      ()))) expiration))
