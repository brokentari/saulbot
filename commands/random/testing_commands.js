const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

var pers_mess = fs.readFileSync('C:\\Users\\saulr\\Documents\\GitHub\\saulbot\\commands\\personalization\\messages.json');
var messagesObj = []
messagesObj = JSON.parse(pers_mess);

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
        // console.log(message.mentions);
        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        
        function countKeys(obj) {
            var counter = 0;
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    counter += counter;
            }
            return counter;
        }
        
        
       // if ("141255836914679808" in messagesObj && "14125583691467980" in messagesObj) {
        //    console.log('key in object');
       //} else console.log('key nonexisten');

        if (isEmpty(message.mentions.members.keyArray())) {
            console.log('array empty')
        } else console.log('array not empty');
    }
}


module.exports = TestingCommands;
