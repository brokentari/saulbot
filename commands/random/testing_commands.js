/*jshint esversion: 6 */

const commando = require("discord.js-commando");
const Discord = require("discord.js");
const fs = require("fs");

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
    // jshint ignore:line
    console.log("testing purpose");
  }
}

module.exports = TestingCommands;
