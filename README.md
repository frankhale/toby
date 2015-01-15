Toby
====

A small and simple YouTube video player written for Atom-Shell. Toby takes the
path of least resistance. It provides a way to specify videos and a way to
look them up and play them. Nothing more, nothing less. Getter done! Play the
videos you really like and love life!

##Screenshots

Video playback

<img src="screenshots/toby-video-playback.png" alt="Video Playback"/>

Search your playlist for a video

<img src="screenshots/toby-video-search.png" alt="Video Selection"/>

Recently played list

<img src="screenshots/toby-recently-played.png" alt="Video Selection"/>

##Dependencies

Toby is written in JavaScript / HTML and CSS and needs Atom-Shell to run:

https://github.com/atom/atom-shell

##How To Run

There are two ways to run Toby. You can download the latest release which 
incorporates the latest code along with Atom-Shell unzip it and run Toby.exe. 
NOTE: I've only included a Windows distribution at this time. I will include
a Linux one soon. I can't support a Mac distribution because I don't have a Mac 
to test on. Theoretically Toby should work fine on Mac and would greatly
appreciate it somebody can let me know or provide Mac binaries so I can release
for all three major OSes. 

The other way is to clone this repository, download Atom-Shell yourself and
then copy Toby's code into the Atom-Shell resources/app folder.

- Clone Toby
- Download Atom-Shell https://github.com/atom/atom-shell/releases
- Copy Toby's code into the [atom-shell-release]/resources/app folder and then
run atom.exe.

##Usage

The data folder has a JSON file in it which is pretty self explanatory. There is
an array of genres which have a set of videos that go with them. Basically what
you do is you just grab the title of the video and the embed URL from YouTube
and add it manually (for now) to the file. You can do this while the app is
running and the new entry will show up in your play list.

Key combos:

F1 - Switch between video search and video playback  
F3 - Restart app  
F12 - Open dev tools

##NOTE

As of Atom-Shell 0.19.2 the Http Referrer patch that I wrote has been incorporated and
videos that are blocked due the referrer not being set will now work. I won't mention
any names of publishers that do this but there is a major one and it now works!

##Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;  
15 January 2015

##License

GNU GPL v3
