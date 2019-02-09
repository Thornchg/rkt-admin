const path = require('path');
const webpack=require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/css/var.less'),
      ]
    }
  },
  configureWebpack: {

    externals: {
      'vue':'Vue',
      'vue-router': 'VueRouter',
      'vuex':'Vuex',
      'heyui': 'HeyUI'
    },
    plugins:[
        new webpack.ProvidePlugin({
            // 'HeyUI':'HeyUI'
          G: 'hey-global',
          Utils:'hey-utils'
        })
    ]
    /*chainWebpack:(config)=>{
      config.resolve.alias
    }*/

  },
};
