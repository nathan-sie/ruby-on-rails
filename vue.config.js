const webpack = require('webpack');

module.exports = {
    plugins: [
        // Define Bundler Build Feature Flags
        new webpack.DefinePlugin({
            // Drop Options API from bundle
            __VUE_OPTIONS_API__: false,
        }),
    ],
};