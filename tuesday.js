/*jshint esversion: 6 */

const Discord = require("discord.js");
const schedule = require("node-schedule");
const client = new Discord.Client();

client.login(process.env.LOGINTK).then(() => {
  console.log("im ready");
  var date = new Date();

  console.log(date.getDay());
  if (date.getDay() == 2) {
    var guild = client.guilds.get("432343677759651841");
    if (guild && guild.channels.get("432343677759651843")) {
      guild.channels.get("432343677759651843").send({
        files: [
          {
            attachment: "tuesday.png",
            name: "tuesday.png"
          }
        ]
      });
    } else {
      console.log("nope");
    }
  } else {
    console.log("its not tuesday yet");
  }

  process.exit(22);
});
