
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

  export {getDate, getTime}

export default callAPI;