import React from 'react';
import { techImgUrl } from '../../../util/assets';

function TechImg({ techName }) {
    return (
        <img src={techImgUrl[techName]} alt={techName} height='40px' title={techName} />
    )
}

export default TechImg;