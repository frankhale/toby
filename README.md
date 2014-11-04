toby
====

A simple YouTube video player written for Atom-Shell

##Screenshots

Video playback

<img src="screenshots/toby-video-playback.png" alt="Video Playback"/>

Search your playlist for a video

<img src="screenshots/toby-video-search.png" alt="Video Selection"/>

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

The current version of Atom-Shell 0.19 does not come with a way to set the HTTP
Referrer. Some YouTube videos will block playback from domains they don't
whitelist. To get around this you can patch Atom-Shell 0.19 with the following:

In atom_api_web_contents.cc add the following 2 lines to the LoadURL function:

```cpp
// set the referrer to the same URL that is being requested just to see if it works, AND IT DOES =)
const GURL& fake_referrer_url = params.url;
params.referrer = content::Referrer(fake_referrer_url.GetAsReferrer(), blink::WebReferrerPolicyDefault);
```

Reference Atom-Shell issue:

https://github.com/atom/atom-shell/issues/766

I've created a patch to expose a way to manipulate the Http Referrer via the
JavaScript API and webview. I have a fork of Atom-Shell with that code commited
in it's own branch. I hope to have this finalized soon.

Here is my fork with the commit to expose setting the Http Referrer:

https://github.com/frankhale/atom-shell/commit/39d6cbc88c383049607cf0e5066f16f6716e60ef

##Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;  
3 November 2014

##License

GNU GPL v3
