const Telegraf = require('telegraf');
const express = require('express');
const expressApp = express();

const TOKEN = "673991362:AAGub1g6JuwBDV6Slvm2e3KuWBtZEzGfppg";

const bot = new Telegraf(TOKEN)
expressApp.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://4d458643.ngrok.io/secret-path'); //url dentro de express

expressApp.post('/secret-path', (req, res) => {
    res.send('Hello World!');
});

bot.command('hola', (ctx) => ctx.reply('Hello'));

expressApp.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});