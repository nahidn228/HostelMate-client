
import { FaHome, FaUser } from "react-icons/fa";

const HostelMateIcon = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "3rem",
        color: "#4CAF50", // Adjust the color as needed
        width: "50px",
        height: "50px",
        border: "2px solid #4CAF50",
        borderRadius: "50%",
        background: "#F0F0F0",
      }}
    >
      <FaHome style={{ fontSize: "2rem" }} />
      <FaUser style={{ marginTop: "-10px", fontSize: "1rem" }} />
    </div>
  );
};

export default HostelMateIcon;
