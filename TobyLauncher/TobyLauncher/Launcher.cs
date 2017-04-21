using NDesk.Options;
using Newtonsoft.Json;
using System.Diagnostics;
using System.IO;

// This is primitive and there is not enough error checking yet. This was done as a quick and dirty proof of concept
// so that I can prepare for a release that will be easy to use.

namespace TobyLauncher
{
	class Launcher
	{
		static void Main(string[] args)
		{
			var json = "";
			using (var sr = new StreamReader("package.json"))
			{
				json = sr.ReadToEnd();
			}

			dynamic pkgJSON = JsonConvert.DeserializeObject(json);
			string platform = "nw";
			var opts = new OptionSet() {
						{ "p|platform=", "The platform to use for running Toby (nw, electron, web)", v => platform = v }
					};

			opts.Parse(args);

			switch(platform)
			{
				case "nw":										
					pkgJSON.main = "./build/index.html";
					using (StreamWriter outputFile = new StreamWriter("package.json"))
					{
						outputFile.WriteLine(JsonConvert.SerializeObject(pkgJSON, Formatting.Indented));
					}
					Process.Start(@".\browsers\nw\nw.exe", ".");
					break;
				case "electron":										
					pkgJSON.main = "./build/electron.js";
					using (StreamWriter outputFile = new StreamWriter("package.json"))
					{
						outputFile.WriteLine(JsonConvert.SerializeObject(pkgJSON, Formatting.Indented));
					}
					Process.Start(@".\browsers\electron\electron.exe", ".");
					break;
				case "web":
					// Up in the air about this, I want to suppress the window but if I do that you'd have to kill the Node process in the
					// task manager if you wanted to quit Toby.
					Process.Start(new ProcessStartInfo()
					{
						FileName = @".\node",
						Arguments = "./build/server.js",
						//CreateNoWindow = true 
					});
					Process.Start("http://localhost:62374");
					break;				
			}			
		}
	}
}
