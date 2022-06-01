import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addressQR } from "../assets";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "@mui/material/Alert";

const Deposit = () => {
  const [walletId, setWalletId] = useState(
    "TWaNLzBT3t6LWTmDRhUUG3JGheimpngj7y"
  );
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 40,
              flex: 1,
            }}
          >
            <Icon
              icon="akar-icons:arrow-back"
              style={{ width: 30, height: 30, marginTop: -15 }}
              onClick={() => navigate(-1)}
            />
            <h2 style={{ marginLeft: 10 }}>Deposit</h2>
          </div>
          <Icon
            style={{ width: 25, height: 25, marginTop: -35 }}
            icon="ic:outline-history"
          />
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>QR code</h3>
          <img style={styles.qrStyle} src={addressQR} alt="QR" />
          <p style={{ textAlign: "center" }}>
            Send only USDT TRC20 to the deposit address
          </p>
        </div>
      </Container>
      <hr />
      <Container>
        <div style={{ width: "80%" }}>
          <p>Network</p>
          <h3 style={{ fontSize: 14, fontWeight: 500, wordWrap: "break-word" }}>
            TRON (TRC20)
          </h3>
        </div>
        <div>
          <p>Wallet Address</p>
          <div style={{display: "flex",}}>
            <h3
              style={{ fontSize: 14, fontWeight: 500, flex: 1,  width: "100%", wordWrap: "break-word" }}
            >
              {walletId}
            </h3>
            <div>

            <CopyToClipboard
              text={walletId}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
            >
              <Icon
                style={{ width: 25, height: 25,  marginTop: -10}}
                icon="bx:copy"
              />
            </CopyToClipboard>
            </div>
          </div>
          {copied && <Alert severity="success">Copied to clipboard!</Alert>}
        </div>
              <div>

              </div>
              <SecondaryBtn>Done</SecondaryBtn>
      </Container>
    </div>
  );
};

const styles = {
  qrStyle: {
    width: "100%",
  },
};

export default Deposit;
