import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate = new Date("2029-01-20T00:00:00"); // End of term

    const calculateTimeLeft = () => {
      const currentDate = new Date();
      let timeDiff = endDate - currentDate;

      if (timeDiff < 0) {
        setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Get full years difference
      let years = endDate.getFullYear() - currentDate.getFullYear();
      let months = endDate.getMonth() - currentDate.getMonth();
      let days = endDate.getDate() - currentDate.getDate();

      // Adjust if the current month/day is ahead
      if (days < 0) {
        months -= 1;
        const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += lastMonth.getDate(); // Add days from the previous month
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // Calculate remaining time
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 ">
      <h1 className="text-6xl font-extrabold mb-8 text-center">
        Keep Calm Until Trump Is Gone
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full lg:w-2/3">
        <div className="flex flex-row lg:flex-col justify-evenly">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.years}</p>
            <p className="text-lg">Years</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.months}</p>
            <p className="text-lg">Months</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.days}</p>
            <p className="text-lg">Days</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.hours}</p>
            <p className="text-lg">Hours</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.minutes}</p>
            <p className="text-lg">Minutes</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">{timeLeft.seconds}</p>
            <p className="text-lg">Seconds</p>
          </div>
        </div>
        <div
          className="w-full overflow-hidden relative"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/J7GY1Xg6X20?loop=1&playlist=J7GY1Xg6X20&controls=1&modestbranding=1&rel=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
