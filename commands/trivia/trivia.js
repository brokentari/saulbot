const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level'); // imports

const tableSource = new EnmapLevel({name: 'points'});
const PointSystem = new Enmap({provider: tableSource});  // creates table for point system

var contents = fs.readFileSync(__dirname + '\\pokedex.json');
var objsArray = []
objsArray = JSON.parse(contents); // creates json db from pokedex


class pokeTrivia extends commando.Command {
    constructor(client) {
        super(client, {
            name:'pokemon',
            group: 'trivia',
            memberName: 'pokemon', 
            description: 'who\'s that pokemon'  // creates command info/desc
        }); 
    }                                               

    async run(message, args) { //what the bot runs when command is called
        var pokeNum = Math.floor(Math.random() * 721) + 1;
        var pokeName = objsArray[pokeNum - 1].ename;

        if (args.includes('score')) { 
            if (args.includes('@')) {
                var id = args.substring(8, args.length - 1);    //if someone is mentioned, that score is referenced
                console.log(id);
                message.channel.send(args.substring(6, args.length) + '\'s score is ' + PointSystem.get(id));
            }
            else { //otherwise, the author's score will be referenced
                message.channel.send(message.author.username + '\'s score is ' + PointSystem.get(message.author.id) + ' points');
            }
        }
        
        else {
            if(!(PointSystem.has(message.author.id))) {
                PointSystem.set(message.author.id, 0);
            }
    
            function padNum(number) {  // adds 00 to conform with the image folder/names
                if (number < 10) return '00' + number;
    
                else if (number >= 10 && number < 100) return '0' + number;
    
                else return number;
            }
    
            var file_path = __dirname + "\\thm\\" + padNum(pokeNum) + pokeName + ".png"
    
            message.channel.send({
                files: [{
                    attachment: file_path,
                    name: '05.png'
                }]
            })
            
            const playerScore = Number(PointSystem.get(message.author.id));
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 10000, maxMatches: 1});
            collector.on('collect', message => {
                if (message.content.toLowerCase() == pokeName.toLowerCase()) {
                    PointSystem.set(message.author.id, playerScore + 1);
                    message.channel.send('Correct! Nice job!');
    
                } else {
                    message.channel.send('Wrong');
                    message.channel.send('The correct answer is ' + pokeName);
                }
                console.log(PointSystem.get(message.author.id));
            })
            console.log(PointSystem.get(message.author.id));
        }
    }
}

module.exports = pokeTrivia;
