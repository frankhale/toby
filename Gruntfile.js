module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
          default: {
            src: ["src/*.ts"],
            outDir: "build",
            options: {                    
              sourceMap: true,
              target: 'es6',
              module: "commonjs"                
            }         
          }                      
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
};
