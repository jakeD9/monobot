module.exports = {
	name: 'mock',
	description: 'string -> sTrInG',
	execute(message, args) {
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
	},
};