'use strict';

import { VideoEntity as VideoEntityInterface } from 'interface/entity';

import VideoEntity from './entity/video';
import getFileArrayBuffer from './get-file-ArrayBuffer';
import v1Decompress from './v1-decompress';
import v2Decompress from './v2-decompress';

export default class Parser {
    public async load ( url: string ): Promise<VideoEntityInterface> {
        const fileArrayBuffer = await getFileArrayBuffer( url );

        const dataHeader = new Uint8Array( fileArrayBuffer, 0, 4 );

        const data = ( dataHeader[ 0 ] == 80 && dataHeader[ 1 ] == 75 && dataHeader[ 2 ] == 3 && dataHeader[ 3 ] == 4  ) ? await v1Decompress( fileArrayBuffer ) : await v2Decompress( fileArrayBuffer );

        return new VideoEntity( data.movie, data.images );
    }
};


