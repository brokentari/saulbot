/*jshint esversion: 6 */

const Discord = require('discord.js');
const schedule = require('node-schedule');
const client = new Discord.Client();

client.login("NDYwOTE0MzE2MTU4MzA0Mjc4.DhVo8Q.olyJdYlOWd5mb-UqBK3VtVkq10A").then(() => {
    console.log('im ready');
    var date = new Date();

    if (date.getDay() == 2) {
        var guild = client.guilds.get('461204454511738900');
        if (guild && guild.channels.get('461204454511738902')) {
            guild.channels.get('461204454511738902').send({
                files: [{
                    attachment: 'tuesday.png',
                    name: 'tuesday.png'
                }]
            });
        } else {
            console.log('nope');
        }
    } else {
        console.log('its not tuesday yet');
    }
    
});