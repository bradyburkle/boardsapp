import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 40;

const ProgressBar = (percentage) => { 
    return ( 

        <CircularProgressbar
            initialAnimation={true}
            strokewidth={3}
            percentage={percentage}
            text={`${percentage}`}
            styles={{
                path: { stroke: `rgba(0,255,100, ${percentage / 100})` },
                text: { fill: 'black', fontSize: '24px' },
    }}
    /> ) }

export default ProgressBar

