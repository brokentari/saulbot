const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client)
     {
        super(client, {
            name: 'roll', 
            group: 'random',
            memberName: 'roll', 
            description: 'rolls a die'
        });
    }
    
    async run(message, args) {
        var roll = Math.floor(Math.random() * 5) + 1;

        if (message.author.id === '141255836914679808') {
            message.reply('you rolled an infinte');
        }
        else {
            message.reply("you rolled a " + roll);
        }  
    }
}

module.exports = DiceRollCommand;
