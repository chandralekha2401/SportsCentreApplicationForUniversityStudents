import { courseApis } from "../utils/apiConfig";

const courseService = {
    saveCourse(requestOptions,handleErrors) {
        return fetch(courseApis.saveCourseApi,requestOptions)
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllCourses(token,handleErrors) {
        return fetch(courseApis.allCoursesApi,{
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
      deleteCourse(cid,token,handleErrors) {
        return fetch(courseApis.deleteCourseApi+cid,{
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
      }
  };
  

export default courseService;