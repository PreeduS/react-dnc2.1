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

const mode = {
    production: 'production',
    development: 'development',
}
const type = {
    build: 'build',
    serve: 'serve',
}


//module.exports = {
module.exports = (env, argv) => {
    const isProd = argv.type === type.build && argv.mode === mode.production;
    const isBuild = argv.type === type.build;

    //chalk
    if(isBuild){
        console.log(`building in ${isProd ? mode.production : mode.development}`);
    }else{
        console.log(`running in ${isProd ? mode.production : mode.development}`);
    }

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
            ...getPlugins({isProd, isBuild}),
            /*new ExtractTextPlugin({
                filename: 'styles.css',
                disable: !isProd        //not compatible with React Hot Loader
            }),   */
           
        ]
    }

}

function getPlugins({isProd, isBuild}) {
    const shared = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isProd ? '"production"' : '"development"'
        }),  
        new CaseSensitivePathsPlugin(),
    ];
    const plugins = {
        //dev: [
        serve: [
            ...shared,     

        ],
        //prod: [
        build: [
            ...shared,
            new HtmlWebpackPlugin({
                template: entry+ '/index.html',
                minify: {
                    collapseWhitespace: isProd,
                    removeComments: isProd,
                    removeRedundantAttributes: isProd,
                    removeScriptTypeAttributes: isProd,
                    removeStyleLinkTypeAttributes: isProd,
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
            new UglifyJsPlugin({
                sourceMap: true,        //cheap-source-map options don't work with this plugin.
                extractComments: 'all',
            })
        ]
    }

    return isBuild ? plugins.build : plugins.serve;
}