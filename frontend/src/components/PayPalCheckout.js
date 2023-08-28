import React, { useRef, useEffect, useState } from "react";
import PaymentFailure from "./PaymentFailure";
import PaymentSuccess from "./PaymentSuccess";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import userService from "../services/userService";


function PayPalCheckout () {
    

  const paypal = useRef();
  const navigate = useNavigate();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [checkoutData, setCheckoutData] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [body,setBody] = useState({});

  
  
  useEffect(() => {
    const initiatePayment = Cookies.get('initiatePayment'); 
    const jsonDataString = Cookies.get('jsonData');
  if (initiatePayment) {

  
    Cookies.remove("initiatePayment");
    if (localStorage.getItem("token"))
    {
      userService.getGreeting(localStorage.getItem("token"))
                .then(dashboardRoute => {
                  if(dashboardRoute!=="/dashboard")
                      navigate("/login");
                });
    }
    else
    {
      navigate("/login");
    }

     //To retrieve the string from the cookie
    if (jsonDataString) {
      const jsonData = JSON.parse(jsonDataString); //To parse the string to JSON
      
      setCheckoutData(jsonData);
      

      if(checkoutData )
      {
      console.log('JSON Data:', jsonData);
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: checkoutData.key4,
                  amount: {
                    currency_code: "USD",
                    value: jsonData.key1, 
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setOrderId(order.id);
            console.log("success", order);
            setTransactionStatus("success");
            Cookies.set('orderId',order.id);
          },
          onError: (err) => {
            console.log(err);
            setTransactionStatus("failure");
          },
        })
        .render(paypal.current);
      }
    } else {
      console.log('No JSON data found in the cookie.');
      navigate("/dashboard");
    }
  }
  }, []);



  if (transactionStatus === "failure") {
    
    return <PaymentFailure/>
  }
  if (transactionStatus === "success") {
    
    return <PaymentSuccess checkoutData={checkoutData} navigate={navigate} orderId={orderId}/>
   
  }

 
    
  
  
  return (
    <div>
      <header className="header">
  <nav className="navbar navbar-expand-lg header-nav">
    <div className="navbar-header">
      <a id="mobile_btn" href="">
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </a>
      <a href="#" className="navbar-brand logo">
        <h2 style={{color: "white",paddingRight: "30px"}}>Booking System</h2>
      </a>
    </div>
  
  </nav>
</header>
      <div className="modal fade show" id="checkout-form" style={{ display: true ? 'block' : 'none' }}>
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title">Booking System Checkout Page</h3>
        
      </div>
      <form >
        <div className="modal-body">
        <div className="form-group">
            <label>Course Name </label>
        <input type="text"
             name="scmId" value={checkoutData.key4} className="form-control" readOnly/>
          </div>
          <div className="form-group">
          <label>Booking Fee (£)</label>
            <input type="text" name="insName"
             className="form-control" value={checkoutData.key1} readOnly/>
          </div>

          
          <div className="submit-section text-center">
          <div  ref={paypal}></div>
            <button type="button" onClick={()=>{Cookies.remove('jsonData');Cookies.remove("initiatePayment"); navigate("/dashboard");}} className="btn btn-secondary submit-btn" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
      </div>
    
  );
}

export default PayPalCheckout;
