$(function() {
    console.log('ready');


    // setup the gcode input
    var gcodeElement =document.getElementById('gcode');
    var gcodes = gcodeElement.value;
    machine.fromString(gcodes);
    machine.begin(function() { console.log('done'); });

    var changing = false;
    gcodeElement.addEventListener('keyup', function() {
      if (gcodes !== gcodeElement.value) {
        clearTimeout(changing);
        changing = setTimeout(function() {
          gcodes = gcodeElement.value;
          machine.cancel();
          machine.fromString(gcodes);
          machine.begin(function() {
            console.log('done');
          });
        }, 1000);
      }
    });

    machine.cancel();
    machine.fromString($('#gcode').val());
    machine.begin(function() { console.log('done'); });

  }
);