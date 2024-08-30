import TreeNode from "../model/TreeNode";
import Sample from "../model/Sample";
import BaseSample from "./BaseSample";
import BigSample from './BigSample';
import ImageSample from './ImageSample';

const allSampleNodes: Sample[] = [
    BaseSample,
    BigSample,
    ImageSample,
];

export default allSampleNodes;