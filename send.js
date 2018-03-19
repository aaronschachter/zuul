'use strict'

const amqp = require('amqplib/callback_api');
const config = require('./config');

amqp.connect(config.amqp.url, function(err, conn) {
  if (err) {
    return console.log(err);
  }
  conn.createChannel(function(err, ch) {
    const q = config.amqp.queueName;
    const msg = 'Hello World!';

    ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, new Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
