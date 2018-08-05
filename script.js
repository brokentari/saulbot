const discord = require("discord.js");

client = new discord.Client();

client.on("ready", function() {
  console.log("test mega successful");
});

client.on("message", message => {
  if (message.author.id != "460914316158304278") {
    message.channel.send("dont talk to me, im leaving");
  }
});

client.login(process.env.LOGINTK);
