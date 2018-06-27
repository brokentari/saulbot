const commando = require('discord.js-commando');

class GambleCommand extends commando.Command {
    constructor (client) {
        super (client, {
            name: 'gamble', 
            group: 'random',
            memberName: 'gamble', 
            description: 'gamble your life savings away'
        });        
    }

    async run(message, args) {
        var roll = Math.floor(Math.random() * 5) + 1;

        if (message.author.id === '141255836914679808') {
            message.reply('you won two lotteries');
        }
        else {
            message.reply(": (");
        }  
    }
}

module.exports = GambleCommand;