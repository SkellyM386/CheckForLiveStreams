const { EventEmitter } = require('events');
const getLiveStreams = require('./base');
const config = require('../config/config.json');
const shardAnswer = new EventEmitter();
  shardAnswer.addListener('get', async streams => {

    const answer = await getLiveStreams({
      CLIENT_ID: config.vanilla.CLIENT_ID,
      CLIENT_SECRET: config.vanilla.CLIENT_SECRET,
    }, streams).catch(console.error);

    const vanilla_exists = (!answer ? []:(Array.isArray(answer) ? answer:[]));

    return shardAnswer.emit('answer', vanilla_exists);

  });



module.exports = shardAnswer;
