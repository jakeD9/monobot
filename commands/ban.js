const axios = require('axios');
const { API_URL } = require('../config.json')


module.exports = {
    name: 'ban',
    description: 'ban a user and capture a log of the event',
    execute(message, args) {
        // initialize variables
        let actioned = "ban"
        let banned = args[0]
        let reasoned = args.slice(1).join(" ")
        let authored = message.author.username
        let timestamped = message.createdAt

        if (banned.includes("@")) {
            let taggedUser = message.mentions.users.first();
            if (taggedUser) {
                const member = message.guild.member(taggedUser)
                if (member) {
                    member
                        .ban(reasoned)
                        .then((response) => {
                            let log = {
                                moderator: authored,
                                action: actioned,
                                user: banned,
                                reason: reasoned,
                                timestamp: timestamped
                            }
                            console.log(log)
                            axios.post(API_URL, log)
                                .then(() => {
                                    console.log(response);
                                })
                                .catch((err) => {
                                    throw err
                                })
                        })
                        .catch((err) => {
                            throw err
                        })
                }
            }
            // look up by discord ID
        } else {
            let taggedUser = message.guild.members.get(args[0])
            if (taggedUser) {
                const member = message.guild.member(taggedUser)
                if (member) {
                    member
                        .ban(reasoned)
                        .then(() => {
                            let log = {
                                moderator: authored,
                                action: actioned,
                                user: banned,
                                reason: reasoned,
                                timestamp: timestamped
                            }
                            console.log(log)
                            axios.post(API_URL, log)
                                .then((response) => {
                                    console.log(response);
                                })
                                .catch((err) => {
                                    throw err
                                })
                        })
                        .catch((err) => {
                            throw err
                        })
                }
            }
        }

        message.channel.send(`${banned} banned for reason ${reasoned} :ok_hand:`);
    }
}