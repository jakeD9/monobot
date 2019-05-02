const axios = require('axios');

module.exports = {
    name: 'kick',
    description: 'kick a user and capture a log of the event',
    execute(message, args) {
        let actioned = "kick"
        let kicked = args[0]
        let reasoned = args.slice(1).join(" ")
        let authored = message.author.username
        let timestamped = message.createdAt

        if (kicked.includes("@")) {
            let taggedUser = message.mentions.users.first();
            if (taggedUser) {
                const member = message.guild.member(taggedUser)
                if (member) {
                    member
                        .kick(reasoned)
                        .then(() => {
                            let log = {
                                moderator: authored,
                                action: actioned,
                                user: kicked,
                                reason: reasoned,
                                timestamp: timestamped
                            }
                            console.log(log)
                            axios.post("/logs", log)
                                .then((response) => {
                                    res.json(response);
                                    console.log(response);
                                })
                                .catch((err) => {
                                    throw err
                                })
                        })
                }
            }
        // look up by discord ID
        } else {
            
        }

        message.channel.send(kicked + " kicked for reason " + reasoned);
    }
};