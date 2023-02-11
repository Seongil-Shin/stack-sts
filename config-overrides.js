module.exports = function override(config, env) {
  Object.assign(config.resolve.alias, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
  });
  return config;
};
