/*jshint esversion: 6 */

const commando = require("discord.js-commando");
const Discord = require("discord.js");
const fs = require("fs");
const PythonShell = require("python-shell");

var options = {
  mode: "text",
  pythonOptions: ["-u"],
  scriptPath: __dirname
};

class TestingCommands extends commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "random",
      memberName: "test",
      description: "testing commands"
    });
  }

  async run(message, args) {
    PythonShell.run("script.py", options, function(err, results) {
      if (err) throw err;
      message.channel
        .send(results.toString().replace("\r", ""))
        .then(console.log("message sent"));
    });
  }
}

module.exports = TestingCommands;
