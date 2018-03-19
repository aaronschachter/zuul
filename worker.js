'use strict';

const amqp = require('amqplib/callback_api');
const config = require('./config');

amqp.connect(config.amqp.url, (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = config.amqp.queueName;

    ch.assertQueue(q, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    ch.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    });
  });
});
