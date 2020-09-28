const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const   {CleanWebpackPlugin}   = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ExcludeAssetsPlugin = require('@ianwalter/exclude-assets-plugin')

const environment = (process.env.NODE_ENV || "development").trim();

const devConf  = {

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
  
   
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: [/.css$|.scss$/],
                use: [
                  MiniCssExtractPlugin.loader,
                  
                  "css-loader",
                  "sass-loader",
                  "postcss-loader"
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
            excludeAssets: [/main.bundle.js/]
        }),
        new ExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.bundle.css"
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

};

const prodConf = Object.assign(
    {
      optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false, // Must be set to true if using source-maps in production
           
              }),
          new OptimizeCSSAssetsPlugin()
        ]
      }
    },
    devConf
  );
  
  
  if (environment === "development") {
    module.exports = devConf;
  } else {
    module.exports = prodConf;
  }
  