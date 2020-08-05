'use strict';
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
    context: path.resolve('./src'),
    entry: {
        screw: './index.ts',
    },
    output: {
        path: path.resolve('./build'),
        filename: "[name].js",
        library: "[name]",
        libraryTarget: "umd",
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version),
            REVISION: JSON.stringify( require("child_process").execSync('git rev-parse --short HEAD').toString().trim() ),
            BRANCH: JSON.stringify( require("child_process").execSync('git rev-parse --abbrev-ref HEAD').toString().trim() ),
            BUILD_DATE: JSON.stringify( new Date().toJSON() ),
        })
    ]
};
