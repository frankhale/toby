(ns main.core)

(def app (js/require "app"))
(def browser-window (js/require "browser-window"))
(def crash-reporter (js/require "crash-reporter"))
(def process (js/require "process"))

(def main-window (atom nil))
(def assets-dir (str (.cwd process) "\\resources\\app\\assets"))

(def browser-options (clj->js {
  :title "Toby - A YouTube player for the desktop"
  :width 640
  :height 400
  :icon (str assets-dir "\\images\\t.png")
  :resizable true}))

(defn init-browser []
	(reset! main-window (browser-window. browser-options))
	(.openDevTools @main-window)
  (.loadUrl @main-window (str "file://" assets-dir "\\html\\toby.html"))
	(.on @main-window "closed" #(reset! main-window nil)))

(defn quit []
  (js/console.log "app.quit called")
  (.quit app))

(.start crash-reporter)
(.on app "window-all-closed" #(when-not (= js/process.platform "darwin") (quit)))
(.on app "ready" #(init-browser))
