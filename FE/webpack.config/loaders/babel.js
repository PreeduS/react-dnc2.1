
const prodConfig = {
    test:/\.js$/,
    exclude:/node_modules/,
    use : [{
        loader:'babel-loader',
        options:{
            presets: [
                ['@babel/preset-env',{useBuiltIns: false}], 
                '@babel/preset-react'
            ],
        }
    }]
}
const devConfig = {
    test:/\.js$/,
    exclude:/node_modules/,
    use : [{
        loader:'babel-loader',
        options:{
            presets: [
                ['@babel/preset-env',{useBuiltIns: false}], 
                '@babel/preset-react'
            ],
            //presets: ['@babel/preset-env', '@babel/preset-react'],
            //plugins: ["react-hot-loader/babel"]
        }
    },{
        loader: 'eslint-loader',
        options:{
            
        }
    }]
}


module.exports = ({isProd}) => isProd ? prodConfig : devConfig;


