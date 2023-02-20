import React from "react";

const ScreenReader = (props) => {
  return (
    <span
      style={{
        height: "1px",
        width: "1px",
        overflow: "hidden",
        position: "absolute",
        paddding: "0",
        margin: "-1px",
      }}
    >
      {props.value}
    </span>
  );
};

export default ScreenReader;
