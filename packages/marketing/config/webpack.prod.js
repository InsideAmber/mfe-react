const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production',
    output: { 
        filename: '[name].[contenthash].js', // Use contenthash for better caching
        publicPath: '/marketing/latest/'  // Set public path for production
    },
    plugins: [
        new ModuleFederationPlugin({        
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap'
            },
            shared:packageJson.dependencies, // Shared dependencies
        }),
    ]
}


module.exports = merge(commonConfig, prodConfig); // Merge common and production configurations