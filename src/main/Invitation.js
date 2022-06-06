import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Container, SecondaryBtn } from "../styles/styledUtils";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Invitation = () => {
  const navigate = useNavigate();
  const [refCode, setRefCode] = useState("123456");
  const [copied, setCopied] = useState(false);
  return (
    <Container>
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
        <h2 style={{ marginLeft: 10 }}>Invite your friends</h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Invitation code:</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{fontWeight: "bold"}}>123456</h2>
          <div>
            <CopyToClipboard
              text={refCode}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
            >
              <Icon
                style={{ width: 25, height: 25, marginTop: -10 }}
                icon="bx:copy"
              />
            </CopyToClipboard>
          </div>
        </div>
        <p style={{textAlign: "center"}}>Copy your invitation code and share with friends</p>
      </div>
      <hr />
      <CopyToClipboard
        text={refCode}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        <SecondaryBtn>
          <p style={{ fontSize: 12,paddingRight: 4 }}>
            Click to copy your invitation link
          </p>
          <Icon icon="ci:share" style={{ color: "#fff", marginTop: -15 }} />
        </SecondaryBtn>
      </CopyToClipboard>
    </Container>
  );
};

export default Invitation;
