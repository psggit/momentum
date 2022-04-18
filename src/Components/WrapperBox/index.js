import React from "react";

const WrapperBox = ({ children }) => {
  return <div style={{ position: "relative", top: 100 }}>{children}</div>;
};

export default WrapperBox;
