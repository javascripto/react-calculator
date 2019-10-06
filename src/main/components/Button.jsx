import React from 'react';

import './Button.css';

export default ({ label, operation, double, triple, click }) => (
    <button
        onClick={() => click && click(label)}
        className={`
            button
            ${operation ? 'operation' : ''}
            ${double ? 'double' : ''}
            ${triple ? 'triple' : ''}
        `}>
        {label}
    </button>
);
