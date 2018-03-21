'use strict';

declare const JSZip;

const loadImages = ( currentIndex: number, images: any, zip: any, movieData: any, callback: Function ): any => {
    if ( currentIndex === Object.getOwnPropertyNames( movieData.images ).length || ( movieData.images && Object.getOwnPropertyNames( movieData.images ).length < 0 ) ) {
        callback( { movie: movieData, images: images } );

        return void 0;
    }

    let key = Object.getOwnPropertyNames( movieData.images )[ currentIndex ];

    if ( images.hasOwnProperty( key ) ) {
        loadImages( currentIndex + 1, images, zip, movieData, callback );

        return void 0;
    }

    let element = movieData.images[ key ];

    zip.file( `${ element }.png` ).async( 'base64' ).then( ( data ) =>  {
        images[ key ] = data;

        loadImages( currentIndex + 1, images, zip, movieData, callback );
    } );
}

export default function ( data: ArrayBuffer ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
        JSZip.loadAsync( data ).then( ( zip ) => {
            zip.file( 'movie.spec' ).async( 'string' ).then( ( spec ) => {
                let movieData = JSON.parse( spec );

                let params = { };

                params[ 'viewBoxWidth' ] = movieData.movie.viewBox.width;
                params[ 'viewBoxHeight' ] = movieData.movie.viewBox.height;
                params[ 'fps' ] = movieData.movie.fps;
                params[ 'frames' ] = movieData.movie.frames;
                movieData[ 'params' ] = params;

                let images = { };

                let currentIndex = 0;

                loadImages( currentIndex, images, zip, movieData, resolve );
            } );
        } );
    } );
};
