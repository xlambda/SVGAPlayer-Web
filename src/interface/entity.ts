'use strict';

import { Transform } from './transform';
import { Rect } from './rect';

export interface VideoSize {
    width: number;
    height: number;
}

export enum SVGA_VERSION {
    VERSION_1_0 = '1.0',
    VERSION_1_5 = '1.5',
    VERSION_2_0 = '2.0',
}

export interface FrameEntity {
    alpha: number;
    transform: Transform;
    nx: number;
    ny: number;
    layout: Rect;

    /**
     * BezierPath
     */
    maskPath: any;

    /**
     * Object [ ]
     */
    shapes: Array<any>;
};

export interface SpriteEntity {
    imageKey: string;
    frames: FrameEntity[ ];
};

export interface VideoEntity {
    version: SVGA_VERSION;
    videoSize: VideoSize;
    FPS: number;
    frames: number;
    images: Object;
    sprites: Array<any>;
};
