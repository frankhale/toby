module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: ["index.html"],
            dest: "dist/"
          },
          {
            expand: true,
            src: ["server/config.ts"],
            dest: "bootstrap/",
            flatten: true
          }
        ]
      }
    },
    ts: {
      default: {
        src: ["bootstrap/*.ts"],
        outDir: "dist",
        options: {
          rootDir: "bootstrap",
          sourceMap: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", ["copy", "ts"]);
};
