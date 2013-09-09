module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dist: {
				options: {
					sassDir: 'sass',
					cssDir: 'build',
					environment: 'production',
					outputStyle: 'compressed'
				}
			}
		},

		uglify: {
			dist: {
				options: {
					compress: true
				},
				files: {
					'build/rekola.js': [
						// Libraries
						'libs/intel-appframework/build/appframework.min.js',
						'libs/intel-appframework/build/ui/appframework.ui.min.js',
						'libs/iscroll/dist/iscroll-lite-min.js',
						'libs/underscore/underscore-min.js',
						'libs/backbone/backbone-min.js',
						// Models
						'models/*.js',
						// Views
						'views/*.js',
						// Controllers
						'controllers/*.js',
						// Inits
						'router.js',
						'init.js'
					]
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['compass', 'uglify']);

};