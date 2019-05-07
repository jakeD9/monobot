const axios = require('axios');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'mute a user for a specified time and capture a log of the event',
    async execute(message, args) {
        // initialize variables
        let actioned = "mute"
        let muted = args[0]
        let duration = args[1]
        let reasoned = args.slice(2).join(" ")
        let authored = message.author.username
        let timestamped = message.createdAt

        if (muted.includes("@")) {
            let taggedUser = message.mentions.users.first();
            if (taggedUser) {
                const member = message.guild.member(taggedUser)
                // check if the user can manage messages for channels, if yes we can't mute them
                if (member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Can't mute, member has Manage Messages permissions.");
                // look for a 'muted' role in the server already
                let muteRole = message.guild.roles.find('name', 'muted');
                // if we don't find it, we make one
                if (!muteRole) {
                    try {
                        muteRole = await message.guild.createRole({
                            name: 'muted',
                            color: '#000000',
                            permissions: []
                        })
                        message.guild.channels.forEach(async (channel, id) => {
                            await channel.overwritePermissions(muteRole, {
                                'SEND_MESSAGES': false,
                                'ADD_REACTIONS': false
                            });
                        });
                    } catch (err) {
                        throw err
                    }
                }

                // checking for a mute duration
                if (!duration) return message.reply("Please specify a time to mute!");

                // add the muted role to them with the duration attached
                await(member.addRole(muteRole.id))
                    .then(() => {
                        let log = {
                            moderator: authored,
                            action: actioned,
                            user: muted,
                            reason: reasoned,
                            timestamp: timestamped
                        }
                        console.log(log)
                        axios.post('http://localhost:8080/logs', log)
                            .then((response) => {
                                console.log(response)
                            })
                            .catch((err) => {
                                throw err
                            })
                    })
                    .catch((err) => {
                        throw err
                    })
                message.reply(`${muted} has been muted for ${ms(ms(duration))}`);

                // timeout function to remove the role after a set of time equal to the ms duration
                setTimeout(() => {
                    member.removeRole(muteRole.id);
                    message.channel.send(`${muted} has been unmuted.`)
                }, ms(duration));
            }
            // look up by discord ID
        } else {
            let taggedUser = message.guild.members.get(args[0])
            if (taggedUser) {
                const member = message.guild.member(taggedUser)
                // check if the user can manage messages for channels, if yes we can't mute them
                if (member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Can't mute, member has Manage Messages permissions.");
                // look for a 'muted' role in the server already
                let muteRole = message.guild.roles.find('name', 'muted');
                // if we don't find it, we make one
                if (!muteRole) {
                    try {
                        muteRole = await message.guild.createRole({
                            name: 'muted',
                            color: '#000000',
                            permissions: []
                        })
                        message.guild.channels.forEach(async (channel, id) => {
                            await channel.overwritePermissions(muteRole, {
                                'SEND_MESSAGES': false,
                                'ADD_REACTIONS': false
                            });
                        });
                    } catch (err) {
                        throw err
                    }
                }

                // checking for a mute duration
                if (!duration) return message.reply("Please specify a time to mute!");

                // add the muted role to them with the duration attached
                await(member.addRole(muteRole.id))
                    .then(() => {
                        let log = {
                            moderator: authored,
                            action: actioned,
                            user: muted,
                            reason: reasoned,
                            timestamp: timestamped
                        }
                        console.log(log)
                        axios.post('http://localhost:8080/logs', log)
                            .then((response) => {
                                console.log(response)
                            })
                            .catch((err) => {
                                throw err
                            })
                    })
                    .catch((err) => {
                        throw err
                    })
                message.reply(`${muted} has been muted for ${ms(ms(duration))}`);

                // timeout function to remove the role after a set of time equal to the ms duration
                setTimeout(() => {
                    member.removeRole(muteRole.id);
                    message.channel.send(`${muted} has been unmuted.`)
                }, ms(duration));
            }
        }
    }
}
