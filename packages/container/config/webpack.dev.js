const {merge} = require('webpack-merge');    //To merge the common and development configurations
const htmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common'); // Import common configuration
const packageJson = require('../package.json') // Import package.json to get shared dependencies


const devConfig = {
    mode: 'development', // Set the mode to development
    devServer:{
        port:8080,
        historyApiFallback: {
            index: 'index.html' // Fallback to index.html for SPA routing
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'container',
            remotes:{
                marketing: 'marketing@http://localhost:8081/remoteEntry.js' // Remote module from marketing
            },
            shared:packageJson.dependencies // Shared dependencies
        }),
        new htmlWebpackPlugin({
            template: './public/index.html', // Template HTML file
        })
    ]
}

module.exports = merge(commonConfig, devConfig); // Merge common and development configurations