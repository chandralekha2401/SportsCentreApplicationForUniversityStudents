import {userApis} from '../utils/apiConfig';

const userService = {
    getGreeting(token) {
      return fetch(userApis.greetingApi, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            console.error("GreetingApi: "+res.statusText);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          if(data.role!=null)
          {
            return "/dashboard";
          }
          else{
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            return "/login";
          }
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    getAuthToken(requestOptions,handleErrors){
        return fetch(userApis.authenticateApi, requestOptions)
            .then(handleErrors)
            .then(data => {
              return data;
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });
    },
    registerUser(requestOptions,handleErrors){
        return fetch(userApis.registerApi, requestOptions)
            .then(handleErrors)
            .then(data => {
              return data;
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });
    },
    getUser(token) {
        return fetch(userApis.greetingApi, {
          headers: { "Authorization": `Bearer ${token}` }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              console.error("GreetingApi: "+res.statusText);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              throw new Error('Network response was not ok.');
            }
          })
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            //throw error;
          });
      },
    getUserByEmail(requestOptions,handleErrors){
        return fetch(userApis.emailExistApi, requestOptions)
            .then(handleErrors)
            .then(data => {
              return data;
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });
    },
    updatePasswordByEmail(requestOptions,handleErrors){
      return fetch(userApis.passwordUpdateApi, requestOptions)
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
  }
  };
  

export default userService;
