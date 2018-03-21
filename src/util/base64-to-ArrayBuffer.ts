'use strict';

export default function ( base64: string ): ArrayBuffer {
    const binary_string = window.atob( base64 );

    const length = binary_string.length;

    const bytes = new Uint8Array( length );

    for ( let i = 0; i < length; i++ ) {
        bytes[ i ] = binary_string.charCodeAt( i );
    }

    return bytes.buffer;
}
