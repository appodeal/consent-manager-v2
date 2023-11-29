process.env.RUBY_INJECT_VENDORS_CODE = '';

const paths = require('./paths');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const stubVendorListIab = require('../stubs/vendorListIab');
const stubVendorListGoogle = require('../stubs/vendorListGoogle');
const stubVendorListAppodeal = require('../stubs/vendorListAppodeal');

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
        host: '192.168.1.60', //your ip address
        port: 8080,
        disableHostCheck: true,
    },

    plugins: [
        /**
         * HotModuleReplacementPlugin
         *
         * Only update what has changed.
         */
        new webpack.DefinePlugin({
            VENDOR_LIST_IAB: JSON.stringify(stubVendorListIab),
            VENDOR_LIST_GOOGLE: JSON.stringify(stubVendorListGoogle),
            VENDOR_LIST_APPODEAL: JSON.stringify(stubVendorListAppodeal)
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
