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

(function() { 'use strict';

	angular
		.module( 'MIDIService', [])
		.factory('MIDIService', MIDIService)
		.constant('MIDISpec', {
			'NOTE_ON':  0x90,
			'NOTE_OFF': 0x80
		});

	function MIDIService($q) {
		var _public  = {};
		var _private = {
			midiAccess: null,
			onstatechange: function(){}, 
			ports: {
				inputs:  null,
				outputs: null
			}
		};

		_public.requestMIDIAccess = function MIDIServiceRequestMIDIAccess(config){
			var deferred = $q.defer();

			if( typeof(config) !== 'undefined' && config.hasOwnProperty('onstatechange') ){
				_private.onstatechange = config.onstatechange;
			}

			navigator.requestMIDIAccess().then(
				function requestMIDIAccessSuccess(midiAccess) {
					_private.midiAccess = midiAccess;
					_private.midiAccess.onstatechange = storeActivePorts;
					storeActivePorts();
					deferred.resolve();
				},
				function requestMIDIAccessError(message) {
					deferred.reject(message);
				}
			);
			return deferred.promise;
		};
		function storeActivePorts(){
			_private.ports.inputs  = Array.from(_private.midiAccess.inputs.values());
			_private.ports.outputs = Array.from(_private.midiAccess.outputs.values());
			_private.onstatechange();
		}

		_public.getPorts = function MIDIServiceGetPorts(){
			return _private.ports;
		};

		_public.getPort = function MIDIServiceGetPort(portId) {
			return _private.midiAccess.outputs.get(portId);
		};

		return _public;
	}
})();