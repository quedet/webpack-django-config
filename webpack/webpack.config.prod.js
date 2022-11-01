// Dependencies
const { merge } = require('webpack-merge')

const path = require("path")

const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HTMLMinimizerPlugin = require('html-minimizer-webpack-plugin')

const config = require('./webpack.config.common')

const BASE_DIR = path.resolve(__dirname, '../')

module.exports = merge(config, {
    mode: 'production',
    devtool: 'inline-source-map',
    output: {
        path: path.join(BASE_DIR, 'public'),
        filename: '[name].[fullhash].js',
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin, new CssMinimizerPlugin, new HTMLMinimizerPlugin()]
    },
    plugins: []
})