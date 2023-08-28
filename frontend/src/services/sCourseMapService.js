import { sCourseMapApis } from "../utils/apiConfig";

const sCourseMapService={
    saveSCMap(requestOptions,handleErrors) {
        return fetch(sCourseMapApis.saveSCourseMapApi,requestOptions)
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllSCMap(token,handleErrors) {
        return fetch(sCourseMapApis.allSCourseMapApi,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllSCMapByUserId(token,handleErrors,userid) {
        return fetch(sCourseMapApis.allSCourseMapApiByUserId+userid,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllSCMapByUserIdAndCurrentDate(token,handleErrors,userid) {
        return fetch(sCourseMapApis.allSCourseMapApiByUserIdAndCurrentDate+userid,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllSCMapByInsName(token,handleErrors,insname) {
        return fetch(sCourseMapApis.allSCourseMapApiByInsName+insname,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllSCMapByInsNameAndCurrentDate(token,handleErrors,insname) {
        return fetch(sCourseMapApis.allSCourseMapApiByInsNameAndCurrentDate+insname,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      deleteSCMap(scmid,token,handleErrors) {
        return fetch(sCourseMapApis.deleteSCourseMapApi+scmid,{
          method: "POST",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      updateSCMap(requestOptions,handleErrors) {
        return fetch(sCourseMapApis.updateSCourseMapApi,requestOptions)
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllSCMapByCimId(token,handleErrors,cimId) {
        return fetch(sCourseMapApis.allSCourseMapApiByCimId+cimId,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAvgRatingsByMonth(token,handleErrors,month,year)
      {
        return fetch(sCourseMapApis.avgRatingsByMonth+"month="+month+"&year="+year,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getNotifyEmailsByCimId(token,handleErrors,cimId) {
        return fetch(sCourseMapApis.allEmailsApiByCimId+cimId,{
          method: "GET",
          headers: {"Authorization": `Bearer ${token}`}
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.text(); // Read response as plain text
        })
          .then(data => {
            
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      }
};

export default sCourseMapService;