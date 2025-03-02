import React from 'react';
import './OutlineIcon.css';

const OutlineIcon = ({ svgFile, size = '24px', isOutlined = false, onClick }) => {
  return (
    <div 
      className={`outline-icon ${isOutlined ? 'outlined' : ''}`} 
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <img src={svgFile} alt="icon" className="outline-icon-img" />
    </div>
  );
};

export default OutlineIcon;