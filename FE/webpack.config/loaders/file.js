/*
file-loader:
Any included file (js import) will be emited (created) in the output directory (webpack output) + options.outputPath
Returns the public path

url-loader:
Similar to file-loader
Files under the limit are included inline in the js bundle as base64 format
Files above the limit will use the fallback loader(default file-loader)
The fallback loader will receive the same configuration options as url-loader
*/

/*
module.exports = {
    test:/\.(jpg|png)$/,
    use : [{
        loader:'file-loader',
        options:{
            name:'[name]_[hash:base64:8].[ext]',
            outputPath:'public/',
            //publicPath:'/'
        }
    }]
};*/

module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name:'[name]_[hash:base64:8].[ext]',
                outputPath:'public/',
                fallback: 'file-loader'
              }
            }
          ]
        }
      ]
    }
  }


  //check - different mimetype for different test loaders
