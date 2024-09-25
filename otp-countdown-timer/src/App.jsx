import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // State variables to manage OTP input,minutes and seconds
  const [otp, setOtp] = useState("");
  // const [minutes, setMinutes] = useState(1);
  // const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  // Function to resend OTP
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds((sec) => sec - 1);
      }

      // When seconds reach 0,decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes((min) => min - 1);
        }
      }
    }, 1000);
    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds]); //Re-run this whenever seconds changes

  return (
    <div className="container">
      <div className="card">
        <h4>Verify OTP</h4>

        {/* Input field for entering OTP */}
        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="countdown-text">
          {/* Displaying Timer */}
          <p>
            Time Remaining:
            <span style={{ fontWeight: 600 }}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>

          {/* Button to resend OTP */}
          <button
            disabled={seconds > 0 || minutes > 0}
            style={{ color: seconds > 0 || minutes > 0 ? "DFE3E8" : "FF5630" }}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
        </div>

        {/* Button to submit OTP */}
        <button className="submit-btn">SUBMIT</button>
      </div>
    </div>
  );
};

export default App;
