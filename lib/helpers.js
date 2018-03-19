'use strict';

const amqp = require('amqplib');
const config = require('../config');

module.exports = {
  getAmqpChannel: function getAmqpChannel() {
    return amqp.connect(config.amqp.url)
      .then(conn => conn.createChannel())
      .then((channel) => {
        channel.assertQueue(config.amqp.queueName, { durable: false });
        return channel;
      });
  },
};
