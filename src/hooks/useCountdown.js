import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - +new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      
      setCountDown(countDownDate - +date);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left

  const minutes = Math.floor((countDown / 60000) % 60);
  const seconds = Math.floor((countDown / 1000) % 60);

  return [minutes, seconds];
};

export { useCountdown };
