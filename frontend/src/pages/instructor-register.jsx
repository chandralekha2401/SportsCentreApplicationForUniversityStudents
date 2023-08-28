import {React,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import userService from "../services/userService";

const InsRegister =()=>{
    
  const navigate =useNavigate();

  const [input, setInput] = useState({ name: '',email:'',universityId:'', password: '' });
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
           userName: input.name,
           password: input.password,
           email:input.email,
           universityId:input.universityId,
           role:"I",
       })
     };

 function handleErrors(response) {
  if (!response.ok) {
    if (response.status === 400) {
      seterrorMessage('University Id or Email is not valid / already exists');
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

  userService.registerUser(requestOptions,handleErrors)
  .then(data =>{
  
    navigate('/login') ;
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
                  <img src="assets/img/login-banner.jpg" className="img-fluid" alt="Dreampa Register" />
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                <div class="login-header">
                <h3>Instructor Register 
                    <a href="#" onClick={() => { navigate("/register"); }}>Not a Instructor?</a>
                </h3>
                </div>
                <form onSubmit={formValidator}>
                  {errorMessage.length > 0 && <div style={{ marginBottom: '10px',color: 'red' }}>{errorMessage}</div>}
                    <div className="form-group form-focus">
                    <input type="text" name="name"
                      onChange={changeHandle}
                       className="form-control floating" />
                      <label className="focus-label">User Name</label>
                    </div>
                    <div className="form-group form-focus">
                      
                      <input type="email" name="email"
                      onChange={changeHandle}
                       className="form-control floating" />
                      <label className="focus-label">email</label>
                    </div>
                    <div className="form-group form-focus">
                    <input type="text" name="universityId"
                      onChange={changeHandle}
                       className="form-control floating" />
                      <label className="focus-label">University Id</label>
                    </div>
                    <div className="form-group form-focus">
                    <input type="password" name="password" 
                      onChange={changeHandle}
                      className="form-control floating" />
                      <label className="focus-label">Create Password</label>
                    </div>
                    <div className="text-end">
                      <a className="forgot-link" href="login">Already have an account?</a>
                    </div>
                    <button className="btn btn-primary btn-block btn-lg login-btn w-100" type="submit">Signup</button>
                   
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="sidebar-overlay" />
</div>
);
};

export default InsRegister;

