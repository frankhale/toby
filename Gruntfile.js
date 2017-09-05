module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: ["index.html"],
            dest: "build/"
          }
        ]
      }
    },
    ts: {
      default: {
        src: ["src/*.ts"],
        outDir: "build",
        options: {
          rootDir: "src",
          sourceMap: true,
          moduleResolution: "node",
          target: "es6",
          module: "commonjs"
        }
      }
    },
    tslint: {
      files: {
        src: ["src/*.ts*", "src/react-components/*.ts*", "definitions/*.ts*"]
      },
      options: {
        force: false,
        fix: false
      }
    }
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask("default", ["ts", "copy", "tslint"]);
};
