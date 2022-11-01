// Dependencies
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const glob = require('glob')

const BASE_DIR = path.resolve(__dirname, '..')

const getEntryObject = () => {
    const entries = {};

    glob.sync(path.join(BASE_DIR, 'src/app/*.js')).forEach((pathname) => {
      const name = path.basename(pathname, ".js");
      entries[name] = pathname;
    });

    glob.sync(path.join(BASE_DIR, 'src/styles/**/*.scss')).forEach(pathname => {
        const name = path.basename(pathname, ".scss");
        entries[name] = pathname;
    })

    return entries;
  };

// Module to be exported
module.exports = {
    target: "web",
    entry: getEntryObject(),
    output: {
        path: path.join(BASE_DIR, 'public'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.s?(a|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]   
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(BASE_DIR, 'src/assets'), to: path.join(BASE_DIR, 'public/assets')},
                { from: path.join(BASE_DIR, 'src/templates'), to: path.join(BASE_DIR, 'templates')},
            ]
        }),
        new CleanWebpackPlugin()
    ]
}