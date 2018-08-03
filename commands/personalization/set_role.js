/*jshint esversion: 6 */

const commando = require("discord.js-commando");
const fs = require("fs");

class RoleSet extends commando.Command {
  constructor(client) {
    super(client, {
      name: "iam",
      group: "personalization",
      memberName: "iam",
      description: "sets your role"
    });
  }

  async run(message, args) {
    console.log("command executed");
    if (args == "test") {
      message.member
        .addRole("474734298432536578")
        .then(console.log("role set"))
        .catch(console.error);
    } else if (args == "second role") {
      message.member
        .addRole("474734348894208003")
        .then(console.log("second role set"))
        .catch(console.error);
    } else {
      console.log("no args detected");
    }
  }
}

module.exports = RoleSet;
