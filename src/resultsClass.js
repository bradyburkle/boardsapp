import React from 'react';
// import Trend from 'react-trend';
import ProgressBar from './components/progressMeter/Meter';



const SimmedCard = ({ id, currentAge, currentRating, potential, retirementAge, simPeriod }) => {
    currentRating = Math.floor(currentRating, 2);
    return (

        <div className="dib ma4 br4 pa2 bw3 shadow-3 grow bg-white o-25">
            <h2>ID: {id}</h2>
            <h3>Current Age: {currentAge}</h3>
            <h3>Current Rating: {currentRating}</h3>
            <h4>Retirement: {retirementAge}</h4>
            <h4>Potential: {potential}</h4>
            <h4>Period: {simPeriod} </h4>

            <div style={{width: '150px'}}>
                {ProgressBar(currentRating)}
            </div>

        </div>
        

    );
};

export default SimmedCard