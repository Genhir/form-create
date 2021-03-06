import handler from "./handler";
import render from "./render";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "frame";

const types = {
    frameInputs: ['input', 0],
    frameFiles: ['file', 0],
    frameImages: ['image', 0],
    frameInputOne: ['input', 1],
    frameFileOne: ['file', 1],
    frameImageOne: ['image', 1]
};

const maker = Object.keys(types).reduce((initial, key) => {
    initial[key] = creatorTypeFactory(name, m => m.props({type: types[key][0], maxLength: types[key][1]}));
    return initial
}, {});

maker.frameInput = maker.frameInputs;
maker.frameFile = maker.frameFiles;
maker.frameImage = maker.frameImages;

export default {handler, render, name, maker};
