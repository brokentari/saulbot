/*jshint esversion: 6 */

const commando = require("discord.js-commando");
const childProcess = require("child_process");

function runScript(scriptPath, callback) {
  var invoked = false;
  var process = childProcess.fork(scriptPath);

  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
}

class ConversationStartCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "sconvo",
      group: "personalization",
      memberName: "sconvo",
      description: "talk to the bot"
    });
  }

  async run(message, args) {
    var invoked = false;
    var Cprocess = childProcess.fork("./script.js");

    /*
    Cprocess.on("error", function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
    });

    Cprocess.on("exit", function (code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error("exit code " + code);
      callback(err);
    });
    */

    if (args === 'exit') {
      Cprocess.kill()
      message.channel.send('i see how it is then. goodbye');
    }
    message.channel.send("saulbot is ready to chat with you, you lonely fuck");
  }
}

module.exports = ConversationStartCommand;
