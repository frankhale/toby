var ipc = require('ipc');
var current_title = '';

ipc.on('ping', function() {
  // We can get the title of the video and URL from the html5-title-text element
  var elements = document.getElementsByClassName("html5-title-text");

  if(elements !== undefined && elements.length > 0) {
    var title = elements[0];

    if(current_title === title.text) return;

    current_title = title.text;

    ipc.sendToHost({
      title: title.text,
      ytid: title.href.split('?v=')[1]
    });
  }
});
