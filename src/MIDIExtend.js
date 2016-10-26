/*global MIDIPort*/

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

// Adding higher level functions to the midi ports
MIDIPort.prototype.sendNote = function ExtendWebMIDIObjectSendNote(note, velocity, duration) {
	this.send( [0x90, note, velocity] );
	this.send( [0x80, note, 0x00], window.performance.now()+duration );
};
MIDIPort.prototype.sendChord = function ExtendWebMIDIObjectSendChord(notes, velocity, duration) {
	for( var index = 0, len = notes.length; index < len; index++ ){
		this.sendNote(notes[index], velocity, duration);
	}
};
MIDIPort.prototype.startChord = function ExtendWebMIDIObjectStartChord(notes, velocity) {
	for( var index = 0, len = notes.length; index < len; index++ ){
		this.send( [0x90, notes[index], velocity] );
	}
};
MIDIPort.prototype.endChord = function ExtendWebMIDIObjectEndChord(notes) {
	for( var index = 0, len = notes.length; index < len; index++ ){
		this.send( [0x80, notes[index], 0x00] );
	}
};