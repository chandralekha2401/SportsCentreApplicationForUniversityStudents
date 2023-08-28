import React, { useState,useEffect,useRef } from "react";
import {useNavigate} from "react-router-dom";
import CInsMapTable from '../components/cinsmap-table';
import {CourseFormModals,CInsMapFormModals,FeedbackFormModals} from '../components/form-modals';
import Header from "../components/header";
import userService from "../services/userService";
import courseService from "../services/courseService";
import sCourseMapService from "../services/sCourseMapService";
import orderDetailsService from "../services/orderDetailsService";
import venuesJsonData from '../utils/venues.json';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import allVenuesData from '../utils/venues.json';

import generatePdfWithTable from '../components/generatePdfWithTable';
import cInsMapService from "../services/cInsMapService";

const Dashboard =()=>{
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [newCourse, setNewCourse] = useState({ cid:'0',cname: '',cdesc:'', cprice: '0' });
    const [newCInsMap, setCInsMap] = useState({ mcid:'0',mdate: '', muserid: '0',mcs:'0',mvenue:'' });
    const [allCInsMap, setAllCInsMap] = useState([]);
    const [allSCmapings, setAllSCmapings] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [upcclass,setUpCClass] = useState([])
    const [selectedRows, setSelectedRows] = useState([]);
    const [venuesData, setVenuesData] = useState([]);

    const token = localStorage.getItem("token");
    

    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedMonth, setSelectedMonth] = useState('1');

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };



    const reportTemplateRef = useRef(null);
    
    
    const handleGeneratePdf = async () => {
      const input = reportTemplateRef.current;
      const canvas = await html2canvas(input, { scrollX: 0, scrollY: -window.scrollY });
  
      const doc = new jsPDF({
        format: 'a4',
        unit: 'px',
      });
  
      
      doc.setFont('Inter-Regular', 'normal');
  
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 580;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth , pdfHeight);
        doc.save('bookings.pdf');
    };

    
    const handleDownloadAsPdf = (scmId, courseName) => {
      const columnWidths = [30, 70, 70, 160, 50, 65, 50];
      
      orderDetailsService.getAllOrderDetailsByScmId(scmId, token, handleErrors)
        .then(data => {

          const tableData = [
            ["ID", "Booking Id", "Order Date", "Payment ID", "Type", "Amount (£)", "Status"], // Header row
            ...(data || []).map(item => [
              String(item.odId),
              String(item.scmId),
              new Date(item.orderDate).toLocaleDateString(), 
              item.paymentId,
              item.paymentType,
              String(item.paymentAmount),
              item.paymentstatus
            ])
          ];
    
          
          generatePdfWithTable(courseName + " - Course Booking Payment Details", tableData, columnWidths);
        })
        .catch(error => {
          // To handle errors that occurred during the API call
          console.error(error);
        });
    };
    
    
    
const handleCheckboxChange = (rowId, checked) => {
  if (rowId === "all") {
    if (checked) {
      setSelectedRows(allSCmapings.map(row => row.scmId));
    } else {
      setSelectedRows([]);
    }
  } else {
    if (checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter(scmId => scmId !== rowId));
    }
  }
};

function handleAttendanceSelected(status) {
  selectedRows.forEach(rowId => {
    const item = allSCmapings.find(row => row.scmId === rowId);
    if (item) {
      handleAttendance(item, status,false);
    }
  });
  if(status==="P")
    alert("Present updated for selected");
  else
    alert("Absent updated for selected");
  setSelectedRows([]);
}


    const handleSelectCourseChange = (event) => {
      const selectedText = event.target.options[event.target.selectedIndex].text;
      loadSCMappingsByFilterAndUser(selectedText);

    };

    function isCancellationForCimId(cimId) {
      //  to search for the item with the matching cimId
      const foundItem = allCInsMap.find(item => item.cimId === cimId);
    
      // Checking if the item was found and if its isCancel property is true
      if (foundItem && foundItem.isCancel === true) {
        return true; // The item with the specified cimId is canceled
      } else {
        return false; // The item with the specified cimId is not canceled or not found
      }
    }
    
   

    function getCourseById(courseId) {
      
      const matchingCourse = allCourses.find(course => course.courseId === courseId);
      if(matchingCourse)
      return matchingCourse || "null";
      else
      return "null";
      
      
    }

    function loadAvailableVenues(dt)
    {
      
      function checkVenueConflicts(venueId)
      {
      const newClassDate = new Date(dt);
      const newClassStarts= new Date(newClassDate.getTime()); 
     const newClassEnds = new Date(newClassDate.getTime() + 60 * 60 * 1000); 
  
       
       const overlappingBookings = allCInsMap.filter(booking => {
         const oldClassStarts = new Date(booking.classDateTime);
         const oldClassEnds =new Date(oldClassStarts.getTime() + 60 * 60 * 1000); 
         
         return booking.venueId === venueId
             && newClassStarts < oldClassEnds
             && newClassEnds > oldClassStarts;
       });
           
           if (overlappingBookings.length > 0) {
             
             return true;
           }
           else
           {

           return false;

            
           }
        }

        const filteredVenues = [];
  const uniqueVenueIds = new Set();
  filteredVenues.push({ id: "Select", name: "select" });
  venuesJsonData.forEach(venue => {
    if (!checkVenueConflicts(venue.id) && !uniqueVenueIds.has(venue.id)) {
      filteredVenues.push(venue);
      uniqueVenueIds.add(venue.id);
    }
  });

  setVenuesData(prevVenuesData => {
    const updatedVenuesData = [...prevVenuesData, ...filteredVenues];
    return updatedVenuesData;
  });
      

    }
    

    const changeHandleCInsMap =(e)=>{
      setCInsMap({ ...newCInsMap, [e.target.name]: e.target.value });
      if(e.target.name==="mdate")
      { setVenuesData([]);
        loadAvailableVenues(e.target.value);
      }
      };

    const changeHandle =(e)=>{
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
        };



    const changeHandleSCMap =(e)=>{
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
        };

    function handleErrors(response) {
          if(!response.ok) {
            throw Error(response.statusText);
          }
          else
          {
            return response.json();
          }
          
      }

    

    function handleUpdate(course)
    {
      setNewCourse({ cid:course.courseId,cname: course.courseName,cdesc: course.courseDesc, cprice: course.coursePrice });
    }

    

    function handleDelete(id,type)
    {
      if(type==="course")
      {
      courseService.deleteCourse(id,token,handleErrors)
      .then(data =>
        { 
          alert("Course Deleted");
          setAllCourses((prevCourses) => {
            const updatedCourses = prevCourses.filter((course) => course.courseId !== data.courseId);
            return updatedCourses;
          });
        });
      }
      else if(type="scm")
      {
        sCourseMapService.deleteSCMap(id,token,handleErrors)
        .then(data =>
          { 
            alert("Booking Deleted");
            setAllSCmapings((prev) => {
              const updated = prev.filter((course) => course.scmId !== data.scmId);
              return updated;
            });
            
          });
      }


    }

    function handleAttendance(item,status,showAlert)
    {
      var rating = status==='NP' ? null : item.rating;
      var comments = status==='NP' ? null : item.comments;

      const requestOptions = {
        method: 'POST',
        headers: {"Authorization": `Bearer ${token}`,
         'Content-Type': 'application/json' },
        body: JSON.stringify({
          scmId:item.scmId,
          courseName: item.courseName,
          insName:item.insName,
          cPrice:item.cPrice,
          bookingDate:item.bookingDate,
          rating:rating,
          comments:comments,
          markAttendence:status,
          createdBy:item.createdBy,
          creationDate:item.creationDate,
          userId:item.userId,
          cimId:item.cimId,
          updatedBy:item.insName
      })
    };


          sCourseMapService.updateSCMap(requestOptions,handleErrors)
          .then(data => {

            setAllSCmapings(prevState => {
              // Filtering out the old booking from the state array
              const filteredState = prevState.filter(booking => booking.scmId !== data.scmId);
              // Adding the new booking to the state array
              const updatedState = [...filteredState, data];
              // Returning the updated state
              return updatedState;
            });
                  if(showAlert)
                    alert("Attendance updated for "+item.createdBy); 
            });
    }


      useEffect((e) => {
        
          userService.getUser(token)
          .then(data => {
              setUserDetails({userDetails,data});
              
              if(data.role===null)
                navigate("/login");
          });
          
          courseService.getAllCourses(token,handleErrors)
          .then(data =>
            { 
                setAllCourses(data);
            });

      }, []);

      useEffect((e)=>{
        loadSCMappingsByFilterAndUser("All");
        if(userDetails && userDetails.data && userDetails.data.role==="I")
        {
     
        cInsMapService.getAllCInsMapByUserIdAndCurrentDate(token,handleErrors,userDetails.data.userId)
                .then(data =>
                  { 
                      setUpCClass(data);
                  });
                }

      },[userDetails,allCInsMap]);

      useEffect((e)=>{
        if(userDetails && userDetails.data && userDetails.data.role==="S")
        {
        sCourseMapService.getAllSCMapByUserIdAndCurrentDate(token,handleErrors,userDetails.data.userId)
                .then(data =>
                  { 
                      setUpCClass(data);
                  });
          }
          
          
      },[allSCmapings]);

     


    function filterSCMappingsBySelection(data,selectedCourseOption)
    {
      
      if(selectedCourseOption!=="All")
      {
        //to filter the data based on the selected courseName
      const filteredMappings = data.filter(scmap => scmap.courseName === selectedCourseOption);
    
      // Updating the allCourses state with the filtered data
      setAllSCmapings(filteredMappings);
      }
      else
      {
        setAllSCmapings(data);
      }
    }


    function loadSCMappingsByFilterAndUser(selectedCourseOption)
    {
  
      if(userDetails && userDetails.data && userDetails.data.role==="I")
              {
                  sCourseMapService.getAllSCMapByInsName(token,handleErrors,userDetails.data.userName)
                  .then(data =>
                    { 

                      filterSCMappingsBySelection(data,selectedCourseOption)
   
                    });
            }
            else if(userDetails && userDetails.data && userDetails.data.role==="S")
            {
                  sCourseMapService.getAllSCMapByUserId(token,handleErrors,userDetails.data.userId)
                .then(data =>
                  { 
                    filterSCMappingsBySelection(data,selectedCourseOption);
                  });

                  
            }
            else 
            {
              sCourseMapService.getAllSCMap(token,handleErrors)
                  .then(data =>
                    { 
                      filterSCMappingsBySelection(data,selectedCourseOption);
                    });
          }
    }

    function formReset()
    {
      
      setNewCourse({ cname: '',cdesc:'', cprice: '0' });
    }

    const currentYear = new Date().getFullYear();
    const lastYear = 2000;
    const years = [];

    for (let year = currentYear; year >= lastYear; year--) {
      years.push(year);
    }

    function handleGenerateReport() {
      
      sCourseMapService.getAvgRatingsByMonth(token, handleErrors, selectedMonth, selectedYear)
        .then(data => {
          
    
          
    
          const columnWidths = [130, 130, 105];
          const tableData = [
            ["Course Name", "Avg Rating (0..5) ", "Avg Revenue (£)"], // Header row
            ...data.map(item => [String(item.courseName), String(item.rating), String(item.cPrice)])
          ];
    
          generatePdfWithTable(monthNames[selectedMonth - 1] +" "+selectedYear+" Monthly Report", tableData, columnWidths);
        })
        .catch(error => {
          // to handle any errors that occurred during the API call
          console.error(error);
        
        });
    }

    function getVenueNameById(venueId) {
      const venue = allVenuesData.find((venue) => venue.id === venueId);
      return venue ? venue.name : '';
    }
    
    const findVenueByCimId = (cimId) => {
      // Finding the course instructor mapping with the given cimId
      const cInsMap = allCInsMap.find((item) => item.cimId === cimId);
    
      // If cInsMap is found, return the venue, otherwise return null or handle the case as needed
      return cInsMap ? getVenueNameById(cInsMap.venueId) : null;
    };

    return(
<div>
<Header/>
  <div className="main-wrapper" >
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar dct-dashbd-lft">
            <div className="card widget-profile pat-widget-profile">
              <div className="card-body">
                <div className="pro-widget-content">
                  <div className="profile-info-widget">
                    <a href="#" className="booking-pro-img">
                      <img src={userDetails && userDetails.data && userDetails.data.role==="I" ? "https://img.favpng.com/18/3/18/laptop-job-computer-clip-art-png-favpng-fyfPa0wQ4EDNp2Di3KnBM64zn_t.jpg" : "https://png.pngtree.com/png-clipart/20210204/ourlarge/pngtree-vector-athlete-png-image_2887258.jpg"}  alt="User Image" />
                    </a>
                    <div className="profile-det-info">
                    {userDetails && userDetails.data && (
                      <div>
                      <h3>{userDetails.data.userName}</h3>
                      <div className="customer-details">
                      <h5 > <b>Role :</b> {userDetails.data.role==="I" ? "Instructor" : "Student"} </h5>
                        <h5><b>University Id :</b> {userDetails.data.universityId}</h5>
                        
                        
                        <h5 ><b>Email :</b> {userDetails.data.email}</h5>
                      </div>
                      </div>
                    )}
                      
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Upcoming Classes</h4>
              </div>
              <ul className="list-group list-group-flush" style={{maxHeight: '300px', overflowY: 'auto'}}>
                
              {userDetails && userDetails.data && userDetails.data.role === "S" && upcclass.map((item) => (
                isCancellationForCimId(item.cimId)===false && (
                <li className="list-group-item">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <h5 className="d-block mb-0">{item.courseName}</h5>
                      <span className="d-block text-sm text-muted">Instructor: {item.insName}</span>
                      <span className="d-block text-sm text-muted">Venue: {findVenueByCimId( item.cimId)}</span>
                      <span className="d-block text-sm text-muted">{new Date(item.bookingDate).toLocaleString()}</span>
                    </div>
                  </div>
                </li>
              )))}
              {userDetails && userDetails.data && userDetails.data.role === "I" && (
                upcclass.filter((item, index, self) => !item.isCancel && self.findIndex(i => i.courseId + i.cimId === item.courseId + item.cimId) === index)
                  .map(item => (
                    <li className="list-group-item" key={item.courseId + item.cimId}>
                      <div className="media align-items-center">
                        <div className="media-body">
                          <h5 className="d-block mb-0">{getCourseById(item.courseId).courseName}</h5>
                          <span className="d-block text-sm text-muted">Venue: {getVenueNameById(item.venueId)}</span>
                          <span className="d-block text-sm text-muted">{new Date(item.classDateTime).toLocaleString()}</span>
                        </div>
                      </div>
                    </li>
                  ))
              )}
              </ul>
            </div>
          </div>
          <div className="col-md-7 col-lg-8 col-xl-9 dct-appoinment">
            <div className="card">
              <div className="card-body pt-0">
                <div className="user-tabs">
                  <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
                    <li className="nav-item">
                      <a className="nav-link " href="#bookings" data-bs-toggle="tab"><span className="med-records">Bookings</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#cinsmap" data-bs-toggle="tab"><span className="med-records">Scheduled Classes</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="#course-details" data-bs-toggle="tab"><span className="med-records">Course Details</span></a>
                    </li>
                    {userDetails && userDetails.data && userDetails.data.role === "I" && (
                    <li className="nav-item">
                      <a className="nav-link" href="#reports" data-bs-toggle="tab"><span className="med-records">Reports</span></a>
                    </li>
                    )}
                  </ul>
                </div>
                <div className="tab-content">
                  <div id="bookings" className="tab-pane fade">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h4>Course:</h4>
                    <span style={{ marginLeft: '10px' }}>
                      <select onChange={handleSelectCourseChange} className="btn btn-warning btn-sm">
                        <option value="all">All</option>
                        {allCourses.map(course => (
                          <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
                        ))}
                      </select>
                      <button style={{ marginLeft: '10px' }} className="btn btn-info btn-sm" onClick={handleGeneratePdf}>
                                      Export as PDF
                      </button>
                    </span>
                    {userDetails && userDetails.data && userDetails.data.role === "I" && (
                        <>
                          <button
                            style={{ marginLeft: '10px' }}
                            onClick={() => handleAttendanceSelected("P")}
                            className="btn btn-success btn-sm"
                          >
                            Present Selected
                          </button>
                          <button
                            style={{ marginLeft: '10px' }}
                            onClick={() => handleAttendanceSelected("NP")}
                            className="btn btn-warning btn-sm"
                          >
                            Absent Selected
                          </button>
                        </>
                      )}

                    </div>
                  <br></br>
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-hover table-center mb-0" ref={reportTemplateRef}>
                            <thead>
                              <tr>
                              {userDetails && userDetails.data && userDetails.data.role === "I" && (
                        
                                <th>
                                  <input
                                    type="checkbox"
                                    onChange={(event) => handleCheckboxChange("all", event.target.checked)}
                                  />
                                </th>
                              )}
                                <th>Course Name</th>
                                <th>Instructor Name</th>
                                <th>Venue</th>
                                <th>Course Price (£)</th>
                                <th>Class Date,Time (1hr Session)</th>
                                <th>Ratings</th>
                                <th>Comments</th>
                                <th>Attendance</th>
                                <th>Booked on</th>
                                <th>Booked by</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                            {allSCmapings.map((item) => (
                                <tr key={item.scmId }>
                                  {userDetails && userDetails.data && userDetails.data.role === "I" && (
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={selectedRows.includes(item.scmId)}
                                        onChange={(event) => handleCheckboxChange(item.scmId, event.target.checked)}
                                      />
                                    </td>
                                  )}
                                    <td>{item.courseName }</td>
                                    <td>{item.insName}</td>
                                    <td>{findVenueByCimId(item.cimId)}</td>
                                    <td>{item.cPrice===0 ? "Free" : item.cPrice}</td>
                                    <td>{ new Date(item.bookingDate).toLocaleString()}</td>
                                    <td>
                                    
                                    <span className={item.rating>0 ? "fa fa-star rated" : "fa fa-star"}></span>
                                    <span className={item.rating>1 ? "fa fa-star rated" : "fa fa-star"}></span>
                                    <span className={item.rating>2 ? "fa fa-star rated" : "fa fa-star"}></span>
                                    <span className={item.rating>3 ? "fa fa-star rated" : "fa fa-star"}></span>
                                    <span className={item.rating>4 ? "fa fa-star rated" : "fa fa-star"}></span>
                                
                                    </td>
                                    <td>{item.comments === null ? "-" : item.comments}</td>
                                    <td>{item.markAttendence && (
                                    <i title={item.markAttendence==="NP" ? "Absent" : "Present"} className={item.markAttendence==="NP" ? "fas fa-times-circle" : "fas fa-check-circle"}></i>)}
                                    {item.markAttendence === null && <i className="fas fa-hourglass" title="Pending"></i>}
                                    </td>
                                    <td>{new Date(item.creationDate).toLocaleDateString()}</td>
                                    <td>{item.createdBy}</td>
                                    {userDetails && userDetails.data && (
                                    userDetails.data.userId===item.userId ? (
                                    <td>
                                    <button style={{ marginRight: '10px' }} onClick={() => handleDelete(item.scmId,"scm")} disabled={item.markAttendence === null ? false : true}  class="btn btn-danger btn-sm">Delete</button>
                                    { item.markAttendence==="P" ? <a href="#" style={{ marginRight: '10px' }}   onClick={()=>{setFeedback(item)}} class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#feedback-form">Feedback</a> : <button style={{ marginRight: '10px' }} disabled={true}    class="btn btn-info btn-sm">Feedback</button> }
                                    <button style={{ marginRight: '10px' }} onClick={() => handleDownloadAsPdf(item.scmId,item.courseName)} class="btn btn-primary btn-sm">Download Payment Details</button>
                                    
                                    </td> ) : ( 
                                    <td>
                                    { item.markAttendence==="NP" ? <button style={{ marginRight: '10px' }} onClick={() => handleAttendance(item,"P",true)} class="btn btn-success btn-sm">Present</button> : "" }
                                    { item.markAttendence==="P" ? <button style={{ marginRight: '10px' }} onClick={() => handleAttendance(item,"NP",true)} class="btn btn-warning btn-sm">Absent</button> : "" }
                                    { item.markAttendence=== null ? <button style={{ marginRight: '10px' }} onClick={() => handleAttendance(item,"P",true)} class="btn btn-success btn-sm">Present</button> : "" }
                                    { item.markAttendence=== null ? <button style={{ marginRight: '10px' }} onClick={() => handleAttendance(item,"NP",true)} class="btn btn-warning btn-sm">Absent</button> : "" }
                                    </td>)
                                    )}
                                </tr>
                                ))}
                            </tbody>
                          </table>

                        </div>
                      </div>
                    </div>
                  </div>
                  
                    <CInsMapTable userDetails={userDetails} getCourseById={getCourseById} setAllCInsMap={setAllCInsMap} allCInsMap={allCInsMap} setAllSCmapings={setAllSCmapings} allSCmapings={allSCmapings}/>
                  <div className="tab-pane fade show active" id="course-details">
                    <div className="text-end">
                    {userDetails && userDetails.data && (
                                userDetails.data.role==="I" ? <a href="#" onClick={formReset} className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#course-details-form">Add Course</a> : ""
                      )}
                    </div>
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Course Name</th>
                                <th>Course Desc </th>
                                <th>Course Price (£)</th>
                                <th>Creation Date</th>
                                {userDetails && userDetails.data && (
                                userDetails.data.role==="I" ? <th>Actions</th> : ""
                              )}
                              </tr>
                            </thead>
                            <tbody>
                              
                            {allCourses.map((item) => (
                                <tr key={item.courseId}>
                                    <td>{item.courseName }</td>
                                    <td>{item.courseDesc}</td>
                                    <td>{item.coursePrice===0 ? "Free" : item.coursePrice}</td>
                                    <td>{new Date(item.creationDate).toLocaleDateString()}</td>
                                    {userDetails && userDetails.data && (
                                    userDetails.data.role==="I" ? (
                                    <td>
                                    <a href="#"  onClick={()=>{setCInsMap({mcid:item.courseId,muserid:userDetails.data.userId,mdate:''})}} class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#cinsmap-form">Schedule class</a>
                                    <button onClick={() => handleUpdate(item)}  data-bs-toggle="modal" class="btn btn-info btn-sm" style={{ margin : '0 10px' }} data-bs-target="#course-details-form">Copy</button>
                                    <button onClick={() => handleDelete(item.courseId,"course")} class="btn btn-danger btn-sm">Delete</button>
                                    </td> ) : ""
                                    )}
                                </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="reports">
                    <div className="text">
                    <h6 style={{ marginLeft: '10px' }}>Generate Montly Report for All Courses</h6>
                    </div>
                    
                    <span className="text-center" style={{ marginLeft: '10px',marginTop:'3px', justifyContent: 'center', alignItems: 'center' }}>
                    
                    <select style={{ marginLeft: '5px',marginRight:'10px' }} onChange={handleChangeYear} className="text-center btn btn-warning btn-sm">
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                    </select>
                    
                    
                    <select style={{ marginLeft: '80px' }} onChange={handleChangeMonth} className="text-center btn btn-primary btn-sm">
                      {/* Add options for 12 months */}
                      {Array.from({ length: 12 }, (_, index) => {
                        const month = index + 1;
                        return (
                          <option key={month} value={month}>
                            {`${monthNames[index]}`}
                          </option>
                        );
                      })}
                    </select>
                    <br></br>
                    
                      <button style={{ marginLeft: '70px',marginTop:'20px' }} className="btn btn-success btn-sm" onClick={handleGenerateReport}>
                                      Generate Report
                      </button>
                    </span>
                    {/* <div className="card card-table mb-0">
                      <div className="card-body">
                        <div className="table-responsive">
                         
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
<CourseFormModals token={token} changeHandle={changeHandle} newCourse={newCourse} setNewCourse={setNewCourse} userDetails={userDetails} setAllCourses={setAllCourses} allCourses={allCourses} handleErrors={handleErrors}/>

<CInsMapFormModals token={token} getCourseById={getCourseById} changeHandleCInsMap={changeHandleCInsMap} newCInsMap={newCInsMap} setAllCInsMap={setAllCInsMap} allCInsMap={allCInsMap} userDetails={userDetails} handleErrors={handleErrors} venuesData={venuesData} setVenuesData={setVenuesData}/>

<FeedbackFormModals token={token} setFeedback={setFeedback} feedback={feedback} handleErrors={handleErrors} setAllSCmapings={setAllSCmapings} allSCmapings={allSCmapings} changeHandleSCMap={changeHandleSCMap}/>



</div>

    );
};

export default Dashboard;