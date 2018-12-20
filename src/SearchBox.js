import React from 'react';

const SearchBox = ({searchChange}) => {

    return (
        <div className="pa2 center">
            <input
                className="pa3 ba br3 b--light-gray bg-lightest-blue"
                type="search" 
                placeholder="Search Players" 
                onChange={searchChange}
                />
        </div>
    );

}



export default SearchBox;