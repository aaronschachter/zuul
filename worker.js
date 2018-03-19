'use strict';

const helpers = require('./lib/helpers');
const config = require('./config');

const q = config.amqp.queueName;

helpers.getAmqpChannel()
  .then((channel) => {
    channel.assertQueue(q, { durable: false });
    console.log(" [*] Waiting for messages in %s.", q);
    channel.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    });
  })
  .catch(err => console.log(err));
