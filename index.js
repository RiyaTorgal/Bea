import { config } from 'dotenv';
import { Client, GatewayIntentBits, Message, Routes } from 'discord.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);

client.on('ready',() =>{
  console.log('Bot is ready')
})

client.on('messageCreate',(message) =>{
  console.log(message.content);
  if(message.content === "hi"){
    message.reply("Heloo There!!");
  }
  else if(message.content === "You doing good?"){
    message.channel.send("Yup :D");
  }
})