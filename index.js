const vanilla = require('./shards/vanilla');
const chocolate = require('./shards/chocolate');
const hazel = require('./shards/hazel');
const { EventEmitter } = require('events');
const e = new EventEmitter();

const shards = [vanilla, chocolate, hazel];

const callGetter = (streams = []) => {
  return new Promise(callback => {
  for(const shard of shards){
    shard.emit('get', streams);
  };
  callback(streams);
  });
};

const getResponse = async () => {
  const response = await new Promise(callback => {
    let counter = [];

    const isDone = () => (counter.length === 3 ? callback(counter):{});
    vanilla.on('answer', vanilla_answer => {
      counter.push(vanilla_answer);

      isDone();
    });
    chocolate.on('answer', chocolate_answer => {
      counter.push(chocolate_answer);

      isDone();
    });
    hazel.on('answer', hazel_answer => {
      counter.push(hazel_answer);

      isDone();
    });
  });

  let finalResult = response.join().split(',');

  return [... new Set(finalResult)];
};

(async () => {

  callGetter(['#castlehead', '#ash_on_lol', '#wolfabelle', '#sweet_anita']).catch(console.error);

  const answer = await getResponse().catch(console.error);


  console.log(answer);

})();