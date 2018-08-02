/*jshint esversion: 6 */

const commando = require("discord.js-commando");
const fs = require("fs");
const client = new commando.Client(); // imports
var auth = fs.readFileSync(__dirname + "/auth.json");
var loginToken = (loginToken = JSON.parse(auth)); // loads in auth token

client.registry.registerGroup("random", "Random");
client.registry.registerGroup("trivia", "Trivia");
client.registry.registerGroup("personalization", "Personalization");
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + "/commands"); // registers commands to the bot and its groups

const swear_list = [
  "fuck",
  "ass",
  "shit",
  "hell",
  "bollocks",
  "fuckass",
  "assshit",
  "fuckhell",
  "shithell",
  "assfuck",
  "motherfucker",
  "goddamn",
  "damn",
  "arse",
  "asshole",
  "fck",
  "fucking",
  "fuckin",
  "fckn"
];

client.on("ready", function() {
  client.user.setUsername("saulbot");
  console.log("bot ready to serve");
  client.user
    .setActivity("the peasants work", { type: "WATCHING" })
    .then(console.log("activity set"));
});

client.on("message", message => {
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  var split_message = message.content.toLowerCase().split(" ");

  if (!isEmpty(message.mentions.members.keyArray())) {
    var personalized_messages = fs.readFileSync(
      __dirname + "/commands/personalization/messages.json"
    );

    var messagesDB = JSON.parse(personalized_messages);

    var personalized_messages_array = JSON.parse(personalized_messages);

    for (var i = 0; i < message.mentions.members.keyArray().length; i++) {
      var auth_id = String(message.mentions.members.keyArray()[i]);
      if (
        messagesDB[auth_id] != undefined &&
        message.author.id != 460914316158304278
      ) {
        message.channel
          .send(String(messagesDB[auth_id]))
          .then(message => console.log("message: " + message)) // jshint ignore:line
          .catch(console.error);
      } else {
      }
    }
  }

  var swear_counter = 0;
  for (var k = 0; k < split_message.length; k++) {
    for (var j = 0; j < swear_list.length; j++) {
      if (split_message[k] === swear_list[j]) {
        swear_counter++;
      }
    }
  }

  if (swear_counter != 0) {
    var imgNum = Math.floor(Math.random() * 4) + 1;
    message.channel.send({
      files: [
        {
          attachment: __dirname + "/swear_images/" + imgNum + ".jpg",
          name: "pls_dont_swear.jpg"
        }
      ]
    });
    message.channel.send("d00d sweared " + swear_counter + " times");
  }
});

client.login(process.env.LOGINTK);
