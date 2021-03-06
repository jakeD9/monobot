require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, botRole } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (!message.content.startsWith(prefix) || message.author.bot || !message.member.roles.find(role => role.name === botRole)) return;
   
    try {
        client.commands.get(command).execute(message, args);
    } catch (err) {
        console.log(err);
        message.reply('No command found.');
    }
});