const Promise = require('bluebird');
const fs = require('fs');

module.exports = (message) => {
    return new Promise((res, rej) => {
        if (message.nlu.entities.intent && message.nlu.entities.intent.length > 0) {
            fs.readFile(`./frases/${message.nlu.entities.intent[0].value}`, (err, data) => {
                let frases = data.toString().split('\n');
                let fraseEnvio = frases[Math.round(Math.random() * frases.length)]
                res(fraseEnvio);
            })
            // res("Tenntiendo!")
        } else {
            res('Mi no entender');
        }
    })
}