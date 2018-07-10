/*jshint esversion: 6 */

const commando = require('discord.js-commando');
const fs = require('fs');
const client = new commando.Client(); // imports


var auth = fs.readFileSync(__dirname + '/auth.json');
var objsArray = [];
objsArray = JSON.parse(auth); // loads in auth token

var http = require("http");
setInterval(function() {
    http.get("http://saubot-online.herokuapp.com");
}, 300000); // every 5 minutes (300000)

var server_port = process.env.PORT || 8080;
http.createServer(function (request, response)  {
    console.log('server created');
    console.log(request + ': ' + response);
}).listen(server_port);

client.registry.registerGroup('random', 'Random');
client.registry.registerGroup('trivia', 'Trivia');
client.registry.registerGroup('personalization', 'Personalization');
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + '/commands'); // registers commands to the bot and its groups

const swear_list = ['fuck', 'ass', 'shit', 'hell', 'bollocks', 'fuckass', 'assshit', 'fuckhell', 'shithell', 'assfuck',
    'motherfucker', 'goddamn', 'damn', 'arse', 'asshole', 'fck', 'fucking', 'fuckin', 'fckn'
];


client.on('ready', function () {
    client.user.setUsername("saulbot");
    console.log('bot ready to serve');
    client.user.setActivity('the peasants work', {type: 'WATCHING'})
    .then(console.log('activity set'));

});

client.on('message', message => {

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    var message_words = message.content.toLowerCase().split(' ');

    if (!(isEmpty(message.mentions.members.keyArray()))) {
        var pers_mess = fs.readFileSync(__dirname + '/commands/personalization/messages.json');
        var messagesObj = [];
        messagesObj = JSON.parse(pers_mess);

        for (var i = 0; i < message.mentions.members.keyArray().length; i++) {
            var auth_id = String(message.mentions.members.keyArray()[i]);
            if (messagesObj[auth_id] != undefined && message.author.id != 460914316158304278) {
                message.channel.send(String(messagesObj[auth_id]))
                    .then(message => console.log('message: ' + message)) // jshint ignore:line
                    .catch(console.error);
            } else {

            }
        }
    }

    var swear_indicator = 0;
    for (var k = 0; k < message_words.length; k++) {
        for (var j = 0; j < swear_list.length; j++) {
            if (message_words[k] === swear_list[j]) {
                swear_indicator++;
            }
        }
    }

    if (swear_indicator != 0) {
        var imgNum = Math.floor(Math.random() * 4) + 1;
        message.channel.send({
            files: [{
                attachment: __dirname + '/swear_images/' + imgNum + '.jpg',
                name: 'pls_dont_swear.jpg'
            }]
        });
        message.channel.send('d00d sweared ' + swear_indicator + ' times');
    }


});

client.login(objsArray.token);