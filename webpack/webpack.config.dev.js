// Dependencies
const { merge } = require('webpack-merge')
const path = require('path')

const config = require('./webpack.config.common')

const BASE_DIR = path.resolve(__dirname, '..')

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        watchFiles: [
            path.join(BASE_DIR, "server/**/*.py"),
            path.join(BASE_DIR, "templates/**/*.html")
        ],
        static: {
            directory: path.join(BASE_DIR, 'public')
        },
        devMiddleware: {
            writeToDisk: true
        }
    },
})