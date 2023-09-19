import { config } from 'dotenv';
import { Client, GatewayIntentBits, Message, Routes } from 'discord.js';
import { } from 'node-fetch';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.BOT_TOKEN;
const ID = process.env.APPID;

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
  else if(message.content === "Bea?"){
    message.channel.send("Yes?");
    message.channel.send("Ssup?");
  }
  if(message.content.includes ("weather")&& message.author.bot === false){
    let cityName = message.content.split(" ")[1];
    if(cityName === undefined ){
      message.channel.send("Invalid City Name")
      .catch(console.error)
      return;
    }
    else{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ID}&units=metric`)
      .then(response => {
        return response.json()
      })
      .then (parseWeather => {
        if(parseWeather.cod === '404'){
          message.channel.send("This zip code does not exit not it contains any information")
        }
        else{
          message.channel.send(
            `
            The Current Weather
            Location: ${parseWeather.name}, ${parseWeather.sys.country}
            Forecast: ${parseWeather.weather[0].main}
            Current Temperature: ${parseWeather.main.temp}
            High Temperature: ${parseWeather.main.temp_max}
            Low Temperature: ${parseWeather.main.temp_min}
            `
          )
        }
      })
    }
  }
})