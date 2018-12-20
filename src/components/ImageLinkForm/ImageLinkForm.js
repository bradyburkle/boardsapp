import React from 'react';

const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your pictures.'}
            </p>
            <div className='center'>
                <input type='text' />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple shadow-3">Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm