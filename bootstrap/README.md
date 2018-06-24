# What is this?

The code in this folder is what boostraps Toby for either Electron or NW.js.

## Note

- config.ts is copied via grunt to this directory, it will be overwritten so
  please make any changes necessary to the copy located in the 'server' folder.
  This is done to give 'platform.ts' access to some data it needs in order to
  start up the Socket.IO server and the server URL needed to get the webview
  pointed to the right location for Toby's front end.
