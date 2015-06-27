Toby
====

Toby is a desktop YouTube video player. Toby takes the path of least resistance.
It provides a way to specify videos and a way to look them up and play them.
Nothing more, nothing less. Getter done! Play the videos you really like and
love life!

##Screenshots

Video playback:

<img src="screenshots/toby-video-playback.png" alt="Video Playback"/>

Search your playlist for a video:

List all videos that start with the search term.

<img src="screenshots/toby-video-search.png" alt="Video Selection"/>

List all videos in your playlist:

By typing %all% into the search box you will get a listing of all of your
videos.

<img src="screenshots/toby-video-search-all.png" alt="Video Selection - List All"/>

List videos by group name:

By wrapping your video group with % you can get a listing of all videos in a
specific group.

<img src="screenshots/toby-video-search-by-group.png" alt="Video Selection - List By Group"/>

Play any video via it's YouTube video ID:

<img src="screenshots/toby-play-video-with-id.png" alt="Video Selection - Play Any Video With Video ID"/>

Recently played list:

<img src="screenshots/toby-recently-played.png" alt="Recently Played List"/>

##Dependencies

If you want to run the latest code from master feel free. Toby requires
Electron to run.

How to run master in Electron:

- Download Electron from https://github.com/atom/electron
- Unzip Electron
- Navigate to the resources folder
- Create a folder called app
- Clone the source code for Toby and dump it directly in the app folder
- Open terminal to app folder
- Run npm install to install node modules
- Run bower install to install JavaScript dependencies
- Run Electron
- Enjoy life and have fun listening to awesome music on YouTube!

##Current Release

https://github.com/frankhale/toby/releases/tag/v0.13.0

A Windows x64 binary has been provided in this release.

- Based on Electron 0.28.3, includes iojs 2.3.1 and a patched libchromiumcontent
to override the HTTP referrer so that certain videos blocked from playback will
play. 

NOTE: Mac & Linux binaries will come in the future

##Default Play List

I ship my play list with Toby as an example. Feel free to replace this with
videos you love!

##Usage

**Important Key Combos:**

F1 - Switch between video search and video playback (once a video has been selected and is playing)
F3 - Restart app (Still leaving this in here for debug purposes)  
F5 - Add the current playing video to data.json (see Updating data.json)  
F12 - Open Developer tools (Still leaving this in here for debug purposes)

NOTE: F5 adds a video to data.json only if it doesn't already exist. At the end
of playing a YouTube video you'll receive suggestions for related videos that you
may want to watch. If you click these videos and you like them you can press F5
to add the video to your play list.

###How can I update the play list?

The data folder has a JSON file in it which is pretty self explanatory. There
is an array of genres which have a set of videos that go with them. Basically
what you do is you just grab the title of the video and the embed URL from
YouTube and add it manually (for now) to the file. You can do this while the
app is running and the new entry will show up in your play list.

NOTE: See section Updating data.json for more information.

The data.json file has the following format:

There is just one big array of video groups, groups contain the title of the
groups and the videos associated with it. Videos are just an array of files
that contain a description and a URL.

```json
[{  
  "title": "Trance",
  "videos": [{
    "description": "Dash Berlin - Underneath The Sky (Sunsound Chillout Remix)",
    "ytid": "UEqMD-5urik"
  }, {
    "description": "Jasper Forks - River Flows In You (Out of Blackout Vocal Edit) [HD]",
    "ytid": "5UwnhliP5N8"
  }, {
    "description": "Dash Berlin ft. Christon Rigby - Underneath The Sky (ASOT 667 Official Preview) #WeAre",
    "ytid": "8X3XhQS-ZtA"
  }]
}]
```

###Recap Updating Play List

Currently you can update data.json with new videos in two ways.

1. Update data.json manually (explained above)
2. After a video is played YouTube will show a listing of other videos you may
   like to watch. If you click on one and like it you can hit the F5 key to add
   it to your data.json. This will make it available when searching your videos
   the next time you want to watch it. Files added in this way will be added to
   a group called 'misc'. If you like you can edit your data.json and move them
   to a different group.

##Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;  
26 June 2015

##License

GNU GPL v2 - see LICENSE.txt
