const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();
let xp = require("./xp.json");

// -------- LIRE COMMANDES -----------

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.lengh <= 0) {
		console.log("Commande non trouvée");
		return;
	}
	jsfile.forEach((f, i) => {
	let props = require(`./commands/${f}`);
	console.log(`${f} chargé`);
	bot.commands.set(props.help.name, props);
	});
})

// -------- LIRE COMMANDES -----------

bot.on("ready", async () =>
{
	console.log(`${bot.user.username} est en ligne`)
});

//-----------------------------------

bot.on("guildMemberAdd", member => {
	if(!xp[member.id]) {
		xp[member.id] = {
			xp: 0,
			level: 1
		};

		let lvlup = new Discord.RichEmbed()
		.setThumbnail(member.user.avatarURL)
		.setTitle("Level Up!")
		.setColor("#6100ff")
		.addField("Nouveau Niveau", xp[member.id].level)
		member.guild.channels.find("name", "bienvenue").send(lvlup).then(msg => {msg.delete(15000)});
	}
});

// -------------------------------------

bot.on("message", async message => {

	if(message.author.bot) return;
	if(message.channel.type == "dm") return;

	// ------------- XP -----------
	let xpAdd = Math.floor(Math.random() * 5) + 7;

	if(!xp[message.author.id]) {
		xp[message.author.id] = {
			xp: 0,
			level: 1
		};
	}

	xp[message.author.id].xp = xp[message.author.id].xp + xpAdd;
	let userxp = xp[message.author.id].xp;
	let userlvl = xp[message.author.id].level;
	let nextLvl = xp[message.author.id].level * 300;

	fs.writeFile("./xp.json", JSON.stringify(xp), err => {
		if(err) console.log(err);
	});

	if(nextLvl <= xp[message.author.id].xp) {
		xp[message.author.id].level = xp[message.author.id].level + 1;
		let lvlup = new Discord.RichEmbed()
		.setThumbnail(message.author.avatarURL)
		.setTitle("Level Up!")
		.setColor("#6100ff")
		.addField("Nouveau Niveau", userlvl + 1)

		message.channel.send(lvlup).then(msg => {msg.delete(5000)})

		if(userlvl + 1 === 10) {
			let newrole = message.guild.roles.find("name", "VIP");
			message.member.addRole(newrole);
		}
	}

	// ------------- XP -----------


	// ------- COMMANDES ----------

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot, message, args);

	// ------- COMMANDES ----------

});

bot.login(enc.process.BOT_TOKEN);
