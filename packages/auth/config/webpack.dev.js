const {merge} = require('webpack-merge');    //To merge the common and development configurations
const htmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common'); // Import common configuration
const packageJson = require('../package.json') // Import package.json to get shared dependencies

const devConfig = {
    mode: 'development', // Set the mode to development
    output:{
        publicPath: 'http://localhost:8082/' // Set public path for development
    },
    devServer:{
        port:8082,
        historyApiFallback: {
            index: '/index.html' // Fallback to index.html for SPA routing
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'auth',
            filename:'remoteEntry.js',
            exposes:{
                './AuthApp':'./src/bootstrap'
            },
            shared:packageJson.dependencies // Shared dependencies
        }),
        new htmlWebpackPlugin({
            template: './public/index.html', // Template HTML file
        })
    ]
}

module.exports = merge(commonConfig, devConfig); // Merge common and development configurations