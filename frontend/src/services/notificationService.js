import { notificationUrl,passcodeUrl } from "../utils/apiConfig";

const notificationService = {
    sendNotification(payload) {
      const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      return fetch(notificationUrl+"?value1="+payload.value1+"&value2="+payload.value2+"&value3="+payload.value3, requestOptions)
        .then(res => {
          if (!res.ok) {
            console.error("IFTTT API Error: " + res.statusText);
            throw new Error('Network response was not ok.');
          }
          return res.text();
        })
        .then(data => {
          console.log('IFTTT event triggered successfully:', data);
          return data;
        })
        .catch(function (error) {
          console.error('Error triggering IFTTT event:', error);
          throw error;
        });
    },
    sendPasscode(payload) {
      const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      return fetch(passcodeUrl+"?value1="+payload.value1+"&value2="+payload.value2, requestOptions)
        .then(res => {
          if (!res.ok) {
            console.error("IFTTT API Error: " + res.statusText);
            throw new Error('Network response was not ok.');
          }
          return res.text();
        })
        .then(data => {
          console.log('IFTTT event triggered successfully:', data);
          return data;
        })
        .catch(function (error) {
          console.error('Error triggering IFTTT event:', error);
          throw error;
        });
    },
  };
  
export default notificationService ;