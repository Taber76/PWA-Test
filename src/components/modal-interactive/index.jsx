import { styles } from "./styles";

const ModalInteractive = ({ text, width, height, color, textColor, margin, handleSi, handleNo }) => {
  return (
    <div style={{ ...styles.container }}>
      <div style={{ width, height, margin, backgroundColor: color, ...styles.modal }} >
        <p style={{ color: textColor, ...styles.modalText }}>{text}</p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <button onClick={handleSi} style={{ ...styles.button, marginRight: 10, backgroundColor: "rgba(255, 0, 0, 0.2)" }}>Sí</button>
          <button onClick={handleNo} style={{ ...styles.button, backgroundColor: "rgba(0, 128, 0, 0.8)" }}>No</button>
        </div>
      </div>
    </div>
  );
};

export { ModalInteractive };

