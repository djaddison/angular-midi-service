## Angular MIDIService
Angular MIDIService is an angular.js 1.4+ service that wraps web midi functionality.

## Getting started
For a complete example see the application in `example/index.html`

### HTML
```html
<script src="path/to/MIDIService.js"></script>
<script src="path/to/MIDIExtend.js"></script>
```

### JS
```js
// Add the service to the list of angular dependencies
angular.module('application', ['MIDIService'])

// Request MIDI access (Init)
// Once this async operation returns sucessfully, MIDIService will 
// have a list of available ports
// The service config allows you to provide a callback that will
// be called when the number of ports / state of the MIDI system
// has changed. For example: A usb midi device is unplugged.

MIDIService.requestMIDIAccess( MIDIServiceConfig ).then(function(){

   // Get all available ports
   ports = MIDIService.getPorts();

   // Get the first output port
   id = ports.outputs[0].id;
   firstOut = MIDIService.getPort(id);

   // Send a chord to the first output port
   notes = [60,63,65];
   velocity = 100;
   duration = 2000;
   firstOut.sendChord( notes, velocity, duration);
   
});
```

## Open source
Angular MIDIService's full source code and documentation is available under the Apache 2.0 license.

## Contact
Author: David Addison

Email: djaddison.vcs@gmail.com
