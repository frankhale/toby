toby
====

A simple YouTube video player written for Atom-Shell

##Screenshots

Video playback

<img src="screenshots/toby-video-playback.png" alt="Video Playback"/>

The video selection is very basic for the time being.

<img src="screenshots/toby-video-selection.png" alt="Video Selection"/>

##Usage

The data folder has a JSON file in it which is pretty self explanatory. There is
an array of genres which have a set of videos that go with them. Basically what
you do is you just grab the title of the video and the embed URL from YouTube
and add it manually (for now) to the file. You can do this while the app is
running and the new entry will show up in your play list.

Key combos:

F1 - Switch between play list and video playback
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

I am working to expose this via JavaScript so that the referrer can be set to
whatever you want. For now setting it to the same URL you are requesting seems
to get around blocked files where the HTTP referrer is not set to an approved
domain in my tests.

##Author(s)

Frank Hale &lt;frankhale@gmail.com&gt;
2 November 2014

##License

GNU GPL v3
