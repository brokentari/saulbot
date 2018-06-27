const commando = require('discord.js-commando');
const fs = require('fs');
const bot = new commando.Client(); // imports

var auth = fs.readFileSync(__dirname + '\\auth.json');
var objsArray = []
objsArray = JSON.parse(auth); // loads in auth token


bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('trivia', 'Trivia');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '\\commands');  // registers commands to the bot and its groups

const swear_list = ['fuck', 'ass', 'shit', 'hell', 'bollocks', 'fuckass', 'assshit', 'fuckhell', 'shithell', 'assfuck',
                        'motherfucker', 'goddamn', 'damn', 'arse', 'asshole', 'fck'];

bot.on('ready', function() {
    bot.user.setUsername("saulbot");
    console.log('bot ready to serve');
    
})

bot.on('message', message => {

    var message_words = message.content.split(' ');

    if (message.mentions.members.keyArray().includes('141255836914679808')) {
        if (message.author.id != 460914316158304278) {
            message.channel.send('do not speak to saul unless you\'re spoken to');
        }
        else {
            
        }
    }

    var swear_indicator = 0;
    for (var i = 0; i < message_words.length; i++) {
        for (var j = 0; j < swear_list.length; j++) {
            if (message_words[i] === swear_list[j]) {
                swear_indicator++;
            }
        }
    }
    
    if (swear_indicator != 0) {
        var imgNum = Math.floor(Math.random() * 4) + 1;
        message.channel.send({
            files: [{
                attachment: __dirname + '\\swear_images\\' + imgNum + '.jpg',
                name: 'pls_dont_swear.jpg'
            }]
        })
        message.channel.send('d00d sweared ' + swear_indicator + ' times');
    }
    
    /*
    if (message.author.id == 459449641579053057) {
        message.channel.send('don\'t listen to that bot, it\'s always wrong and it sucks');
    }
    */
})

bot.login(objsArray.token);

