const Telegraf = require('telegraf');
const express = require('express');
const expressApp = express();
const request = require('request');
var requestsync = require('sync-request');

const TOKEN = "673991362:AAGub1g6JuwBDV6Slvm2e3KuWBtZEzGfppg";

const bot = new Telegraf(TOKEN)
expressApp.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://4d458643.ngrok.io/secret-path'); //url dentro de express

expressApp.post('/secret-path', (req, res) => {
    res.send('Hello World!');
});

bot.command('hola', (ctx) => ctx.reply('Hello'));

bot.command('creator', (ctx) => ctx.reply('DREAM TEAM INVICTUS, los más guapos trabajando en tu bot!'));

// bot.command('help', (ctx) => {
//     let mensaje = ctx.message.text;
//     let msgSplit = mensaje.split(" ");
//     let parametro = msgSplit[1]
//     ctx.reply("-------" + devuelveTiempo(parametro))
// });

bot.command('help', (ctx) => {
    let mensaje = ctx.message.text;
    let msgSplit = mensaje.split(" ");
    let parametro = msgSplit[1]
    let respuesta="Estos son los posibles comandos a utilizar:\n /help -> Muestra la ayuda del bot (todos los comandos disponibles y qué hace cada uno de ellos).\n /creator -> Muestra la información sobre el equipo a cargo del proyecto.\n /weather Ciudad -> Muestra al usuario la temperatura máxima, mínima para esa ciudad y el estado actual. Se puede acompañar de una imagen. \n /whereami Dirección -> Devuelve al usuario la latitud y longitud de la dirección que especifique en el comando.";
    ctx.reply(respuesta)
});

bot.command('whereami', (ctx) => {
    let mensaje = ctx.message.text;
    let msgSplit = mensaje.split(" ");
    let parametro = msgSplit[1];

    let url = "http://geocode.xyz/" + parametro + "?json=1";
    var res = requestsync('GET', url);
    let latitud = (JSON.parse(res.getBody()).latt);
    let longitud = (JSON.parse(res.getBody()).longt);
    ctx.reply("Latitud: "+ latitud + " Longitud: " + longitud);

    let url2 = 'https://maps.googleapis.com/maps/api/staticmap?center='+latitud+','+longitud+'&zoom=15&size=800x800&maptype=roadmap&markers=color:green%7Clabel:G%7C'+latitud+','+longitud+'&key=AIzaSyD5h7iot54V6U35ggOGvW6MQGE1Zciune4';

    ctx.replyWithPhoto(url2);
});

bot.command('weather', (ctx) => {
    let mensaje = ctx.message.text;
    let msgSplit = mensaje.split(" ");
    let parametro = msgSplit[1];
    // if (parametro == " ") {
    //     ctx.reply('Empanao mete una ciudad')
    // }
    let url = "http://api.openweathermap.org/data/2.5/find?q=" + parametro + "&units=metric&appid=9bbc7dce1a7556cf2f9fba56ae794734";
    
    var res = requestsync('GET', url);
    var mijson = JSON.parse(res.getBody());

    var temp = mijson.list[0].main.temp;
    var temp_min = mijson.list[0].main.temp_min;
    var temp_max = mijson.list[0].main.temp_max;
    var resultado = " Disfruta del día con los " + temp + "º ya que la mínima será de " + temp_min + "º y una máxima de " + temp_max + "º";

    ctx.reply(resultado)
});

expressApp.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});