const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//rem add post css

const devConfig = {
    test:/\.css$/,                     
    use: [
        {
            loader: 'style-loader',    
        },
        {
            loader: 'css-loader',                           
            options: {
                    modules: true,
                    camelCase: true,
                    localIdentName: '[name]__[local]__[hash:base64:8]',
                    minimize: true,
                    sourceMap: true
            }
        },
        {
            loader: 'postcss-loader', 
            options: {
                plugins: () => [
                    require('autoprefixer')
                  ],
                  sourceMap: true
            }
        },
    ]                      
};



const prodConfig = {
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                //publicPath: '../',
            }
        },
        {
            loader: 'css-loader',                           
            options: {
                    modules: true,
                    camelCase: true,
                    localIdentName: '[name]__[local]__[hash:base64:8]',
                    minimize: true,
                    sourceMap: true
            }
        },
        {
            loader: 'postcss-loader', 
            options: {
                plugins: () => [
                    require('autoprefixer')
                  ],
                  sourceMap: true
            }
        },
    ]
    
  
}

/*
//maybe - use all in one
//test: /(\.css|\.scss|\.sass)$/,

//after postcss-loader
{
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
}
*/

module.exports = ({isProd}) => isProd ? prodConfig : devConfig;
