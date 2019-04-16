const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async(bot, message, args) => {
	if(!xp[message.author.id]) {
		xp[message.author.id] = {
			xp: 0,
			level: 1
		};
	}

	let userxp = xp[message.author.id].xp;
	let userlvl = xp[message.author.id].level;
	let nxtLvl = userlvl * 300;
	let difference = nxtLvl - userxp;

	let lvlEmbed = new Discord.RichEmbed()
	.setAuthor(message.author.username)
	.setColor("#6100ff")
	.addField("Level", userlvl, true)
	.addField("XP", userxp, true)
	.setFooter(`${difference} XP avant level up`, message.author.displayAvatarURL)

	message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});
}

module.exports.help = {
	name: "level"
}