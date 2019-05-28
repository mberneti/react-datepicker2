// custom-transformer.js
'use strict';

const {transform} = require('@babel/core');

module.exports = {
  process(src, filename) {
    const result = transform(src, {
      filename,
      presets: ['@babel/preset-env', '@babel/preset-react'],
      "plugins": [
        "@babel/plugin-transform-runtime",
        "transform-export-extensions",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
      ]
    });

    return result ? result.code : src;
  },
};