const path = require('path');
const webpack = require('webpack');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');


const entries = WebpackWatchedGlobEntries.getEntries(
    [
        path.resolve(__dirname, './web/js/*.js'),
    ]
);

module.exports = {
    watch: true,
    mode: 'development',
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'web/js-lib'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            Routing: 'Routing',
            moment: 'moment',
            swal: 'sweetalert2',
            Swal: 'sweetalert2',
            loaders: 'loaders',
        })
    ],
    resolve: {
        alias: {
            Routing: path.resolve(__dirname, "web/js/router.js"),
            vue: 'vue/dist/vue.esm.js',
            app: path.resolve(__dirname, 'web/js/app.js'),
            moment: path.resolve(__dirname, 'node_modules/moment/min/moment.min.js'),
            loaders: path.resolve(__dirname, 'web/js/loaders.js'),
        }
    },
    externals: {
        'io': 'io',
        jquery: 'jQuery',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']

                    }

                }

            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },


        ]

    },
    stats: {
        warnings: false
    },
    devServer: {
        host: '0.0.0.0',
        compress: true,
        port: 9001
    }

};

