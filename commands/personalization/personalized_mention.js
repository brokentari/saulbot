/*jshint esversion: 6 */

const commando = require("discord.js-commando");
const fs = require("fs");

var contents = fs.readFileSync(__dirname + "/messages.json").toString();
var messagesObj = JSON.parse(contents);

class PersonalizedMentionCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "personalize",
      group: "personalization",
      memberName: "personalize",
      description: "personalize the response when someone mentions you"
    });
  }

  async run(message, args) {
    var auth_id = message.author.id;
    messagesObj[auth_id] = args;

    fs.writeFileSync(
      __dirname + "/messages.json",
      JSON.stringify(messagesObj, null, 4),
      error => {
        console.log("error caught");
      }
    );

    message.channel.send("message personalized: ready");
  }
}

module.exports = PersonalizedMentionCommand;
