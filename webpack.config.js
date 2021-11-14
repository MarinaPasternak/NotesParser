const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './src'),
        },
        compress: true,
        port: 3030,
      },
};
