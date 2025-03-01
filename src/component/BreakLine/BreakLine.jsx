import React from 'react';
import './BreakLine.css';

const BreakLine = ({ text,width='100%' }) => {
  return (
    <div className='breakline-out-container'>
        <div className="breakline-container" style={{width:width}}>
        <span className="breakline-text">{text}</span>
        </div>
    </div>
  );
};

export default BreakLine;