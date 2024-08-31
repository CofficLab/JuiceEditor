import Sample from "../model/Sample";
import BaseSample from "./BaseSample";
import BigSample from './BigSample';
import ImageSample from './ImageSample';
import TableSample from "./TableSample";

const allSampleNodes: Sample[] = [
    BaseSample,
    BigSample,
    ImageSample,
    TableSample,
];

export default allSampleNodes;