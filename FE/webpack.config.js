const path = require('path');
const webpack = require('webpack');
//plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");//webpack 4 not used

//This plugin extracts CSS into separate files
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Enforces case sensitive paths in Webpack requires.
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); 
//JS minifier
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const entry = './dev';
const output = './build';
//const isProd = false;//temp //process.env.NODE_ENV




//module.exports = {
module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    //chalk
    argv.mode && console.log('running in ' + argv.mode);

    return {
        /*entry:{
            index: entry
        },*/
        entry:['@babel/polyfill', entry],
        output:{
            path: path.resolve(__dirname, output),
            filename:'[name].js',
            publicPath:'/'
        },
    
        module:{
            rules:[
                require('./webpack.config/loaders/css')({isProd}),
                require('./webpack.config/loaders/scss'),
                require('./webpack.config/loaders/babel')({isProd}),
                require('./webpack.config/loaders/file'),
            ]
        },
        devtool: isProd ? 'source-map' : 'eval-source-map',
        devServer:{
            contentBase: output,
            inline: true,
            hot: false,
            port: 3000,
            stats: "errors-only",
            historyApiFallback:true
        },
        resolve:{
            alias:{
               '~': path.resolve(__dirname, entry),
            }
        },
        plugins: [
            ...getPlugins({isProd}),
            /*new ExtractTextPlugin({
                filename: 'styles.css',
                disable: !isProd        //not compatible with React Hot Loader
            }),   */
           
        ]
    }

}

function getPlugins({isProd}) {
    const shared = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isProd ? '"production"' : '"development"'
        }),  
    ];
    const plugins = {
        dev: [
            ...shared,
            new CaseSensitivePathsPlugin(),
            new UglifyJsPlugin({
                sourceMap: true,        //cheap-source-map options don't work with this plugin.
                extractComments: 'all',
            })
        ],
        prod: [
            ...shared,
            new HtmlWebpackPlugin({
                template: entry+ '/index.html',
                title:'App',
                minify:{
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }            
            }),
            new CleanWebpackPlugin([output+'/*.*']),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: "[id].css"
            }),

        ]
    }

    return isProd ? plugins.prod : plugins.dev;
}