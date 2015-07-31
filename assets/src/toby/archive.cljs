;
; A simple store to archive YouTube search results
;
; TODO: Will implement this later...
;
; Frank Hale <frankhale@gmail.com>
; 31 July 2015
;
; License: GNU GPL v2
;

(ns toby.archive)

(def lodash (.-_ js/window))

(def store (atom []))

;
; store will contain an array of objects which consist of the the following:
;
;  - search term
;  - search results
;  - time added to store
;  - length of time until expiration
;
(defn add-to [search-term results expires-in]
  ())

(defn get-from [search-term]
  ())

(defn run-expire []
  ())
