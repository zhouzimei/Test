const path = require('path')        //node自带的模块
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry:{
        index:'./src/index.js'               //需要打包的文件
    },
    output:{
        
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    module: {
        rules: [  
            //配置css-loader
            {
                test: /\.css$/,   // 正则表达式，表示.css后缀的文件
                use: ['style-loader','css-loader']   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            },

            //配置less-loader
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },

            //配置url-loader 加载图片
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            //limit字段代表图片打包限制，当图片大小小于限制时会自动转成base64码引用，大于限制正常打包
                            limit:8192,
                            name:'[name][hash:8].[ext'
                        }
                    }
                ]
            },
            //配置其他文件
            {
                exclude: /\.(css|js|html|less)/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[hash:8].[ext]'
                    }
                  },
                ]
        
              },
              //配合es6使用
              {
                test: /\.js$/,
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
   
    
   
}
