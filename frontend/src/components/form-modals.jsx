import React, {useRef} from "react";
import cInsMapService from "../services/cInsMapService";
import courseService from "../services/courseService";
import sCourseMapService from "../services/sCourseMapService";


export const CourseFormModals =(props)=>{
    const formRef = useRef(null);
    const {token,changeHandle,newCourse,setNewCourse,userDetails,setAllCourses,allCourses,handleErrors} =props;

    const formValidator =(e)=>{
      e.preventDefault();
    const requestOptions = {
            method: 'POST',
            headers: {"Authorization": `Bearer ${token}`,
             'Content-Type': 'application/json' },
            body: JSON.stringify({
              courseName: newCourse.cname,
              courseDesc: newCourse.cdesc,
              coursePrice: newCourse.cprice,
              createdBy:userDetails.data.userName
          })
        };


    courseService.saveCourse(requestOptions,handleErrors)
    .then(data => {
                setAllCourses([...allCourses, data]);
                document.getElementById("mclose").click();
                formRef.current.reset();
                setNewCourse({ cname: '',cdesc:'', cprice: '0' });
    });

  };


    return(  <div className="modal fade custom-modal" id="course-details-form">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">New Course</h3>
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        </div>
        <form onSubmit={formValidator} ref={formRef}>
          <div className="modal-body">
          <input type="text"
               name="cid" value={newCourse.cid} className="form-control" hidden/>
            <div className="form-group">
              <label>Name</label>
              <input type="text"
              onChange={changeHandle}
               name="cname" value={newCourse.cname} className="form-control" required/>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" 
              onChange={changeHandle}
              name="cdesc" value={newCourse.cdesc} defaultValue={""} required/>
            </div>
            <div className="form-group">
            <label>£ Price( Zero for free course )</label>
              <input type="number" name="cprice"
              onChange={changeHandle}
               className="form-control" value={newCourse.cprice} defaultValue={0} required/>
            </div>
            <div className="submit-section text-center">
              <button type="submit" className="btn btn-primary submit-btn">Submit</button>
              <button type="button" id="mclose" className="btn btn-secondary submit-btn" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>);
};



export const CInsMapFormModals =(props)=>{
    const {token,getCourseById,changeHandleCInsMap,newCInsMap,setAllCInsMap,allCInsMap,userDetails,handleErrors,venuesData,setVenuesData} =props;
    const formRef = useRef(null);

    const formValidatorCInsMap =(e)=>{
      e.preventDefault();

            const newClassDate = new Date(newCInsMap.mdate);
            
            
            const newClassStarts= new Date(newClassDate.getTime()); 
            const newClassEnds = new Date(newClassDate.getTime() + 60 * 60 * 1000); 
          
              
              const overlappingClass = allCInsMap.filter(cImap => {
                const oldClassStarts = new Date(cImap.classDateTime);
                const oldClassEnds =new Date(oldClassStarts.getTime() + 60 * 60 * 1000); 
                
                return cImap.userId === newCInsMap.muserid
                    && newClassStarts < oldClassEnds
                    && newClassEnds > oldClassStarts;
              });
                  
        if (overlappingClass.length > 0) {
          alert("There is a schedule conflict.Please check your Scheduled class..");
          return true;
        }
                  
        const requestOptions = {
          method: 'POST',
          headers: {"Authorization": `Bearer ${token}`,
           'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: newCInsMap.mcid,
            classDateTime: new Date(newCInsMap.mdate),
            effectiveDate: new Date(newCInsMap.mdate),
            expiryDate:new Date(newCInsMap.mdate),
            venueId:newCInsMap.mvenue,
            userId:newCInsMap.muserid,
            createdBy:userDetails.data.userName,
            classStrength:newCInsMap.mcs
        })
      };
      if(newCInsMap.mcs!=undefined && newCInsMap.mcs>=10)
      {
        cInsMapService.saveCInsMap(requestOptions,handleErrors)
        .then(data =>
          { 
            setAllCInsMap([...allCInsMap, data]);
            alert("Saved succesfully!");
            document.getElementById("cimc").click();
            formRef.current.reset();
          });
        }
        else
        {
          alert("Min class strength must be 10");
        }
    
    };

    
    return(  <div className="modal fade custom-modal" id="cinsmap-form">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Schedule Class for {getCourseById(newCInsMap.mcid).courseName}</h3>
          <button type="button" id="cimc" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        </div>
        <form onSubmit={formValidatorCInsMap} ref={formRef}>
          <div className="modal-body">
          <div className="form-group">
              <label>Course Id</label>
          <input type="text"
               name="mcid" value={newCInsMap.mcid} className="form-control" readOnly/>
            </div>
            <div className="form-group">
            <label>User Id(Instructor)</label>
              <input type="text" name="muserid"
               className="form-control" value={newCInsMap.muserid} readOnly/>
            </div>

            <div className="form-group">
              <label>Class Date / Time</label><br/>
              <label>Class Time will be 1Hour from the start time</label>
              <input type="datetime-local"
              onChange={changeHandleCInsMap}
               name="mdate" value={newCInsMap.mdate} className="form-control" required/>
            </div>
            <div className="form-group">
              <label>Avaliable Venues displayed based on above selected Date & Time</label><br/>
              <select className="form-control" onChange={changeHandleCInsMap}  name="mvenue" value={newCInsMap.mvenue} required>
                {venuesData.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Class Strength</label><br/>
              <input type="number"
              onChange={changeHandleCInsMap}
               name="mcs" value={newCInsMap.mcs} placeholder="Class Strength" className="form-control" required/>
            </div>
            <div className="submit-section text-center">
              <button type="submit" className="btn btn-primary submit-btn">Submit</button>
              <button type="button" id="mclose" className="btn btn-secondary submit-btn" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>);
};

export const FeedbackFormModals =(props)=>{
  const {token,setFeedback, feedback,handleErrors,setAllSCmapings,allSCmapings,changeHandleSCMap} =props;
  const formRef = useRef(null);

  const formValidator =(e)=>{
    e.preventDefault();
  const requestOptions = {
          method: 'POST',
          headers: {"Authorization": `Bearer ${token}`,
           'Content-Type': 'application/json' },
          body: JSON.stringify({
            scmId:feedback.scmId,
            courseName: feedback.courseName,
            insName:feedback.insName,
            cPrice:feedback.cPrice,
            bookingDate:feedback.bookingDate,
            rating:feedback.rating,
            comments:feedback.comments,
            markAttendence:feedback.markAttendence,
            createdBy:feedback.createdBy,
            creationDate:feedback.creationDate,
            userId:feedback.userId,
            cimId:feedback.cimId,
            updatedBy:feedback.createdBy
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
            
              document.getElementById("feedback").click();
              formRef.current.reset();
              
  });

};


  return(  <div className="modal fade custom-modal" id="feedback-form">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title">Share your feedback for {feedback.courseName}</h3>
        <button type="button" id="feedback" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      </div>
      <form onSubmit={formValidator}  ref={formRef}>
        <div className="modal-body">
        <div className="form-group">
            <label>SCM Id</label>
        <input type="text"
             name="scmId" value={feedback.scmId} className="form-control" readOnly/>
          </div>
          <div className="form-group">
          <label>Instructor</label>
            <input type="text" name="insName"
             className="form-control" value={feedback.insName} readOnly/>
          </div>

          <div className="form-group">
            <label>Ratings (1 - 5)</label>
            <input type="number" name="rating"
             className="form-control" onChange={changeHandleSCMap} value={feedback.rating} required/>
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea  name="comments"
             className="form-control" onChange={changeHandleSCMap} value={feedback.comments} required></textarea>
          </div>
          
          <div className="submit-section text-center">
            <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            <button type="button"  className="btn btn-secondary submit-btn" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>);
};

export const PaypalCheckoutForm =()=>{
  

  return(  <div className="modal fade show" id="checkout-form" style={{ display: true ? 'block' : 'none' }}>
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title">Share your feedback for </h3>
        <button type="button" id="feedback" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      </div>
      <form >
        <div className="modal-body">
        <div className="form-group">
            <label>SCM Id</label>
        <input type="text"
             name="scmId" value="" className="form-control" readOnly/>
          </div>
          <div className="form-group">
          <label>Instructor</label>
            <input type="text" name="insName"
             className="form-control" value="" readOnly/>
          </div>

          <div className="form-group">
            <label>Ratings (1 - 5)</label>
            <input type="number" name="rating"
             className="form-control"  value="" required/>
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea  name="comments"
             className="form-control"  value="" required></textarea>
          </div>
          
          <div className="submit-section text-center">
            <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            <button type="button"  className="btn btn-secondary submit-btn" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>);
};