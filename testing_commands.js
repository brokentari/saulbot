const commando = require('discord.js-commando');
const Discord = require('discord.js');

class TestingCommands extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test', 
            group: 'random',
            memberName: 'test', 
            description: 'testing commands'
        });
    }
    
    async run(message, args) {
        if (args) {
            message.channel.send('args true');
            console.log(typeof arguements);
        }
        else {
            message.channel.send('args not present');
        }
    }
}


module.exports = TestingCommands;
