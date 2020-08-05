const Discord = require('discord.js');
const client = new Discord.Client();
client.on('message', msg => {
  if (msg.content.includes("initial")) {
    msg.author.send("ok");
  }
});
client.login(process.env.TOKEN);
