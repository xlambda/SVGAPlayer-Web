'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function ( env ) {

    const engine = env.engine;
    const suffixName = env.engine === 'canvas' ? '' : env.engine;

    return {
        entry: {
            'svga':  './src/index.ts',
        },
        output: {
            library: 'SVGA',
            libraryTarget: 'umd',
            filename: `[name]${ suffixName ? `.${ suffixName }` : suffixName }.min.js`,
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
                RENDER_ENGINE: path.resolve( __dirname, `../src/engine/${ engine }` ),
            },
        },
        plugins: [
            new webpack.ProvidePlugin( { } ),
            new UglifyJSPlugin( {
                parallel: true,
            } ),
        ],
    };
};
