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
        
    }
}


module.exports = TestingCommands;
