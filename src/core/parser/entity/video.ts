'use strict';

import SpriteEntity from './sprite';

import { VideoEntity as VideoEntityInterface, SVGA_VERSION, VideoSize } from 'interface/entity';

const sizeMake = ( width: number, height: number ): VideoSize => {
    return { width, height };
}

export default class VideoEntity implements VideoEntityInterface {
    public version = SVGA_VERSION.VERSION_2_0;
    public videoSize = sizeMake( 0, 0 );
    public FPS = 20;
    public frames = 0;
    public images = { };
    public sprites = [ ];

    constructor ( spec: any, images: any ) {
        if ( spec.params ) {
            this.version = spec.ver;
            this.videoSize.width = spec.params.viewBoxWidth || 0.0;
            this.videoSize.height = spec.params.viewBoxHeight || 0.0;
            this.FPS = spec.params.fps || 20;
            this.frames = spec.params.frames || 0;
        }

        this.resetSprites( spec );

        if ( images ) {
            this.images = images;
        }
    }

    private resetSprites ( spec: any ) {
        if ( spec.sprites instanceof Array ) {
            this.sprites = spec.sprites.map( ( obj ) => {
                return new SpriteEntity( obj );
            } );
        }
    }
}
