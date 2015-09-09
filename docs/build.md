#Development

###Build from source

Things you're going to need:

- Need a Java development kit

  >http://www.oracle.com/technetwork/java/javase/downloads/index.html

- Need Leiningen (http://leiningen.org/)

  >http://leiningen.org/
  >
  >Install instructions can be found here:
  >
  >http://leiningen.org/#install

- Need to make sure leiningen is in the path

  >Both Java and the lein.bat (or bash script) file need to be in >your environment path so that they are usable from a command >line.
  >
  >https://java.com/en/download/help/path.xml

- Need io.js

  >https://iojs.org

- Need Electron

  >https://github.com/atom/electron/releases
  >
  >Once you download a release of Electron unzip it. Have a look at >the contents of the files/folders that are extracted from the >release. The resources folder will be important because that is >where we are going to put the source for Toby.

- Need Git

  >You can either download a zip of the source or you can clone the >source using git.
  >
  >http://git-scm.com/

- If you want to clone the source for Toby
- Open a command prompt

  >NOTE: The following needs to be done in relation to the >Electron/resources folder. We need to put the source for Toby >into a folder called 'app' under the resources folder.
  >
  >```
  >git clone https://github.com/frankhale/toby.git
  >```

Once cloned rename the folder to app.

- Change the directory to that of the clone repo
- Need bower

  >http://bower.io/
  >
  >```
  >npm install -g bower
  >```

- bower install to download JS dependencies

  >From within the repository directory we need to download >Javascript related
  >dependencies that are being tracked via Bower.
  >
  >```
  >bower install
  >```

- npm install to download node dependencies

  >From within the repository directory we need to download Node >related dependencies that are being tracked via npm.
  >
  >```
  >npm install
  >```

- lein cljsbuild once (or auto to keep it open for continuous development)

  >WOW, that was a lot of steps to get up and running!
  >
  >Before we run the leiningen build too we need to remove the >current build folder.
  >I have elected to ship the prebuilt files in the build directory >so that it can
  >be ran in Electron without running through all the steps above. >In order for the
  >ClojureScript compiler to compile the files when we run lein cljsbuild we need to
  >remove the current prebuilt files otherwise it will think nothing >has changed.
  >
  >The last step is to compile the ClojureScript source. For this we >need to use leiningen. The first time it's ran it will download a >bunch of ClojureScript specific dependencies and then compile the code and put the results in the assets\build folder.
  >
  >```
  >lein cljsbuild once
  >```
  >
  >Note: the cljsbuild lein plugin can accept 'once' or 'auto'. The >'auto' option will keep the compiler alive and looking for >changes to the >source. If a change is detected then it will >compile the code again.

###Patching libchromiumcontent for overriding Http Referrer

This needs to be put in either the README or some other doc file so that it's easily found for those wanting to do this themselves. I'd like to eventually get this put into libchromiumcontent upstream.

TL;DR - VEVO videos will be blocked because the HTTP referrer is not set. The following patch will resolve that issue. Note that this is different than setting the HTTP referrer in a webview which Electron already supports. This overrides it for all requests so things like the YouTube iframe API will work nicely with an overridden referrer.

This adds a new switch called --override-http-referrer which will allow you to override the HTTP referrer for all requests.

Patch the SetReferrer function like so in the Chromium source:

location in Chromium source: net\url_request\url_request.cc

NOTE: This requires compling libchromiumcontent and then building Electron against it. Once you run python script\update on libchromiumcontent and it downloads and extracts the Chrome source code you can patch the file and then run the build.

NOTE: I've added the switch inline here for now but really want to put it in base\base_switches.h|.cc (eventually) but I got unresolved symbols doing that. I tried for several hours to track it down but couldn't figure it out yet.  No idea what is going on so I dug into the gyp files but couldn't find a resolution yet.

```cpp
#include "base/command_line.h"

...

void URLRequest::SetReferrer(const std::string& referrer) {
  DCHECK(!is_pending_);

  std::string _referrer = referrer;
  const std::string& override_http_referrer_switch = "override-http-referrer";
  auto command_line = base::CommandLine::ForCurrentProcess();

  if(command_line->HasSwitch(override_http_referrer_switch)) {
    _referrer = command_line->GetSwitchValueASCII(
      override_http_referrer_switch);
  }

  GURL referrer_url(_referrer);
  if (referrer_url.is_valid()) {
    referrer_ = referrer_url.GetAsReferrer().spec();
  } else {
    referrer_ = referrer;
  }
}
```

usage:

```
electron.exe --override-http-referrer=http://foobar.com
```

Or use the Electron API to set the switch in your app.
