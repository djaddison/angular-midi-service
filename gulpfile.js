/*
 *  Copyright 2015 David Addison
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var server = require('browser-sync');

// Hint Source
gulp.task('hint', function() {
	return gulp.src(['src/**/*.js', 'example/application.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'));
});

// Static Server with Reload
gulp.task('server', function() {
	return server.init(null, {
		open: true,
		server: {
			baseDir: ['./'],
			index: './example/index.html'
		},
		watchOptions: {
			debounceDelay: 300
		}
	});
});

// Watch for changes
gulp.task('watch', function() {
	gulp.watch(['src/**/*.js', 'example/application.js'], ['hint']);

	return gulp.watch(['src/**/**', 'example/**/**'], function(file) {
		if (file.type === 'changed') {
			return server.reload(file.path);
		}
	});
});

// Default
gulp.task('default', function(){
	gulp.start('hint', 'server', 'watch');
});
