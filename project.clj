(defproject toby "0.14.0-SNAPSHOT"
  :description "A YouTube player for the desktop"
  :url "http://github.com/frankhale/toby"
    :dependencies [[org.clojure/clojure "1.7.0"]
                   [org.clojure/clojurescript "0.0-3308"]
                   [org.omcljs/om "0.8.8"]
                   [jayq "2.5.4"]
                   [cljsjs/jquery "2.1.4-0"]]
  :plugins [[lein-cljsbuild "1.0.6"]]
  :source-paths ["assets/src"]
  :cljsbuild {
    :builds
		[{:source-paths ["assets/src/main"],
		  :id "main",
		  :compiler
			{:output-to "assets/build/main.js",
       :externs ["assets/externs/externs.js"],
			 :optimizations :advanced}}
     {:source-paths ["assets/src/toby"],
       :id "toby",
       :compiler
       {:output-to "assets/build/toby.js",
        :externs ["assets/externs/externs.js"],
        :optimizations :advanced}}
     {:source-paths ["assets/src/player"],
      :id "player",
      :compiler
      {:output-to "assets/build/player.js",
       :libs ["toby.server"]
       :foreign-libs [{:file "https://www.youtube.com/iframe_api"
                       :provides ["YT" "YT.Player"]}
                      {:file "http://localhost:5150/socket.io/socket.io.js"
                       :provides ["io"]}],
       :externs ["assets/externs/externs.js"],
       :optimizations :advanced}}]})
