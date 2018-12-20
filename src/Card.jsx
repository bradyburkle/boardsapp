import React from 'react';


const fadeOverlay = {
    backgroundImage: 'linear-gradient(180deg, transparent 100%, white 100%'
};



const Card = ({ nba, name, ticker, price, handleClick }, props) => {
    const dataReturn = { ticker: ticker, price: price };
    return (
    
        <div className="dib ma4 br4 pa2 bw3 shadow-3 grow bg-white o-25"  id={dataReturn} price='5' onClick={(e) => handleClick(e, dataReturn)}> 

            <div className="w-100" style={fadeOverlay} >
                
                <img src={`http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nba}.png`} alt='player' id={ticker} style={fadeOverlay}  />

            </div>


            <div className="">
                <div className="f5 tc">
                    <h1>{name}</h1>
                    <hr></hr>
                </div>

                <div className="f7 tc pl2">
                    <h1>{ticker}</h1>
                    <h2>${price}</h2>
                    <div className="tl">
                        <h3>Bid: $</h3>
                        <h3>Ask: $</h3>
                        <h3>Volume:</h3>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Card