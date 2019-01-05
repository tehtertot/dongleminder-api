import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Index from './users/index';

function showMain() {
    ReactDOM.render(
        <Index />,
        document.getElementById('root')
    );
}

showMain();

export { showMain };