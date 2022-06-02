import { Icon } from "@iconify/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { dp, profileBackground } from "../assets";
import {
  Container,
  StyledProfileBackground,
  WhiteSection,
} from "../styles/styledUtils";

const Dashboard = () => {
  const menuRoutes = [
    {
      id: 1,
      name: "Deposit History",
      icon: "ic:outline-history",
      color: "#2a11c1",
      route: "/deposit-history",
    },
    {
      id: 2,
      name: "Withdrawal History",
      icon: "ic:twotone-history-edu",
      color: "#ef5da8",
      route: "/withdrawal-history",
    },
    {
      id: 3,
      name: "Profile settings",
      icon: "ri:user-settings-fill",
      color: "#7879f1",
      route: "/profile-settings",
    },
    {
      id: 4,
      name: "Invitation",
      icon: "fa-solid:user-friends",
      color: "#2a11c1",
      route: "/invitation",
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <StyledProfileBackground>
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 40,
            }}
          >
            <Icon
              icon="akar-icons:arrow-back"
              style={{ width: 30, height: 30, marginTop: -15 }}
              onClick={() => navigate(-1)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={dp} alt="profile photo" />
            <div style={{paddingTop: 20, paddingLeft: 20}}>
              <h3 style={{color: "#fff",}}>Joe Carter</h3>
              <p style={{color: "#fff",}}>Invitation code: 123456</p>
            </div>
          </div>
          <WhiteSection>
            <div>
              <p style={{fontWeight: "bold"}}>My balance</p>
              <p style={{fontWeight: "bold"}}>$100</p>
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000",
                  border: "2px solid #ef5da8",
                  width: 100,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 15
                }}
                to="/withdraw"
              >
                Withdraw
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000",
                  border: "2px solid #ef5da8",
                  width: 100,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 15
                }}
                to="/deposit"
              >
                Deposit
              </Link>
            </div>
          </WhiteSection>
        </Container>
      </StyledProfileBackground>
      <div style={styles.menuListContainer}>
        {menuRoutes.map(({ id, name, icon, color, route }) => (
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
            }}
            key={id}
            to={route}
          >
            <div
              style={{
                borderRadius: 50,
                border: `2px solid ${color}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 70,
                width: 70,
              }}
            >
              <Icon
                style={{ color: color, width: 40, height: 40 }}
                icon={icon}
              />
            </div>
            <p style={{ color: "#000", textAlign: "center", width: "90%" }}>
              {name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  menuListContainer: {
    padding: 15,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    gap: 10,
    flexWrap: "wrap",
    border: "2px solid #ccc",
  },
};

export default Dashboard;
