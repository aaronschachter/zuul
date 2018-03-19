'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const amqp = require('amqplib/callback_api');
const config = require('./config');

let channel;
const queueName = config.amqp.queueName;

function enqueue(data) {
  const msg = JSON.stringify(data);
  channel.sendToQueue(queueName, new Buffer.from(msg));
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

amqp.connect(config.amqp.url, (err, conn) => {
  conn.createChannel((err, ch) => {
    channel = ch;
    channel.assertQueue(queueName, { durable: false });
    app.listen(8080);
    console.log('starting webserver');
  });
});
