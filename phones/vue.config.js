const path = require('path');

//拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('network', resolve('src/network'))
      .set('util', resolve('src/util'))
      .set('views', resolve('src/views'))
  },
  devServer:{
    proxy:{
      '/api':{
        target:'http://192.168.0.198:8360',
        changeOrigin:true
      }
    }
  }
 
}


