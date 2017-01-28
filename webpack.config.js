var webpack = require("webpack");
// var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require("path");

module.exports = {
    // ビルドの基点となるファイル
    entry: path.join(__dirname, '/client/index.js'),
    // ビルド後のファイル
    output: {
        path: path.join(__dirname, "/public/dist"),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    // 拡張子が.jsのファイルはbabel-loaderを通してビルド(node_modulesは除外)
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            // loader: 'ng-annotate!babel'
            loader: 'babel'
        }, {
            test: /\.html$/,
            loader: 'raw!html-minify'
        }]
    },
    plugins: [
        // new DashboardPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ]
};
