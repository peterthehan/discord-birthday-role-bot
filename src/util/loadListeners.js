const _handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => _handler('ready')(client));
  process.on('unhandledRejection', console.warn);
};
