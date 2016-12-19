module.exports = function(grunt) {
    grunt.initConfig({
      copy: {
        main: {
          files: [            
            { src: ['index.html'], dest: 'build/' },
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
      }
    });
    
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("default", ["ts", "copy"]);
};
