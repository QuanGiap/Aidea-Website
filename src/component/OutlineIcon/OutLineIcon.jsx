import React from "react";
import "./OutlineIcon.css";

const OutlineIcon = ({
  svgFile,
  size = "24px",
  outlined = false,
  onClick,
  clickable = true,
}) => {
  return (
    <div
      className={`outline-icon ${outlined ? "outlined" : ""}`}
      style={{
        width: size,
        height: size,
        cursor: clickable ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <img src={svgFile} alt="icon" className="outline-icon-img" />
    </div>
  );
};

export default OutlineIcon;
