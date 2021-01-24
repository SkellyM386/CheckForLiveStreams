const { EventEmitter } = require('events');
const getLiveStreams = require('./base');
const config = require('../config.json');
const shardAnswer = new EventEmitter();
  shardAnswer.addListener('get', async streams => {

    const answer = await getLiveStreams({
      CLIENT_ID: config.chocolate.CLIENT_ID,
      CLIENT_SECRET: config.chocolate.CLIENT_SECRET,
    }, streams).catch(console.error);

    const chocolate_exists = (!answer ? []:(Array.isArray(answer) ? answer:[]));

    return shardAnswer.emit('answer', chocolate_exists);

  })



module.exports = shardAnswer;
