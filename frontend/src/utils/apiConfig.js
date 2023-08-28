const api="http://localhost:8080/";
const course=api+'course';
const cInsMapApi=api+'cinsmap';
const sCourseMapApi=api+'scmap';
const orderDetailsApi=api+'od';

export const notificationUrl = 'https://maker.ifttt.com/trigger/booking_system/with/key/ky5_QesTyrUqVwzgwIsfPZVaLg4QvFP0QZoHEovxaTL';
export const passcodeUrl = 'https://maker.ifttt.com/trigger/booking_system_passcode/with/key/ky5_QesTyrUqVwzgwIsfPZVaLg4QvFP0QZoHEovxaTL';

export const  userApis = {
    registerApi: api+'register',
    greetingApi: api+'greeting',
    authenticateApi: api+'authenticate',
    userApi: api+'user',
    emailExistApi:api+'user/email',
    passwordUpdateApi:api+'user/password'
  };
  
export const  courseApis = {
    courseByCoursenameApi: course,
    allCoursesApi: course+'/all',
    saveCourseApi: course+'/save',
    updateCourseApi: course+'/update',
    deleteCourseApi: course+'/delete?cid='
  };

export const  cInsMapApis = {
    cInsMapById: cInsMapApi,
    allCInsMapApi: cInsMapApi+'/all',
    allCInsMapApiByUserIdAndCurrentDate: cInsMapApi+'/userid/all?currentdate=true&userid=',
    saveCInsMapApi: cInsMapApi+'/save',
    updateCInsMapApi: cInsMapApi+'/update',
    deleteCInsMapApi: cInsMapApi+'/delete?cimid='
  };

export const  sCourseMapApis = {
    sCMapById: sCourseMapApi,
    allSCourseMapApi: sCourseMapApi+'/all',
    allSCourseMapApiByUserId: sCourseMapApi+'/userid/all?userid=',
    allSCourseMapApiByUserIdAndCurrentDate: sCourseMapApi+'/userid/all?currentdate=true&userid=',
    allSCourseMapApiByInsName: sCourseMapApi+'/insname/all?insname=',
    allSCourseMapApiByInsNameAndCurrentDate: sCourseMapApi+'/insname/all?currentdate=true&insname=',
    saveSCourseMapApi: sCourseMapApi+'/save',
    updateSCourseMapApi: sCourseMapApi+'/update',
    deleteSCourseMapApi: sCourseMapApi+'/delete?scmid=',
    allSCourseMapApiByCimId:sCourseMapApi+'/cimid?cimid=',
    allEmailsApiByCimId:sCourseMapApi+'/notify/cimid?cimid=',
    avgRatingsByMonth:sCourseMapApi+'/report?'
  };

export const orderDetailsApis = {
    allOrderDetailsApi: orderDetailsApi+'/all',
    saveOrderDetailsApi: orderDetailsApi+'/save',
    OrderDetailsByScmIdApi: orderDetailsApi+'/scmid?scmid=',
    deleteOrderDetailsApi: orderDetailsApi+'/delete?scmid='
  };