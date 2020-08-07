const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql'); 
const player = "🔘";
const bariere = "🌳";
const map = [
"🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳"
];
var cor = [
"🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🌳",
"🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳"
];
String.prototype.replaceAt = function(index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 2);
}



var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.MDP,
  database: process.env.DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  



var ecran1 = 0;
var ecran2 = 0;
var currentpos1 = 1;
var currentpos2 = 2; 
client.on('message', msg => {
  if (msg.content.includes("start")) {
    
    //msg.channel.send('ton compte a a bien ete creer fait play pour jouer');
  }
  else if (msg.content.includes("play")) {
    var okk;
    con.query("SELECT `id` FROM `maps and position` WHERE `name` = " + msg.author.id, function (err,result) 
    {
      if (err) throw err;
    console.log("result:");
     console.log(result[0]);
     okk = result[0];
     console.log(okk);
    
    console.log("okk:");
    console.log(okk);
    if (okk !== undefined)
{
  console.log("conect");
      con.query("SELECT `pos1`, `pos2` FROM `maps and position` WHERE `name` = "+msg.author.id, function (err, result) {
    if (err) throw err;
    currentpos1 = result[0].pos1;
    currentpos2 = result[0].pos2;
       console.log(currentpos1+","+currentpos2);
  });
   //console.log(currentpos1+","+currentpos2);

    const p = cor[currentpos1].substr(ecran1,12)+cor[ecran2+1].substr(ecran1,12)+cor[ecran2+2].substr(ecran1,12)+cor[ecran2+3].substr(ecran1,12);
    msg.channel.send(p).then(message => {
      
      for(i = 0;i < map.length;i++)
      {
        cor[i] = map[i];
      }




      //const regex = p.substr(currentpos2,2);
      //cor[currentpos1] = cor[currentpos1].replace(regex,"🔘")
      cor[currentpos1] = cor[currentpos1].replaceAt(currentpos2,player);


      message.edit(cor[ecran2].substr(ecran1,12)+cor[ecran2+1].substr(ecran1,12)+cor[ecran2+2].substr(ecran1,12)+cor[ecran2+3].substr(ecran1,12));
      console.log(cor);
      const gauche = "◀️";
      const droite = "▶️";
      const haut = "🔼";
      const bas = "🔽";
    	message.react(gauche);
      message.react(droite);
      message.react(haut);
      message.react(bas);
    //})//test de fin de msg.channel.send(p).then(message => {
    	client.on('messageReactionAdd', (reaction, user) => {
    		if (reaction.emoji.name === gauche && user.id !== client.user.id)
        {
          console.log(cor[currentpos1].substr(currentpos2,2));
          if (cor[currentpos1].substr(currentpos2-2,2) !== bariere) 
          {
    			if (currentpos2 > ecran1)
          {
            currentpos2 = currentpos2 - 2;
          }
          else
            {
            ecran1 = ecran1-10;
            }
          }
        }
        else if (reaction.emoji.name === droite && user.id !== client.user.id) 
          {
            console.log(map[currentpos1].length);
            console.log(cor[currentpos1].substr(currentpos2+2,2));
            if (cor[currentpos1].substr(currentpos2+2,2) !== bariere) 
            {
          if (currentpos2 < ecran1+10)
          {
            currentpos2 = currentpos2 + 2;
          }
          else
          {
            ecran1 = ecran1+10;
          }
          }
        }
        else if (reaction.emoji.name === haut && user.id !== client.user.id) 
          {
            console.log(cor[currentpos1-1].substr(currentpos2,2));
            if (cor[currentpos1-1].substr(currentpos2,2) !== bariere) 
            {
            if (currentpos1 > ecran2)
            {
              currentpos1--;
            }
            else
            {
            ecran2 = ecran2-3;
            }
          }
          }
        else if (reaction.emoji.name === bas && user.id !== client.user.id) 
          {
            console.log(cor[currentpos1+1].substr(currentpos2,2));
            if (cor[currentpos1+1].substr(currentpos2,2) !== bariere)
            {
            if (currentpos1 < ecran2+3)
            {
              currentpos1++;
            }
            else
            {
            ecran2 = ecran2+3;
            }
          }
          }
        if (user.id !== client.user.id)
        {
          console.log(currentpos1+","+currentpos2);
          for(i = 0;i < map.length;i++)
      {
        cor[i] = map[i];
      }
          //console.log(map);
          //const regex = p.substr(currentpos2,2);
          //console.log("reg:"+regex);
      //cor[currentpos1] = cor[currentpos1].replace(regex,"🔘")
      cor[currentpos1] = cor[currentpos1].replaceAt(currentpos2,player);
      console.log(cor);
      message.edit(cor[ecran2].substr(ecran1,12)+cor[ecran2+1].substr(ecran1,12)+cor[ecran2+2].substr(ecran1,12)+cor[ecran2+3].substr(ecran1,12));
      console.log(cor);

con.query("UPDATE `maps and position` SET `pos1` = '"+currentpos1+"', `pos2` = '"+currentpos2+"' WHERE `maps and position`.`name` = "+msg.author.id, function (err, result) {
    if (err) throw err;
    //var ok = result[0].name;
  });
      

const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
try {
  for (const reaction of userReactions.values()) {
    reaction.users.remove(user.id);
  }
} catch (error) {
  console.error('Failed to remove reactions.');
}
}//fin de if (user.id !== client.user.id)
})//fin de client.on('messageReactionAdd', (reaction, user) => 

    		
})//fin de msg.channel.send(p).then(message => 
}//fin de if (ok !== undefined)  
else 
  {
    console.log("disconect");
    con.query("INSERT INTO `maps and position`(`id`, `name`, `pos1`, `pos2`) VALUES (0,"+msg.author.id+","+currentpos1+","+currentpos2+")", function (err, result) {
    if (err) throw err;
    //var ok = result[0].name;
  });
    //msg.channel.send("tu dois d'abord lancer ton compte avec start");
  } //fin de else et con.query
});//fin de con.query("SELECT `id` FROM `maps and position` WHERE `name` = "+msg.author.id), function (err, result) 
  }//fin de else if (msg.content.includes("react")) 
})//fin de client.on('message', msg => 
});//fin de con.connect
client.login(process.env.TOKEN);
