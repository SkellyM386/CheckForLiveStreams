const request = require("request");
require('dotenv').config({ path: '../env/.env'});

const getToken = (CLIENT_ID, CLIENT_SECRET) => {
  return new Promise(callback => {
  const options = {
    url: 'https://id.twitch.tv/oauth2/token',
     json: true,
      body: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
      }
    };

    request.post(options, (err, res, body) => {
      if(err)return console.log(err);

      const {access_token, expires_in, token_type} = res.body;

      const object = {
        access_token: access_token,
        expires_in: expires_in,
        token_type: token_type
      };

      callback(object);
     });

    });
  };

const getStreams = (streams, access_token, CLIENT_ID, options = { type: 'default' }) => {
  return new Promise(callback => {

  let streamerQuery = `https://api.twitch.tv/helix/streams?user_login=`+streams.join(`&user_login=`).split('#').join('')

  const streamOptions = {
    url: streamerQuery,
    method: 'GET',
    headers: {
      "Client-ID": CLIENT_ID,
      "Authorization": `Bearer ${access_token}`
    }
  };

  request.get(streamOptions, (err, res, body) => {
      if(err)return console.log(err);

      const result = JSON.parse(body);

      if(options.type === 'array'){
        const finalResult = [];

        for(let i = 0; i < result.data.length; i++){
        finalResult.push(result.data[i].user_name)
        }

        callback(finalResult);

      } else if(options.type === 'default'){

        callback(result);

      } else {
        callback(result);

      }
  });



  });
};

const getLiveStreams = (options = { CLIENT_ID: '', CLIENT_SECRET: '' }, streams = []) => {
  return new Promise(async callback => {
    const { CLIENT_ID, CLIENT_SECRET } = options;
    const { access_token } = await getToken(CLIENT_ID, CLIENT_SECRET);

    const answer = await getStreams(streams, access_token, CLIENT_ID, { type: 'array' });

    callback(answer);
  });
};

module.exports = getLiveStreams;