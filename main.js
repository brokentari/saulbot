const commando = require('discord.js-commando');
const fs = require('fs');
const bot = new commando.Client(); // imports

var auth = fs.readFileSync(__dirname + '\\auth.json');
var objsArray = []
objsArray = JSON.parse(auth); // loads in auth token




bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('trivia', 'Trivia');
bot.registry.registerGroup('personalization', 'Personalization')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '\\commands');  // registers commands to the bot and its groups

const swear_list = ['fuck', 'ass', 'shit', 'hell', 'bollocks', 'fuckass', 'assshit', 'fuckhell', 'shithell', 'assfuck',
                        'motherfucker', 'goddamn', 'damn', 'arse', 'asshole', 'fck', 'fucking', 'fuckin', 'fckn'];

bot.on('ready', function() {
    bot.user.setUsername("saulbot");
    console.log('bot ready to serve');
    
})

bot.on('message', message => {

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    var message_words = message.content.split(' ');
   
    
    if (!(isEmpty(message.mentions.members.keyArray()))) {
       

        var pers_mess = fs.readFileSync(__dirname + '\\commands\\personalization\\messages.json');
        var messagesObj = []
        messagesObj = JSON.parse(pers_mess);

        for (var i = 0; i < message.mentions.members.keyArray().length; i++) {
            var auth_id = String(message.mentions.members.keyArray()[i]);
            if (messagesObj[auth_id] != undefined && message.author.id != 460914316158304278) {
                message.channel.send(String(messagesObj[auth_id]))
                    .then(message => console.log('message: ' + message))
                    .catch(console.error);
            }
            else {
                
            }
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
})

bot.login(objsArray.token);

