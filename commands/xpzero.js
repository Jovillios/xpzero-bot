const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let botembed = new Discord.RichEmbed()
	.setTitle("XPzero")
	.setDescription("Informations XPzero")
	.setColor("#6100ff")
	.addField("Nom", "XPzero")
	.addField("Fonction", "Gestion de l'xp")
	.addField("Créateur", "Jovillios")
	return message.channel.send(botembed);
}

module.exports.help = {
	name: "xpzero"
}