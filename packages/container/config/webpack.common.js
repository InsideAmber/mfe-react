module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory with babel-loader
        use: {
          loader: "babel-loader", // Use Babel loader to transpile JavaScript files
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], // Use presets for modern JavaScript and React
            plugins: ["@babel/plugin-transform-runtime"], // Use plugin to optimize runtime code
          },
        },
      },
    ],
  },
};
