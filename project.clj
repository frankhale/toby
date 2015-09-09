(defproject toby "0.15.0-SNAPSHOT"
  :description "A YouTube player for the desktop"
  :url "http://github.com/frankhale/toby"
    :dependencies [[org.clojure/clojure "1.7.0"]
                   [org.clojure/clojurescript "1.7.122"]
                   [org.omcljs/om "0.9.0"]
                   ;[figwheel "0.3.9"]
                   [jayq "2.5.4"]
                   [cljsjs/jquery "2.1.4-0"]]
  :plugins [[lein-cljsbuild "1.1.0"]]
            ;[lein-figwheel "0.3.9"]]
  ;:figwheel {
  ; :http-server-root "html" ;; this will be in resources/
  ; :server-port 3449          ;; default
  ; :server-ip   "0.0.0.0"     ;; default
  ; :css-dirs ["css"]
  ;}
  :source-paths ["assets/src"]
  :cljsbuild {
    :builds
		[{:source-paths ["assets/src/main"]
		  :id "main"
		  :compiler
			{:output-to "assets/build/main.js"
       :externs ["assets/externs/externs.js"]
			 :optimizations :advanced
       :pretty-print false}}
     {:source-paths ["assets/src/toby"]
       :id "toby"
       ;:figwheel true
       :compiler
       {:output-to "assets/build/toby.js"
        :externs ["assets/externs/externs.js"]
        :optimizations :advanced
        :pretty-print false}}
     {:source-paths ["assets/src/player"]
      :id "player"
      :compiler
      {:output-to "assets/build/player.js"
       :libs ["toby.server"]
       :foreign-libs [{:file "https://www.youtube.com/iframe_api"
                       :provides ["YT" "YT.Player"]}
                      {:file "http://localhost:5150/socket.io/socket.io.js"
                       :provides ["io"]}]
       :externs ["assets/externs/externs.js"]
       :optimizations :advanced
       :pretty-print false}}]})
