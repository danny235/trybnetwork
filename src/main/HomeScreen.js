import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { updateChart, fetchData, initChart } from "../utils";
import { colors } from "../components/colors";
import {
  AmountInput,
  Container,
  CustomColoredBtn,
} from "../styles/styledUtils";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { useCountdown } from "../hooks/useCountdown";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl, paths } from "../config/index";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const [latestPrice, setLatestPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userProfile, token, balance } = useSelector((state) => state.user);
  const [startTime, setStartTime] = useState(0);
  const [close, setClose] = useState(false);
  let FIVE_MINUTES_IN_S = startTime;
  const [betValues, setBetValues] = useState({
    amount: "",
    bet_type: "",
    bet_slug: null
  })
 

  const [minutes, seconds] = useCountdown(FIVE_MINUTES_IN_S);
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

  const placeBet = async (betValues, slug) => {
    try {
      const { data, status } = await axios.post(
        `${baseUrl}/${paths.createBet}/${slug}/`,
        betValues
      );
      if (status === 200) {
        toast.success("Trade placed");
      }
      console.log(data);
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        return toast.error(err?.response?.data?.detail[0]);
      }
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const fetchCurrentSession = async () => {
    try{

      const { data, status } = await axios.get(`${baseUrl}/${paths.session}/`);
      console.log(data, status);
      let time
      if (status === 200) {
        setBetValues({...betValues, bet_slug: data?.current_session_slug})
        
        time = parseFloat(data?.remaining_time)
        setStartTime(time)
      }
    } catch(err) {
      console.log(err.message)
    }
  };

  useEffect(() => {
    fetchCurrentSession();
  }, []);

  const timeLeft = minutes + seconds;
  // console.log("Time", timeLeft)
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
          fontWeight: 500,
          fontSize: 22,
          paddingLeft: 12,
        }}
      >
        <Icon
          icon="akar-icons:arrow-back"
          style={{ width: 30, height: 30, marginTop: -8, marginRight: 10 }}
          onClick={() => navigate(-1)}
        />{" "}
        Trade
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
            >{`Bal: ${balance} USDT`}</p>
            <AmountInput placeholder="Enter amount" onChange={(text)=> {
              setBetValues({...betValues, amount: parseInt(text.target.value)})
            }} />
            <p
              style={{ ...styles.textStyle }}
            >{`Time remaining: ${minutes}:${seconds}`}</p>
          </div>
          {timeLeft === "0000" ? (
            <p
              style={{
                color: colors.red,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Compiling bets! Please wait for timer to restart
            </p>
          ) : null}

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
                disabled={timeLeft === "0000" ? true : false}
                bgColor={colors.secondary}
                onClick={() => {
                  setBetValues({...betValues, bet_type: "big"})
                  setOpen(true)
                }}
              >
                Big
              </CustomColoredBtn>
              <CustomColoredBtn
                disabled={timeLeft === "0000" ? true : false}
                bgColor={colors.red}
                onClick={() => {
                  setBetValues({...betValues, bet_type: "small"})
                  setOpen(true)
                }}
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
        <Dialog
          fullWidth={true}
          onBackdropClick={() => setOpen(false)}
          open={open}
        >
          <div
            style={{
              height: 300,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 30,
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: 10 }}>
              Do you want to continue?
            </h3>
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
                onClick={() => {
                  setOpen(true)
                  console.log(betValues)
                  placeBet(betValues, userProfile?.profile?.slug)
                }}
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
          </div>
        </Dialog>
      </Container>
    </div>
  );
};

const styles = {
  textStyle: {
    fontWeight: "bold",
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000",
  },
};

export default HomeScreen;
