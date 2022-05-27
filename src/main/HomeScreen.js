import React, {useState, useEffect} from "react";
import Brand from "../components/Brand";
import { Icon } from "@iconify/react";
import callAPI from "../utils"
import { colors } from "../components/colors";
import { Container } from "../styles/styledUtils";




const HomeScreen = () => {
    const [latestPrice, setLatestPrice] = useState(0);
    useEffect(() => {
        fetchData().then((chartData) => {
            initChart(chartData);
            setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
        });
        const timerID = setInterval(() => {
			fetchData().then((chartData) => {
				updateChart(chartData);
				setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
			});
		}, 1000 * 60);
		return () => {
			clearInterval(timerID);
		};
    }, []);
    const fetchData = async () => {
        let data = { index: [], price: [], volumes: [] };
        let result = await callAPI("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=1m");
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
            mode: "lines+markers",
            marker: { color: colors.secondary, size: 3 },
        };
        let trace_volumes = {
            name: "Volumne ($B)",
            x: data.index.map((t) => new Date(t)),
            y: data.volumes,
            xaxis: "x",
            yaxis: "y2",
            type: "bar",
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
        <Brand style={{flex: 1}} />
        <button style={styles.hamburgerStyle}>
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
        <div style={{display: 'flex', alignItems: 'center',}}>
            <div>

            <Icon style={{width: 30, height: 30}} icon="logos:bitcoin" />
            </div>
            <div>

            <h2>Bitcoin</h2>
            </div>


        </div>
        <h2>$ {latestPrice}</h2>
        <div id='chart'></div>
      </Container>
    </div>
  );
};

const styles = {
    headerStyle: {
        display: "flex",
        padding: 10
    },
  hamburgerStyle: {
    background: "none",
    outline: "none",
    border: "none",
  },
};

export default HomeScreen;
