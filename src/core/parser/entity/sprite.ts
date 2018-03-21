'use strict';

import { SpriteEntity as SpriteEntityInterface } from 'interface/entity';

import FrameEntity from './frame';

export default class SpriteEntity implements SpriteEntityInterface  {
    public imageKey = null;
    public frames = [ ];

    constructor ( spec: any ) {
        this.imageKey = spec.imageKey;

        if ( spec.frames ) {
            this.frames = spec.frames.map( ( obj ) => {
                return new FrameEntity( obj );
            } );
        }
    }
}
