const client = require('./webpack.config.client');
const server = require('./webpack.config.server');

module.exports = [
  {
    ...client,
    dependencies: [server.name],
  },
  {
    ...server,
    output: {
      ...server.output,
      clean: true
    }
  }
];