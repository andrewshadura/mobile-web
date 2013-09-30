module.exports = function(grunt) {

	var SASS_FILES = {
		'build/screen.css': 'sass/screen.sass'
	};

	var JS_FILES = {
		'build/rekola.js': [
			// Libraries
			'libs/intel-appframework/build/appframework.min.js',
			'libs/intel-appframework/build/ui/appframework.ui.min.js',
			'libs/iscroll/dist/iscroll-lite-min.js',
			'libs/underscore/underscore-min.js',
			'libs/backbone/backbone-min.js',
			// Configuration
			'config.js',
			'config-local.js',
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
	};

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {

			dev: {
				options: {
					sourcemap: true
				},
				files: SASS_FILES
			},

			dist: {
				options: {
					style: 'compressed',
					noCache: true
				},
				files: SASS_FILES
			}

		},

		uglify: {

			dev: {
				options: {
					compress: false,
					mangle: false,
					beautify: true,
					sourceMap: 'build/rekola.source-map.js'
				},
				files: JS_FILES
			},

			dist: {
				options: {
					report: 'min'
				},
				files: JS_FILES
			}

		},

		watch: {

			sass: {
				files: 'sass/**/*.sass',
				tasks: ['sass:dev']
			},

			js: {
				files: ['*.js', 'controllers/*.js', 'models/*.js', 'views/*.js'],
				tasks: ['uglify:dev']
			},

			livereload: {
				files: ['build/*.css', 'build/*.js'],
				options: {
					livereload: true,
				}
			}

		}


	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass:dist', 'uglify:dist']);
	grunt.registerTask('dev', ['sass:dev', 'uglify:dev']);

};
