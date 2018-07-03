/*jshint esversion: 6 */

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

var pers_mess = fs.readFileSync('C:\\Users\\saulr\\Documents\\GitHub\\saulbot\\commands\\personalization\\messages.json');
var messagesObj = [];
messagesObj = JSON.parse(pers_mess);

const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('default-application_5b38eb08e4b0d9d6841d1926', '2091d3ee-69f1-425c-9033-3a0831bc7ee1');

class TestingCommands extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'random',
            memberName: 'test',
            description: 'testing commands'
        });
    }

    async run(message, args) { // jshint ignore:line
        
        unirest.get("https://montanaflynn-fifa-world-cup.p.mashape.com/goals")
        .header("accepts", "json")
        .header("X-Mashape-Key", "puwX6kaVukmshqzNwzN811tn94MPp1LDaCajsnixmn0R4lTjHC")
        .header("X-Mashape-Host", "montanaflynn-fifa-world-cup.p.mashape.com")
        .end(function (result) {
        console.log(result.status, result.headers, result.body);
        });

    }
}


module.exports = TestingCommands;