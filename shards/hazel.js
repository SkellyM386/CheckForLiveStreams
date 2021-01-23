const { EventEmitter } = require('events');
const getLiveStreams = require('./base');
const config = require('../config/config.json');
const shardAnswer = new EventEmitter();
  shardAnswer.addListener('get', async streams => {

    const answer = await getLiveStreams({
      CLIENT_ID: config.hazel.CLIENT_ID,
      CLIENT_SECRET: config.hazel.CLIENT_SECRET,
    }, streams).catch(console.error);

    const hazel_exists = (!answer ? []:(Array.isArray(answer) ? answer:[]));

    return shardAnswer.emit('answer', hazel_exists);

  })



module.exports = shardAnswer;
