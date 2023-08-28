import React, { useState,useEffect,useRef } from "react";
import cInsMapService from "../services/cInsMapService";
import sCourseMapService from "../services/sCourseMapService";
import orderDetailsService from "../services/orderDetailsService";
import venuesData from '../utils/venues.json';
import notificationService from "../services/notificationService";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import PayPalCheckout from "./PayPalCheckout";

const CInsMapTable =(props)=>{ 
  const navigate = useNavigate();
    const {userDetails,getCourseById,setAllCInsMap,allCInsMap,setAllSCmapings,allSCmapings} = props;
    const token = localStorage.getItem("token");
    const [allSCmaps, setAllSCmaps] = useState([]);

    

    Cookies.remove('jsonData');

    useEffect((e) => {
      sCourseMapService.getAllSCMap(token, handleErrors)
      .then(data => {
        
        setAllSCmaps(data);
        
      });
  }, [allSCmapings]);

  
    function paypalPayment(_Payamount,body,courseName)
    {
      const data = { key1: _Payamount, key2: JSON.stringify(body) ,key3:token,key4:courseName,key5:userDetails.data.email }; // Your JSON data
      const jsonDataString = JSON.stringify(data); // Serialize JSON to a string
      Cookies.set('jsonData', jsonDataString, { expires: 7 });
      Cookies.set('initiatePayment',_Payamount);
      navigate("/paypal");
      
      

    }

    function handleErrors(response) {
      if(!response.ok) {
        console.error("exception at cinsmap");
        throw Error(response.statusText);
      }
      else
      {
        return response.json();
      }
    }

    useEffect((e) => {
          cInsMapService.getAllCInsMap(token,handleErrors)
            .then(data =>
              { 
                
                  setAllCInsMap(data);
              }); 
        }, []);

  function checkBookingAvailability(cimId, token, cStrength) {
    return new Promise((resolve, reject) => {
      sCourseMapService.getAllSCMapByCimId(token, handleErrors, cimId)
        .then(data => {
          
          if (data.length < cStrength) {
            // Seats are available
            resolve(false);
          } else {
            // Booking conflict or no seats
            reject("Booking conflict or no seats");
          }
        })
        .catch(error => {
          //console.log("Error:", error);
          reject(error);
        });
    });
  }

  function getCountByCimId( cimId) {


        const count = allSCmaps.reduce((acc, item) => {
          if (item.cimId === cimId) {
            return acc + 1;
          }
          return acc;
        }, 0);
      
        return count;
  }
  

  function checkBookingConflicts(bdate,uid)
  {

     const newClassDate = new Date(bdate);
    
     
     const newClassStarts= new Date(newClassDate.getTime()); 
     const newClassEnds = new Date(newClassDate.getTime() + 60 * 60 * 1000); 
  
       
       const overlappingBookings = allSCmapings.filter(booking => {
         const oldClassStarts = new Date(booking.bookingDate);
         const oldClassEnds =new Date(oldClassStarts.getTime() + 60 * 60 * 1000); 
         
         return booking.userId === uid
             && newClassStarts < oldClassEnds
             && newClassEnds > oldClassStarts;
       });
           
           if (overlappingBookings.length > 0) {
             alert("There is a booking conflict.Please check your bookings..");
             return true;
           }
           else
           {

           return false;

            
           }
       
 
  }
      
  

  function handleBooking(cimId,uid,bdate,uname,courseName,insName,cPrice,rating,comments,markAttendence,cStrength)
  {
    if (window.confirm("Press OK to confrom class booking..") === true) 
    {

      if(checkBookingConflicts(bdate,uid))
      {
        return true;
      }
     

            
          const body = {
            courseName: courseName,
            insName:insName,
            cPrice:cPrice,
            bookingDate:bdate,
            rating:rating,
            comments:comments,
            markAttendence:markAttendence,
            createdBy:uname,
            userId:uid,
            cimId:cimId
        };
          checkBookingAvailability(cimId, token, cStrength)
          .then(result => {

            paypalPayment(cPrice,body,courseName);
           
          })
          .catch(error => {
            alert("Booking Failed, No Seats");
          });
    
          
    } 
    else 
    {
      alert("Booking Canceled");
    }

  }

  function getNotifyEmailsByCimId(cimId) {
    return sCourseMapService.getNotifyEmailsByCimId(token, handleErrors, cimId)
      .then(data => {
        
        return data;
      });
  }

    function handleCancel(newCInsMap)
    {
      const requestOptions = {
        method: 'POST',
        headers: {"Authorization": `Bearer ${token}`,
         'Content-Type': 'application/json' },
        body: JSON.stringify({
          cimId:newCInsMap.cimId,
          courseId: newCInsMap.courseId,
          classDateTime: new Date(newCInsMap.classDateTime),
          effectiveDate: new Date(newCInsMap.effectiveDate),
          expiryDate:new Date(newCInsMap.expiryDate),
          venueId:newCInsMap.venueId,
          userId:newCInsMap.userId,
          createdBy:newCInsMap.createdBy,
          classStrength:newCInsMap.classStrength,
          isCancel:true
      })
    };

    
    var concatenatedEmails="";
  // Getting the emails first
  getNotifyEmailsByCimId(newCInsMap.cimId)
    .then(emails => {
       concatenatedEmails = userDetails.data.email + ',' + emails;
      // Once we  have the emails, updating the CInsMap
      return cInsMapService.updateCInsMap(requestOptions, handleErrors);
    })
    .then(data => {
      
      setAllCInsMap(prevCInsMap => {
        const updatedCInsMap = prevCInsMap.map(cInsMap => {
          if (cInsMap.cimId === newCInsMap.cimId) {
            // Updating the fields with the new data
            return {
              ...cInsMap,
              classDateTime: new Date(newCInsMap.classDateTime),
              effectiveDate: new Date(newCInsMap.effectiveDate),
              expiryDate: new Date(newCInsMap.expiryDate),
              isCancel: true
            };
          }
          return cInsMap;
        });
        return updatedCInsMap;
      });

      const notifyPayload = {
        value1: concatenatedEmails, 
        value2: getCourseById(newCInsMap.courseId).courseName,
        value3: 'Cancelled',
      };

      return notificationService.sendNotification(notifyPayload);
    })
    .then(data => {
      
    })
    .catch(error => {
    });

    }

    function checkExpiry(bdate) {
    
      const olddate = new Date(bdate);
      const today = new Date();
    
      if (olddate.getTime() > today.getTime()) {
        return false; 
      } else {
        return true; 
      }
    
    }

    function getVenueNameById(venueId) {
      const venue = venuesData.find((venue) => venue.id === venueId);
      return venue ? venue.name : '';
    }

    return( 
      <div className="tab-pane fade" id="cinsmap">
      <div classname="text-end">
      
</div>
    <div className="card card-table mb-0">
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-hover table-center mb-0">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Class date (1hr Session)</th>
              <th>Allotments</th>
              <th>Venue</th>
              <th>Booking Status</th>
              <th>Scheduled by</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            
          {allCInsMap.map((item) => (
              <tr key={item.cimId}>
                  <td>{getCourseById(item.courseId).courseName}</td>
                  <td>{ new Date(item.classDateTime).toLocaleString()}</td>
                  <td>{getCountByCimId(item.cimId)} / {item.classStrength}</td>
                  <td>{getVenueNameById(item.venueId)}</td>
                  <td>{item.isCancel===true?"Canceled":(checkExpiry(item.expiryDate)===false)?"Open":"Expired"}</td>
                  
                  <td>{item.createdBy }</td>
                  <td>
                  {userDetails && userDetails.data && (
                    (userDetails.data.role === "I" ) ?  <button className="btn btn-danger btn-sm" disabled={userDetails.data.userId===item.userId ? ((checkExpiry(item.expiryDate)===false && item.isCancel===false)?false:true):true} onClick={() => handleCancel(item)} >Cancel</button> 
                    : 
                    <button disabled={(checkExpiry(item.expiryDate)===false && item.isCancel===false)?false:true} onClick={
                      () => handleBooking(
                      item.cimId,
                      userDetails.data.userId,
                      item.classDateTime,
                      userDetails.data.userName,
                      getCourseById(item.courseId).courseName,
                      item.createdBy,
                      getCourseById(item.courseId).coursePrice,
                      0,
                      null,
                      null,
                      item.classStrength
                      )
                    } 
                    className="btn btn-info btn-sm" >Book Class</button>
                  )}
                  </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  </div>);
};

export default CInsMapTable;