# Toby

[![Join the chat at https://gitter.im/frankhale/toby](https://badges.gitter.im/frankhale/toby.svg)](https://gitter.im/frankhale/toby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Toby is a simple YouTube player for your favorite videos.

## Status

This is the first iteration of the next Toby rewrite. This one is using Next.js
for the server and will have a UI based on the awesome [Material-UI](https://material-ui.com/).

## Building

There are a lot of moving parts in here unfortunately so we are going to use
'grunt' to make life easier. There are 3 projects (or rather there will be 3
when the front end code has been added).

Projects:

- Next.js server
- Bootstrap (to get up and running either NW.js or Electron)
- Front end

NOTE: 'Gruntfile.js' is not fully written yet and the front end project has not
been created either. That said, it's my intention to create a one command build
process so that each of the projects are compiled and everything put into place
to make running Toby directly from the latest source code as easy as possible.

## Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;
24 June 2018

## License

GNU GPL v3 - see [LICENSE](LICENSE)
