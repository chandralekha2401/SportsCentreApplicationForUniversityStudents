import React, { useState, useEffect } from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countdown);
      navigate("/dashboard"); 
    }

    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Payment Failed, please wait...</p>
        <p>Redirecting to Dashboard in {timer} seconds</p>
      </header>
    </div>
  );
}

export default PaymentFailure;
