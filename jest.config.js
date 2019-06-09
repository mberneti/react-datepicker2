module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "./tests/transform.js"
    },
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js"
      }
  };