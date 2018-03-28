'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { version } = require('../package.json');

module.exports = function ( env ) {

    const engine = env.engine;
    const suffixName = env.engine === 'canvas' ? '' : env.engine;

    const banner = `
/*!
 * SVGAPlayer-Web v${ version }
 * Player Engine - ${ engine }
 * (c) 2016-2018 YY.UEDC
 * Released under the Apache2.0 License
 */
`

    return {
        entry: {
            'svga':  './src/index.ts',
        },
        output: {
            library: 'SVGA',
            libraryTarget: 'umd',
            filename: `[name]${ suffixName ? `.${ suffixName }` : suffixName }.min.js`,
            libraryExport: 'default',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader',
                        },
                    ],
                }
            ],
        },
        resolve: {
            extensions: [ '.ts', '.js' ],
            alias: {
                core: path.resolve( __dirname, '../src/core' ),
                modules: path.resolve( __dirname, '../src/modules' ),
                interface: path.resolve( __dirname, '../src/interface' ),
                util: path.resolve( __dirname, '../src/util' ),
                engine: path.resolve( __dirname, '../src/engine' ),
                PLAYER_ENGINE: path.resolve( __dirname, `../src/engine/${ engine }` ),
            },
        },
        plugins: [
            new webpack.BannerPlugin( { banner, raw: true, entryOnly: false } ),
            // new webpack.ProvidePlugin( { } ),
        ],
    };
};
