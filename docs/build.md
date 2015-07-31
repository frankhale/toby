#Development

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
