module.exports = {
	name: 'penchenski',
	description: 'string -> sTRING',
	execute(message, args) {
        let oldString = args.join(' ');
        let split = oldString.toLowerCase().split(' ');

        for (let i = 0; i < split.length; i++) {
            split[i] = split[i].charAt(0).toLowerCase() + split[i].substring(1).toUpperCase();
        }

        let newString = split.join(' ');
        message.channel.send(newString);
	},
};