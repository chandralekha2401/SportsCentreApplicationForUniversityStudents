import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";
import userService from "../services/userService";

const Header =()=>{
    const navigate = useNavigate();
      
    const logoutHandler =(e)=>{
        e.preventDefault();
        localStorage.removeItem("auth");
        localStorage.removeItem("token")
        navigate("/login");
        
    };

    useEffect(() => {
      if (localStorage.getItem("token"))
      {
        userService.getGreeting(localStorage.getItem("token"))
                  .then(dashboardRoute => {
                    navigate(dashboardRoute);
                  });
      }
      else
      {
        navigate("/login");
      }
       
    }, []);

    return(
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
  
    
      <a href="#" style={{float:"right",color: "white"}} onClick={logoutHandler}>Logout</a>
      
  </nav>
</header>

        
    );
};

export default Header;