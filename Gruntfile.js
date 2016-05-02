module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        sourceMap: true,
        plugins: ["transform-react-jsx"],
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          // BUILD DIR
          "build/db.js": "src/db.js",
          "build/api.js": "src/api.js",
          "build/app.js": "src/app.js",
          "build/index.js": "src/index.js",
          // PUBLIC/SCRIPTS DIR
          "public/scripts/video-list-ui.js": "src/video-list-ui.js",
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
          "public/scripts/command-input-ui.min.js": "public/scripts/command-input-ui.js",
          "public/scripts/video-list-ui.min.js": "public/scripts/video-list-ui.js",
          "public/scripts/youtube-ui.min.js": "public/scripts/youtube-ui.js",
          "public/scripts/toby-ui.min.js": "public/scripts/toby-ui.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['babel', 'uglify']);
};
