const TelegrafWit = require('telegraf-wit');
const Promise = require('bluebird');

const wit = new TelegrafWit('KS6ZHRRGKJSEDAB2AXWXW5XMENJSDL74');

module.exports = (message) => {
  return new Promise((res, rej) => {
    wit.meaning(message.text)
      .then(result => {
        message.nlu = result;
        res(message)
      })
  })
}