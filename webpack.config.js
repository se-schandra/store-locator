const HtmlWebpackPlugin = require('html-webpack-plugin');
require('extract-text-webpack-plugin');
module.exports = {
    entry: './src/index',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader',  'css-loader', "sass-loader"],
            }

            ]
    }

};
