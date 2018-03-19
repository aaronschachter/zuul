'use strict';

require('dotenv').config();

module.exports = {
  amqp: {
    url: process.env.CLOUDAMQP_URL,
    queueName: 'zuul',
  },
};
