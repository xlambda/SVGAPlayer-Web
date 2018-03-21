'use strict';

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');

process.on( 'message', ( { engine } ) => {
    console.log( `[${ chalk.blue( 'Dev Player Engine' ) }]`, engine );

    const suffixName = engine === 'canvas' ? '' : engine;

    const options = {
        mode: 'development',
        devtool: 'cheap-eval-source-map',
        entry: {
            'svga':  './src/index.ts',
        },
        output: {
            library: 'SVGA',
            libraryTarget: 'umd',
            filename: `[name]${ suffixName ? `.${ suffixName }` : suffixName }.js`,
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
            new webpack.ProvidePlugin( { } ),
        ],
    }

    const compiler = webpack( options );

    compiler.watch( { }, ( err, stats ) => {
        console.log( stats.toString( {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        } ) );
    } );

    compiler.run( ( ) => process.send( true ) );
} )
