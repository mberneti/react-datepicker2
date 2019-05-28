module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "./tests/transform.js"
    },
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
      }
  };