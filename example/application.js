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

(function () { 'use strict';
	angular
		.module('application', ['MIDIService'])
		.controller('appController', appController);

	function appController($scope, MIDIService){
		/* jshint validthis: true */
		var vm = this;
		vm.outputId = '';
		vm.velocity = 120;

		var MIDIServiceConfig = {
			'onstatechange': MIDIServiceStateChanged
		};

		function MIDIServiceStateChanged() {
			$scope.$evalAsync(function(){
				vm.ports  = MIDIService.getPorts();
				vm.output = MIDIService.getPort(vm.outputId);
			});
		}

		MIDIService.requestMIDIAccess( MIDIServiceConfig ).then(function(){
			vm.ports    = MIDIService.getPorts();
			vm.outputId = vm.ports.outputs[0].id;
			vm.output   = MIDIService.getPort(vm.outputId);
		});

		vm.outputSelected = function appControllerOutputSelected(){
			vm.output = MIDIService.getPort(vm.outputId);
		};

		vm.sendChord = function(){
			vm.output.sendChord( [60,63,65], vm.velocity, 2000);
		};

		vm.startChord = function(){
			vm.output.startChord( [60,63,65], vm.velocity );
		};

		vm.endChord = function(){
			vm.output.endChord( [60,63,65] );
		};
	}
})();