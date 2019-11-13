# Toby

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

Having Toby behind an Express app makes it fairly trivial to deploy to NW.js,
Electron and support a regular web browser.

Toby is meant as a personal application running on a personal computer and it's
web API is not password protected in any way and there has been no attempt to
protect the data Toby collects. Toby only cares about a few things, namely
YouTube video titles, YouTube video IDs and the groups you decide to store your
favorite videos in.

### Running The Latest Code

Clone the code using `git` and then add a folder named `browsers` with a copy of
`electron` and/or `nwjs`. We'll use one of these to run Toby.

#### Dependencies

- Node : [http://nodejs.org](http://nodejs.org)
- Grunt : [http://gruntjs.com](http://gruntjs.com)
- Bower : [http://bower.io/](http://bower.io/)
- Webpack : [https://webpack.github.io/](https://webpack.github.io/)
- Typescript : [http://typescriptlang.org/](http://typescriptlang.org/)

## You Just Need One Of The Following:

- Electron: [https://electronjs.org/](https://electronjs.org/)
- NW.js: [http://nwjs.io/](http://nwjs.io/)

Depending on what platform you want to run Toby in (Electron or NW.js) you'll
need to make sure the main property in package.json is set accordingly:

##### NW.js

```
main: "./build/index.html"
```

##### Electron

```
main: "./build/electron.js"
```

In order to run Toby you'll need to download the dependencies and build the
source code. Open a terminal to the source code repository and run the following
commands.

#### Install Dependencies

```
npm install -g webpack webpack-cli typescript grunt bower
npm install
bower install
```

#### Building the Source Code

NOTE: You will need to supply your own YouTube API key. This needs to be placed
in an environment variable called `YOUTUBE_API_KEY`. You will need a Google
account to obtain one. Go [here (https://console.developers.google.com) to get
an API key.

The server needs to be built using Grunt.

```
grunt
```

The front end needs to be build using Webpack.

```
webpack
```

Assuming all dependencies are downloaded and the source code has been compiled
perform the following from a command line at the root of the Toby code
repository:

**NOTE**: `main` will need to be updated in `package.json` to point to the
correct starting point for your deployment scenario. If you are using Electron
it will need to be set to `build\electron.js` or if you are using NW.js it'll
need to be set to `build\index.html`. It should also be noted that the
index.html contained in the root of the Toby repository will be copied to the
build folder and used from there.

#### Running in NW.js

```
browsers\nwjs\nw.exe .
```

**NOTE**: You may want to replace the `ffmpeg.dll` that ships with NW.js with a more
capable one from [https://github.com/iteufel/nwjs-ffmpeg-prebuilt/releases](https://github.com/iteufel/nwjs-ffmpeg-prebuilt/releases). The `ffmpeg.dll`
that ships with NW.js is crippled and won't play many of the YouTube videos you
most likely will want to play.

#### Running in Electron

```
browsers\electron\electron .
```

#### Running in a Browser

Start the server up:

```
node.exe build\server.js
```

Then open a browser to `http://127.0.0.1:62374`

### Running using the Toby Launcher

I've wrote a rudimentary launcher in C# .NET to assist with launching Toby
easily. By default if you run the launcher without command line args it will run
Toby using NW.js. There is only one command line option at this time.

After building the launcher copy the TobyLauncher.exe, NDesk.Options.dll and
Newtonsoft.Json.dll files to the root of the Toby repository.

- Command Line Options:
  - /p `[nw, electron, web]`

Examples:

Launching Toby in a web browser: `TobyLauncher.exe /p web`
Launching Toby in Electron: `TobyLauncher.exe /p electron`

NOTE: The launcher is crude and there is not enough error checking yet. Things
will likely go wrong if Toby is not set up correctly as stated above.

### Usage

**Important Key Combos:**

<kbd>F1</kbd> - Toggles server log
<kbd>F11</kbd> - Toggles fullscreen

In addition to keyboard shortcuts there are commands that can be typed into the
search box that will perform various things.

Here is a list (there will be additional ones added soon):

- `[name hint]` : Lists locally saved videos based on the [name hint]
- `[search term]` : Searches YouTube for the [search term]
- `/local [search term]` : Searches for locally saved videos
- `/g [group name]` : Lists the videos for the [group name]
- `/list-all` : List all videos contained in the database
- `/history` : Lists the recently played videos
- `/rp` or `/recently-played` : List last 30 recently played videos
- `/rps` or `/recently-played-search` : Search recently played videos
- `/manage` : Manage what groups videos are in and also provide ability to
  delete videos
- `/archive` : Export the contents of the database to the data.txt file
- `/gv` or `/grid-view` - Toggle slim grid view for search results
- `/dv` or `/default-view` - Toggle default view for search results
- `/clear` : Clears search results
- `/monochrome` : (NW.js/Electron only) Short cut to set the monochrome video
  filter and thumbnails in search results
- `/saturate` : (NW.js/Electron only) Short cut to set the saturated video
  filter and thumbnails in search results
- `/sepia` : (NW.js/Electron only) Short cut to set the sepia video filter and
  thumbnails in search results
- `/normal` : (NW.js/Electron only) Short cut to set the normal video filter and
  thumbnails in search results
- `/filter monochrome` : (NW.js/Electron only) Short cut to set the monochrome
  video filter and thumbnails in search results
- `/filter saturate` : (NW.js/Electron only) Short cut to set the saturated
  video filter and thumbnails in search results
- `/filter sepia` : (NW.js/Electron only) Short cut to set the sepia video
  filter and thumbnails in search results

**NOTE**: You can refer to /src/toby-ui.tsx for the various short cuts available
for these commands.

### Wait, I used NW.js and some YouTube videos won't play

The FFMPEG library that ships with NW.js is less capable than the one that ships
with Electron. The short answer is just copy the FFMPEG library from an Electron
release replace the one that ships with NW.js. I've been doing this for a long
time and it works well for me (on Windows).

The longer answer is you can compile your own FFMPEG library with the support
you and there are a lot of resources already out there to handle this scenario.

**NOTE**: This technique does not work with NW.js 0.20.0-beta1 as the FFMPEG
seems to be different than one that ships with Electron.

Looks like there are some alternate FFMPEG builds available which can take care
of this: [https://github.com/iteufel/nwjs-ffmpeg-prebuilt/releases](https://github.com/iteufel/nwjs-ffmpeg-prebuilt/releases)

### Features TODO

- Usage info from within the app

### Updating the data file

I've removed the ordinary data file as it was too cumbersome to get the parser
correct. I've decided to just define some basic starting video data in the
following code file `/src/data.ts`. If you are building from source feel free to
edit this to your liking. If at anytime you edit this file and run Toby it will
update your database importing any new videos you put there.

**NOTE**: Although it hasn't been done yet it'd be trivial to replace this with
JSON data loaded from the filesystem.

## Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;
11 November 2019

## License

GNU GPL v3 - see [LICENSE](LICENSE)
