const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ChunksWebpackPlugin = require("chunks-webpack-plugin");
const   {CleanWebpackPlugin}   = require('clean-webpack-plugin');

module.exports = {

    entry: {
        main: [
            './src/js/main.js'
        ]

    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'amd'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$|\.scss$|\.sass$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/images"
                        }
                    }
                ]
            },
            {
                test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "build/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackPlugin({
            title: "TU WEBPACK",
            filename: "index.html",
            template: "./src/index.html",
            // chunks: ["index"],
        }),
        new ChunksWebpackPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new CleanWebpackPlugin(),

    ],
    externals: [
        function (context, request, callback) {

            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request) ||
                /^cluster-layer-js/.test(request)
            ) {
                return callback(null, 'amd ' + request);
            }
            callback();
        }
    ],
    devtool: 'source-map',
};
