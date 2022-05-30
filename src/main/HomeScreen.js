import React, { useState, useEffect } from "react";
import Brand from "../components/Brand";
import { Icon } from "@iconify/react";
import callAPI from "../utils";
import { colors } from "../components/colors";
import {
  AmountInput,
  Container,
  CustomColoredBtn,
  CustomModal,
} from "../styles/styledUtils";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Backdrop from "@mui/material/Backdrop";
import MenuList from "../components/MenuList";

const HomeScreen = () => {
  const [latestPrice, setLatestPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => {
    fetchData().then((chartData) => {
      initChart(chartData);
      setLatestPrice(
        parseFloat(chartData.price[chartData.price.length - 1]).toFixed(0)
      );
    });
    const timerID = setInterval(() => {
      fetchData().then((chartData) => {
        updateChart(chartData);
        setLatestPrice(
          parseFloat(chartData.price[chartData.price.length - 1]).toFixed(0)
        );
      });
    }, 1000 * 60);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const fetchData = async () => {
    let data = { index: [], price: [], volumes: [] };
    let result = await callAPI(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=1m"
    );
    for (const item of result.prices) {
      data.index.push(item[0]);
      data.price.push(item[1]);
    }
    for (const item of result.total_volumes) data.volumes.push(item[1]);
    return data;
  };

  const initChart = (data) => {
    let trace_price = {
      name: "Price ($)",
      x: data.index.map((t) => new Date(t)),
      y: data.price,
      xaxis: "x",
      yaxis: "y1",
      type: "scatter",
      mode: "markers+lines",
      marker: { color: colors.secondary, size: 1 },
    };
    let trace_volumes = {
      name: "Volumne ($B)",
      x: data.index.map((t) => new Date(t)),
      y: data.volumes,
      xaxis: "x",
      yaxis: "y2",
      type: "lines",
      fill: "tozeroy",
      barmode: "relative",
      marker: {
        color: colors.secondary,
        opacity: 0.7,
      },
    };
    let layout = {
      autosize: true,
      height: "100%",
      margin: {
        l: 50,
        r: 20,
        t: 35,
        pad: 3,
      },
      showlegend: false,
      xaxis: {
        domain: [1, 1],
        anchor: "y2",
      },
      yaxis: {
        domain: [0.1, 1],
        anchor: "x",
      },
      yaxis2: {
        showticklabels: false,
        domain: [0, 0.1],
        anchor: "x",
      },
      grid: {
        roworder: "bottom to top",
      },
    };
    let config = { responsive: true };
    let series = [trace_price, trace_volumes];
    window.Plotly.newPlot("chart", series, layout, config);
  };

  const updateChart = (data) => {
    let trace_price = {
      x: [data.index.map((t) => new Date(t))],
      y: [data.price],
    };
    let trace_volumes = {
      x: [data.index.map((t) => new Date(t))],
      y: [data.volumes],
    };

    window.Plotly.update("chart", trace_price, {}, 0);
    window.Plotly.update("chart", trace_volumes, {}, 1);
  };
  return (
    <div>
      <div style={styles.headerStyle}>
        <Brand style={{ flex: 1 }} />
        <button onClick={()=>setShowMenu(true)} style={styles.hamburgerStyle}>
          <svg
            width="36"
            height="25"
            viewBox="0 0 36 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="5" fill="black" />
            <rect y="10" width="36" height="5" fill="black" />
            <rect y="20" width="36" height="5" fill="black" />
          </svg>
        </button>
      </div>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 17,
            fontWeight: 400,
            marginBottom: 10,
          }}
        >
          <Icon
            style={{ width: 30, height: 30, marginRight: 10 }}
            icon="logos:bitcoin"
          />{" "}
          Bitcoin
        </div>
        <h2>${latestPrice}</h2>
        <div id="chart"></div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{ ...styles.textStyle, textAlign: "right" }}
            >{`Bal: $${100}`}</p>
            <AmountInput placeholder="Enter amount" />
            <p style={{ ...styles.textStyle }}>{`Time remaining: 1:20`}</p>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 25,
                marginBottom: 15,
              }}
            >
              <CustomColoredBtn
                bgColor={colors.secondary}
                onClick={() => setOpen(true)}
              >
                Big
              </CustomColoredBtn>
              <CustomColoredBtn
                bgColor={colors.red}
                onClick={() => setOpen(true)}
              >
                Small
              </CustomColoredBtn>
            </div>

            <Link style={styles.linkStyle} to="/bet-history">
              <p style={{ ...styles.textStyle, textAlign: "center" }}>
                Check bet history <Icon icon="akar-icons:arrow-right" />
              </p>
            </Link>
          </div>
          <div></div>
        </div>
        <Backdrop open={open}>
          <CustomModal height={300} width={85}>
            <h3 style={{textAlign: 'center', marginBottom: 10}}>Do you want to continue?</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 25,
                marginBottom: 15,
              }}
            >
              <CustomColoredBtn
                bgColor={colors.secondary}
                onClick={() => setOpen(true)}
              >
                Proceed
              </CustomColoredBtn>
              <CustomColoredBtn
                bgColor={colors.red}
                onClick={() => setOpen(false)}
              >
                Cancel
              </CustomColoredBtn>
            </div>
          </CustomModal>
        </Backdrop>
      </Container>
      {showMenu && <MenuList onClick={()=>setShowMenu(false)} />}
    </div>
  );
};

const styles = {
  headerStyle: {
    display: "flex",
    padding: 10,
  },
  hamburgerStyle: {
    background: "none",
    outline: "none",
    border: "none",
  },
  textStyle: {
    fontWeight: "bold",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000",
  },
};

export default HomeScreen;
