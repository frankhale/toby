module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    "babel": {
      options: {
        sourceMap: true,
        plugins: ["transform-react-jsx"],
        presets: ["babel-preset-es2015"]
      },
      dist: {
        files: {
          // BUILD DIR
          "build/platform.js": "src/platform.js",
          "build/db.js": "src/db.js",
          "build/api.js": "src/api.js",
          "build/server.js": "src/server.js",
          "build/index.js": "src/index.js",
          // PUBLIC/SCRIPTS DIR
          "public/scripts/version-ui.js": "src/version-ui.js",
          "public/scripts/dropdown-ui.js": "src/dropdown-ui.js",
          "public/scripts/video-list-ui.js": "src/video-list-ui.js",
          "public/scripts/video-list-grid-ui.js": "src/video-list-grid-ui.js",
          "public/scripts/command-input-ui.js": "src/command-input-ui.js",
          "public/scripts/youtube-ui.js": "src/youtube-ui.js",
          "public/scripts/toby-ui.js": "src/toby-ui.js"
        }
      }
    },
    "uglify": {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          "public/scripts/version-ui.min.js": "public/scripts/version-ui.js",
          "public/scripts/dropdown-ui.min.js": "public/scripts/dropdown-ui.js",
          "public/scripts/command-input-ui.min.js": "public/scripts/command-input-ui.js",
          "public/scripts/video-list-ui.min.js": "public/scripts/video-list-ui.js",
          "public/scripts/video-list-grid-ui.min.js": "public/scripts/video-list-grid-ui.js",
          "public/scripts/youtube-ui.min.js": "public/scripts/youtube-ui.js",
          "public/scripts/toby-ui.min.js": "public/scripts/toby-ui.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["babel", "uglify"]);
};
