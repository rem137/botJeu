const Discord = require('discord.js');
const client = new Discord.Client();
client.on('message', msg => {
  if (msg.content.includes("initial")) {
    msg.channel.send('message 1').then((message)=> {
      setTimeout(function() {
                 message.edit('message deux');
    }, 1000)
  });
  }
});
client.login(process.env.TOKEN);
