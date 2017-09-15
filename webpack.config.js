var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules | bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?sourceMap", "resolve-url-loader", "sass-loader?sourceMap=true&sourceMapContents=true"]
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: './'
                        }
                    }
                ]
            },
            { test: /\.(woff2?|ttf|eot)$/, loader: 'url-loader?limit=10000&name=./fonts/[name].[ext]' },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[hash].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'components.html',
            template: 'src/components.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        })
    ]
}
