"use strict";
import Sample from './Sample';

window.onload = () => {
    const sample = new Sample({
        output: document.getElementById('webgl-output')
    });
    sample.render();
};