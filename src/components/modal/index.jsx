import React from "react";
import { styles } from "./styles";

const Modal = ({ text, width, height, color, textColor, margin }) => {
  return (
    <div style={{ ...styles.container }}>
      <div style={{ width, height, margin, backgroundColor: color, ...styles.modal }} >
        <p style={{ color: textColor, ...styles.modalText }}>{text}</p>
      </div>
    </div>
  );
};

export { Modal };
