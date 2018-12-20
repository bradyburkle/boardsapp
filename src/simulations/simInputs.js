import React from 'react';


const InputVariables = ({ setPlayerNumber }) => {

    return(
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="numOfPlayers">Number of Players</label>
            <input
                onChange={setPlayerNumber}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="numOfPlayers"
                id="numOfPlayers" />
        </div>
        )
};

export default InputVariables;
