import { colors } from "./components/colors";

const callAPI = async (url) => {
	let response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		throw new Error(message);
	}
	return response.json();
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


  const getDate = (stamp) => {
    let date = new Date(stamp)
    let monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    
    let month = monthList[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear()
    return `${month} ${day} ${year}`
  }
  const getTime = (stamp) => {
    let time = new Date(stamp);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
  }

  export {getDate, getTime, updateChart, fetchData, initChart}

export default callAPI;