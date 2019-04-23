require('dotenv').config()
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.AUTH_TOKEN);

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (!message.content.startsWith(prefix) || message.author.bot) {
        return
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send('next time give a command idiot');
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);

        // mock command
        // string -> sTrInG
    } else if (command === 'mock') {
        let oldString = args.join(' ');
        let split = oldString.split('');

        for (let i = 0; i < split.length; i += 2) {
            split[i] = split[i].toLowerCase();
        }
        for (let i = 1; i < split.length; i += 2) {
            split[i] = split[i].toUpperCase();
        }
        let newString = split.join('');

        message.channel.send(newString);

        // penchenski command
        // string -> sTRING
    } else if (command === 'penchenski') {
        let oldString = args.join(' ');
        let split = oldString.toLowerCase().split(' ');

        for (let i = 0; i < split.length; i++) {
            split[i] = split[i].charAt(0).toLowerCase() + split[i].substring(1).toUpperCase();
        }

        let newString = split.join(' ');
        message.channel.send(newString);
    }



});