module.exports = function(grunt) {

	var STYLE_FILES = {
		'build/screen.css': 'styles/screen.styl'
	}

	var JS_FILES = {
		'build/rekola.js': [
			// Libraries
			'libs/intel-appframework/appframework.min.js',
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
	}

	var WATCH_FILES = [
		'build/*.*',
		'**/*.html'
	]

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: 'build/*'
		},

		stylus: {

			dev: {
				options: {
					'include css': true,
					compress: false
				},
				files: STYLE_FILES
			},

			dist: {
				options: {
					'include css': true
				},
				files: STYLE_FILES
			}

		},

		uglify: {

			dev: {
				options: {
					compress: false,
					sourceMap: true
				},
				files: JS_FILES
			},

			dist: {
				files: JS_FILES
			}

		},

		browserSync: {

			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					// Only static files
					server: {
						baseDir: '.'
					},
					// Dynamic files (PHP etc) - proxy to running server
					// proxy: 'localhost',
					ghostMode: {
						clicks: true,
						scroll: true,
						links: false,
						forms: true
					}
				},
				bsFiles: {
					src: WATCH_FILES
				}
			}

		},

		preprocess: {

			index: {
				src: 'index.tmpl',
				dest: 'index.html'
			}

		},

		hashres: {

			dist: {
				src: [
					'build/screen.css',
					'build/rekola.js'
				],
				dest: 'index.html'
			}

		},

		watch: {

			styles: {
				files: 'styles/**/*.styl',
				tasks: ['stylus:dev']
			},

			js: {
				files: ['*.js', 'controllers/*.js', 'models/*.js', 'views/*.js'],
				tasks: ['uglify:dev']
			},

			index: {
				files: 'index.tmpl',
				tasks: ['preprocess:index']
			},

			livereload: {
				files: WATCH_FILES,
				options: {
					livereload: true,
				}
			}

		}


	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-browser-sync')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-notify')
	grunt.loadNpmTasks('grunt-preprocess')
	grunt.loadNpmTasks('grunt-hashres')
	grunt.loadNpmTasks('grunt-contrib-clean')

	// Register tasks
	grunt.registerTask('default', ['clean:build', 'stylus:dist', 'uglify:dist', 'preprocess:index', 'hashres:dist'])
	grunt.registerTask('dev', ['clean:build', 'stylus:dev', 'uglify:dev', 'preprocess:index', 'browserSync:dev', 'watch'])

};
