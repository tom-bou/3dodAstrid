const Dotenv = require('dotenv-webpack');

module.exports = function override(config, env) {
  config.plugins = [
    ...config.plugins,
    new Dotenv()
  ];
  return config;
};
