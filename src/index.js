import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import './index.css';

import App from './app';



ReactDOM.render(
    <div>
        <App />
    </div>
, document.getElementById('root'));
registerServiceWorker();
