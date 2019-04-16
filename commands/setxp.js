const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
	xp[message.author.id].xp = args;
}

module.exports.help = {
	name: "setxp"
}
