import { useEffect, useState } from "react";

function DigitalClock() {
  const [timeNow, setTimeNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>{timeNow.toLocaleTimeString()}</div>;
}
export default DigitalClock;
