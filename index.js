const express = require('express');
const redis = require('redis');

const app = express();
//create connection to redis server
const client = redis.createClient({
  //note that, without docker, this is usually something like 'https://some-redis-server.com'
  // with docker-compose, we only need to specify name of container "redis-server" and docker-compose will connect us to redis-server container
  host: 'redis-server',
  port: 6379 //optional: default port is always 6379
});

// set initial visit to 0
client.set('visits', 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("number of visits is : ", visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8082, () => {
  console.log("Listening on port 8081");
});
