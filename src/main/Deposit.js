import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addressQR } from "../assets";
import { Container } from "../styles/styledUtils";

const Deposit = () => {
const navigate = useNavigate()
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
          marginBottom: 40,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30 }}
          onClick={() => navigate(-1)}
        />
        <h2 style={{ marginLeft: 10 }}>Deposit</h2>
      </div>
      <div>
          <h3>QR code</h3>
          <img src={addressQR} alt="QR" />
      </div>
    </Container>
  );
};

export default Deposit;
