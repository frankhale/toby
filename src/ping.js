var ipc = require('ipc'); 

ipc.on('ping', function() { 
  var elements = document.getElementsByClassName("html5-title-text");

  if(elements !== undefined && elements.length > 0) {
    var title = elements[0]; 
    if(title  !== undefined) {
      ipc.sendToHost(title.text); 
    }
  }
});
