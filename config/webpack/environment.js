const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const { DefinePlugin } = require('webpack')
const path = require("path")
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
module.exports = environment

environment.plugins.prepend(
    'Define',
    new DefinePlugin({
        __VUE_OPTIONS_API__: false,
        // or __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
    })
)

environment.config.merge({
    resolve:{
        alias: {
          "@": path.resolve(__dirname, "..", "..", "app/javascript/src")
        }
      },
    module: {
        unknownContextCritical: false,
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }
        ]
    }
})

module.exports = environment
