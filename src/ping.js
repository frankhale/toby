var ipc = require('ipc');

ipc.on('ping', function() {
  // We can get the title of the video and URL from the html5-title-text element
  var elements = document.getElementsByClassName("html5-title-text");

  if(elements !== undefined && elements.length > 0) {
    var title = elements[0];
    if(title  !== undefined) {
      ipc.sendToHost({
        title: title.text,
        url: title.href
      });
    }
  }
});
