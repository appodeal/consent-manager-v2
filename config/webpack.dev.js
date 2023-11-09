process.env.RUBY_INJECT_VENDORS_CODE = '';

const paths = require('./paths');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const stubVendorList = require('../stubs/vendorList');

module.exports = merge(common, {
    /**
     * Mode
     *
     * Set the mode to development or production.
     */
    mode: 'development',

    /**
     * Devtool
     *
     * Control how source maps are generated.
     */
    devtool: false, //'inline-source-map',

    /**
     * DevServer
     *
     * Spin up a server for quick development.
     */
    devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8080
    },

    plugins: [
        /**
         * HotModuleReplacementPlugin
         *
         * Only update what has changed.
         */
        new webpack.DefinePlugin({
            VENDOR_LIST: JSON.stringify(stubVendorList)
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
