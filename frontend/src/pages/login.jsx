import {React,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import userService from '../services/userService';
import { emailValidator,passwordValidator } from "../utils/validator";
import Cookies from 'js-cookie';
import notificationService from "../services/notificationService";

export const Login =()=>{
     const navigate =useNavigate();
    // //console.log(navigate);
    const [input, setInput] = useState({ username: '', password: '' });
    const [errorMessage,seterrorMessage] = useState('');

    const changeHandle =(e)=>{
    setInput({ ...input, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      if (localStorage.getItem("token"))
      {
        userService.getGreeting(localStorage.getItem("token"))
                  .then(dashboardRoute => {
                    navigate(dashboardRoute);
                  });
      }
       
    }, []);

    const formValidator =(e)=>{
        e.preventDefault();
      
      
      const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userName: input.username,
                password: input.password
            })
          };

      function handleErrors(response) {
        if(response.status==401)
        {
          seterrorMessage('Invalid username / password');
          throw Error(response.statusText);
        }
        else if(!response.ok) {
          //console.log(response);
          seterrorMessage('Internal error, status '+response.status);
            throw Error(response.statusText);
        }
        return response.json();
    }


      userService.getAuthToken(requestOptions,handleErrors)
      .then(data =>{
        
        localStorage.setItem('auth', true);
        localStorage.setItem('token', data.token);
        //handleNavigate(data.token);
        userService.getGreeting(data.token)
          .then(dashboardRoute => {
            navigate(dashboardRoute);
          });
      });

    };

    return(
    <div className="account-page">
  <div className="main-wrapper">
    <div className="content" style={{minHeight: '362.4px'}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="account-content">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                  <img src="assets/img/login-banner.jpg" className="img-fluid" alt="Class Booking System Login" />
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                  <div className="login-header">
                    <h3>Login <span>Class Booking System</span></h3>
                  </div>
                  <form onSubmit={formValidator}>
                  {errorMessage.length > 0 && <div style={{ marginBottom: '10px',color: 'red' }}>{errorMessage}</div>}
                    <div className="form-group form-focus">
                    
                      <input type="text" name="username"
                      onChange={changeHandle}
                       className="form-control floating" />

                      <label className="focus-label">User Name</label>
                    </div>
                    <div className="form-group form-focus">

                      <input type="password" name="password" 
                      onChange={changeHandle}
                      className="form-control floating" />

                      <label className="focus-label">Password</label>
                    </div>
                    <div className="text-end">
                      <a className="forgot-link" href="#" onClick={() => { navigate("/forgot-password"); }}>Forgot Password ?</a>
                    </div>
                    <button className="btn btn-primary btn-block btn-lg login-btn w-100" type="submit">Login</button>
                    <div className="login-or">
                      <span className="or-line" />
                      <span className="span-or">or</span>
                    </div>
                    <div className="text-center dont-have">Don’t have an account? <a href="#" onClick={() => { navigate("/register"); }}>Register</a></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};


export const ForgotPassword =()=>{
  const navigate =useNavigate();
  const [input, setInput] = useState({ email: '', passcode: '',newpassword:'' });
  const [errorMessage,seterrorMessage] = useState('');

  const changeHandle =(e)=>{
  setInput({ ...input, [e.target.name]: e.target.value });
  };

  function generateRandomCode() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getPasscode() {
    if(!emailValidator(input.email))
     alert("Not a valid email"); 
    else
      {
    const passcode = generateRandomCode();
    const expirationMinutes = 5;
    const expirationMilliseconds = expirationMinutes * 60 * 1000;
  
    // Set the passcode as a cookie with a 5-minute expiration time
    Cookies.set('passcode', passcode, { expires: expirationMilliseconds });
  
    
    
                              const notifyPayload = {
                                value1: input.email,
                                value2: passcode
                              };
                    
                              notificationService.sendPasscode(notifyPayload)
                              .then(data =>
                                {
                                  
                                  alert(`New passcode shared to your mail: ${input.email}`);
                                });
      }
  }

  function updatePassword()
  {
    
    if(emailValidator(input.email) 
    && input.passcode!=null 
    && input.passcode.toString().length === 6 && input.passcode=== Cookies.get('passcode')
    && input.newpassword.toString().length>5)
  
    {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: '',
          password: input.newpassword,
          email:input.email,
          universityId:'',
          role:"",
      })
    };

function handleErrors(response) {
 if (!response.ok) {
   if (response.status === 400) {
     seterrorMessage('Email not found');
     throw Error(response.statusText);
       
   }
   else
   {
     
     seterrorMessage('Internal error, status ' + response.status);
     throw Error(response.statusText);
   }

} 
   return response.json();

}

 userService.updatePasswordByEmail(requestOptions,handleErrors)
 .then(data =>{
 
   navigate('/login') ;
 });

  
    }
    else
    {
      alert("enter valid passcode & password");
    }

  }

    return(
    <div className="main-wrapper">
  <div className="content" style={{minHeight: '362.4px'}}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="account-content">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 col-lg-6 login-left">
                <img src="assets/img/login-banner.jpg" className="img-fluid" alt="Login Banner" />
              </div>
              <div className="col-md-12 col-lg-6 login-right">
                <div className="login-header">
                  <h3>Forgot Password?</h3>
                  <p className="small text-muted">Enter your email to get a passcode</p>
                </div>
                <form action="#">
                {errorMessage.length > 0 && <div style={{ marginBottom: '10px',color: 'red' }}>{errorMessage}</div>}
                  <div className="form-group form-focus">
                    <input type="email" name="email"
                      onChange={changeHandle} className="form-control floating" />
                    <label className="focus-label">Email</label>
                  </div>
                  <div className="form-group form-focus">
                  <button className="btn btn-warning btn-block btn-sm" onClick={ getPasscode} type="button">Get Passcode</button>
                  </div>
                  <div className="form-group form-focus">
                    <input type="text" name="passcode"
                      onChange={changeHandle} className="form-control floating" />
                    <label className="focus-label">Passcode</label>
                  </div>
                  <div className="form-group form-focus">
                    <input type="password" name="newpassword"
                      onChange={changeHandle} className="form-control floating" />
                    <label className="focus-label">New Password</label>
                  </div>
                  <div className="text-end">
                    <a className="forgot-link" href="login">Remember your password?</a>
                  </div>
                  <button className="btn btn-primary btn-block btn-lg login-btn w-100" onClick={updatePassword} type="button">Update Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};




