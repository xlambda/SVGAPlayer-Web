'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const { fork } = require('child_process');

const argv = require('yargs').argv;

const testFolder = path.resolve( __dirname, '../__test__' );
const distFolder = path.resolve( __dirname, '../dist' );
const engineFolder = path.resolve( __dirname, '../src/engine' );

const isDirectory = source => fs.lstatSync( source ).isDirectory( );
const getBasename = source => path.basename( source );

let engines = fs.readdirSync( engineFolder ).map( name => path.join( engineFolder, name ) ).filter( isDirectory ).map( getBasename );

if ( argv.engine !== 'all' && engines.indexOf( argv.engine ) >= 0 ) {
    engines = [ argv.engine ];
}

const openBrowser = ( ) => {
    browserSync( {
        open: true,
        browser: 'google chrome',
        ui: false,
        files: [ `${ testFolder }/**/*`, `${ distFolder }/**/*` ],
        notify: false,
        server: {
            baseDir: testFolder,
            directory: true,
        },
        serveStatic: [ {
            route: '/dist',
            dir: distFolder,
        } ],
    } )

    openBrowser.isRunning = true;
}

openBrowser.isRunning = false;

engines.forEach( ( engine ) => {
    const thread = fork( './scripts/dev-fork' )

    thread.send( { engine } );

    thread.on( 'message', ( result ) => {
        result && !openBrowser.isRunning ? openBrowser( ) : void 0;
    } )
} )
