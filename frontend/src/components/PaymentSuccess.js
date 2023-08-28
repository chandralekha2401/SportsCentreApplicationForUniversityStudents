import React, { useState, useEffect } from "react";
import "../App.css";
import userService from "../services/userService";
import sCourseMapService from "../services/sCourseMapService";
import orderDetailsService from "../services/orderDetailsService";
import notificationService from "../services/notificationService";
import Cookies from 'js-cookie';

const PaymentSuccess = (props) => {
  const { checkoutData, navigate, orderId } = props;
  const [timer, setTimer] = useState(5); // Initial timer value in seconds

  function handleErrors(response) {
    if (!response.ok) {
      console.error("exception at cinsmap");
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  }

  function saveBooking() {
    console.log("booking called");
    const requestOptionsSCMap = {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${checkoutData.key3}`,
        'Content-Type': 'application/json'
      },
      body: checkoutData.key2
    };

    sCourseMapService.saveSCMap(requestOptionsSCMap, handleErrors)
      .then(data => {
        const requestOptions = {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${checkoutData.key3}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            paymentId: orderId,
            paymentType: "Online",
            scmId: data.scmId,
            paymentAmount: checkoutData.key1,
            paymentstatus: "Paid"
          })
        };

        orderDetailsService.saveOrderDetail(requestOptions, handleErrors)
          .then(data => {
           
            const notifyPayload = {
              value1: checkoutData.key5,
              value2: checkoutData.key4,
              value3: 'Completed',
            };

            notificationService.sendNotification(notifyPayload)
              .then(data => {

              });

            Cookies.remove('jsonData');
          });
      });
  }

  useEffect(() => {
    //  saveBooking() is called only when the component mounts
    const orderIdFromCookie = Cookies.get('orderId'); // Retrieving the string from the cookie
    if (orderIdFromCookie) {
      saveBooking();
      Cookies.remove("orderId");
    }
    
  },[]);

  useEffect(() => {
   

    // Starting the timer when the component mounts
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    // When the timer reaches 0, navigating to the dashboard
    if (timer === 0) {
      navigate("/dashboard");
    }

    // clearing the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [navigate,timer]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Payment Successful</p>
        <p>Class Booked Successfully</p>
        <p>Redirecting to Dashboard in {timer} seconds...</p>
      </header>
    </div>
  );
}

export default PaymentSuccess;
