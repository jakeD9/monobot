module.exports = {
	name: 'kick',
	description: 'kick a user and capture a log of the event',
	execute(message, args) {
        let kicked = args[0]
        let reason = args[1]

        if (kicked.includes("@")) {
            const taggedUser = message.mentions.users.first();
            if(taggeduser) {
                const member = message.guild.member(taggedUser)
                if(member) {
                    member
                        .kick(reason)
                        .then(() => {
                            
                        })
                }
            }
            console.log("kicking" + user);
        } else {

        }

        message.channel.send(args[0]);
    }
};