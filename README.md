# Toby

[![Join the chat at https://gitter.im/frankhale/toby](https://badges.gitter.im/frankhale/toby.svg)](https://gitter.im/frankhale/toby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Toby is a simple YouTube player for the desktop.

### Screenshots

Toby In Action:

![Toby In Action](screenshots/toby-video-playback.png)

Toby Main UI:

![Toby Main UI](screenshots/toby-main.png)

Toby Video List:

![Toby Video List](screenshots/toby-video-list.png)

Toby Video List (Slim Grid)

![Toby Video List (Slim Grid)](screenshots/toby-video-list-slim-grid.png)

Toby Recently Played:

![Toby Recently Played](screenshots/toby-recently-played.png)

Toby Manage Videos:

![Toby Manage Videos](screenshots/toby-manage.png)

Toby Server Log:

![Toby Server Log](screenshots/toby-server-log.png)

### Architecture

The old Toby architecture was geared towards an Electron deployment and I loaded
all the code from the file system. The new architecture puts Toby behind an
Express web application that is spawned from a regular Node process so that more
deployment scenarios are possible.

A Toby deployment would ship the regular Node.exe and Node.dll files along side
the source code. We know NW.js and Electron ship with Node embedded but shipping
Node as an external resource allows us to run Toby's server in a regular Node 
process and unencumbered by NW.js / Electron specific compiling requirements for 
any potential native Node modules we may want to use in the future. The only 
native Node module being at the moment is SQLite3.

Having Toby behind an Express app makes it fairly trivial to deploy to NW.js,
Electron and support a regular web browser.

Toby is meant as a personal application running on a personal computer and it's
web API is not password protected in any way and there has been no attempt to
protect the data Toby collects. Toby only cares about a few things, namely
YouTube video titles, YouTube video IDs and the groups you decide to store your
favorite videos in.

### How can I run the latest code?

Set up the folder structure for working with either NW.js or Electron or both:

![NW.js package.nw root](screenshots/tody-folder-structure.png)

Notice that we have a copy of `node.exe` and `node.lib` in the root of the 
source code repository. This is used to spawn our server for serving our API.

A folder named `electron` and `nwjs` have a copy of Electron and NW.js 
respectively.

#### Dependencies

- Node : [http://nodejs.org](http://nodejs.org)
- Grunt : [http://gruntjs.com](http://gruntjs.com)
- Bower : [http://bower.io/](http://bower.io/)
- Electron: [http://electron.atom.io/](http://electron.atom.io/)
- NW.js: [http://nwjs.io/](http://nwjs.io/)

In addition to installing Node on your machine so you can download the
dependencies and build the code you'll also need a copy of the Node binaries to
place at the root of the source code folder. This is because when NW.js or
Electron are executed they will spawn their own external Node process and start
the Toby server.

The required Node binaries are located here (for example):

https://nodejs.org/dist/v7.0.0/win-x64/

Depending on what platform you want to run toby in (Electron or NW.js) you'll
need to make sure the main property in package.json is set accordingly:

##### NW.js

```
main: "index.html"
```

##### Electron

```
main: "electron.js"
```

In order to run toby you'll need to download the dependencies and build the
source code. Open a terminal to the source code repository and run the following
commands.

#### Install dependencies  

```
npm install   
bower install
```

The code needs to be built using Grunt. If you need grunt install it via 
`npm install -g grunt`.

```
grunt
```

Assuming all dependencies are downloaded and the source code has been compiled
perform the following:

#### Running in NW.js

```
nwjs\nw.exe .
```

#### Running in Electron

```
electron\electron .
```

### Usage

**Important Key Combos:**

<kbd>F1</kbd> - Toggles server log   
<kbd>F11</kbd> - Toggle Fullscreen

In addition to keyboard shortcuts there are commands that can be typed into the
search box that will perform various things.

Here is a list (there will be additional ones added soon):

- `[name hint]` : Lists locally saved videos based on the [name hint]
- `/yt [search term]` : Searches YouTube for the [search term]
- `/g [group name]` : Lists the videos for the [group name]
- `/list` : List all videos contained in the database
- `/history` : Lists the recently played videos
- `/rp` or `/recently-played` : List last 30 recently played videos
- `/rps` or `/recently-played-search` : Search recently played videos
- `/manage` : Manage what groups videos are in and also provide ability to delete videos
- `/archive` : Export the contents of the database to the data.txt file
- `/gv` or `/grid-view` - Toggle slim grid view for search results
- `/dv` or `/default-view` - Toggle default view for search results
- `/clear` : Clears search results
- `/monochrome` : (NW.js/Electron only) Short cut to set the monochrome video filter and
thumbnails in search results
- `/saturate` : (NW.js/Electron only) Short cut to set the saturated video filter and
thumbnails in search results
- `/sepia` : (NW.js/Electron only) Short cut to set the sepia video filter and
thumbnails in search results
- `/normal` : (NW.js/Electron only) Short cut to set the normal video filter and
thumbnails in search results
- `/filter monochrome` : (NW.js/Electron only) Short cut to set the monochrome video filter and
thumbnails in search results
- `/filter saturate` : (NW.js/Electron only) Short cut to set the saturated video filter and
thumbnails in search results
- `/filter sepia` : (NW.js/Electron only) Short cut to set the sepia video filter and
thumbnails in search results

### Features TODO

- Caching YouTube search results for a bit to avoid querying YouTube over and
  over for the same thing
- Usage info from within the app
- Add `/import` to import new videos in the data.txt file

### Updating the data file

Unlike previous versions of toby the data.txt file located in the data folder is
now only used initially to create the database which stores your favorite
videos. Videos stored in the database can be exported by entering the `/archive`
command in the search box. A corresponding `/import` command has not been
implemented yet.

The data format for your favorite videos is very simple. It can contain one or
more groups. The 'Recently Played' group is special and will be added if it's
not present and will contain the last 30 videos you've recently played.

Data Format:

```
Group Name {
  Video Title : Video Id
}
```

See real example below:

```
Recently Played {
  Sunlight Project feat Danny Claire - Stay (tranzLift Remix) Promo : yWQvWTM7Hqg
  Dash Berlin - Underneath The Sky (Sunsound Chillout Remix) : UEqMD-5urik
  Chris Tomlin - Awake My Soul (with Lecrae) [Lyrics] : fWpvknKuYrg
  Chris Tomlin - Good Good Father (Live at the Grand Ole Opry) : eaqaER7dasY
}
```

## Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;  
17 November 2016

## License

GNU GPL v3 - see [LICENSE](LICENSE)
