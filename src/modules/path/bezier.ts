'use strict';

export default class BezierPath {
    _d;
    _transform;
    _styles;
    _shape;

    constructor ( d = undefined, transform = undefined, styles = undefined ) {
        this._d = d;

        this._transform = transform;

        this._styles = styles;
    }
}
