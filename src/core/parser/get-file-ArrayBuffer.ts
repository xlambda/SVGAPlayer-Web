'use strict';

import base64ToArrayBuffer from 'util/base64-to-ArrayBuffer';

declare const JSZipUtils;

export default function ( url: string ): Promise<ArrayBuffer> {
    return new Promise( ( resolve, reject ) => {
        if ( url.indexOf( 'data:svga/1.0;base64,' ) >= 0 || url.indexOf( 'data:svga/2.0;base64,' ) >= 0 ) {
            resolve( base64ToArrayBuffer( url.substring( 21 ) ) );

            return void 0;
        }

        JSZipUtils.getBinaryContent( url, ( err, data ) => {
            if ( err ) {
                console.error( `[Get SVGA ArrayBuffer Error]`, err );

                reject( err );
            };

            resolve( data );
        } );
    } );
}
