const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js", // Entry point of the application
  output: {
    filename: "[name].[contenthash].js", // Output bundle file name
  },
  resolve: {
    extensions: [".js", ".vue"], // Resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i, // Match image files
        use: [
          {
            loader: "file-loader", // Use file-loader to handle image files
          },
        ],
      },
      {
        test: /\.vue$/, // Match Vue single-file components
        use: "vue-loader", // Use Vue loader to process .vue files
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory with babel-loader
        use: {
          loader: "babel-loader", // Use Babel loader to transpile JavaScript files
          options: {
            presets: ["@babel/preset-env"], // Use presets for modern JavaScript and React
            plugins: ["@babel/plugin-transform-runtime"], // Use plugin to optimize runtime code
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), //Plugin to handle Vue files
  ],
};
