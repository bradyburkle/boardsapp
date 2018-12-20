import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import boardslogo from './logo.png';

const Logo = () => {
    return (
        <div className="ma2 mt0">
            <Tilt className="Tilt" options={{max: 25}} style={{height: 100, width: 250}}>
                <div className="Tilt-inner"> 
                    <img style={{padding: '5px'}} src={boardslogo} alt="Logo"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo