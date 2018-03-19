'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const helpers = require('./lib/helpers');
const config = require('./config');

let channel;

function enqueue(data) {
  const msg = JSON.stringify(data);
  channel.sendToQueue(config.amqp.queueName, new Buffer.from(msg));
  console.log(" [x] Sent %s", msg);
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/assets/submit.html'));
});

app.post('/', function(req, res) {
  enqueue(req.body);
  res.sendFile(path.join(__dirname + '/assets/success.html'));
});

helpers.getAmqpChannel()
  .then((ch) => {
    channel = ch;
    app.listen(8080);
    console.log('starting webserver');
  })
  .catch(err => console.log(err));
