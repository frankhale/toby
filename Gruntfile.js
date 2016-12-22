module.exports = function(grunt) {
    grunt.initConfig({
      copy: {
        main: {
          files: [
            { src: ["index.html"], dest: "build/" },
          ]
        }
      },
      ts: {
        default: {
          src: ["src/*.ts"],
          outDir: "build",
          options: {
            sourceMap: true,
            target: "es6",
            module: "commonjs"
          }
        }
      },
      tslint: {
        files: {
          src: ["src/*.ts*", "src/react-components/*.ts*"]
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
