import { cInsMapApis } from "../utils/apiConfig";

const cInsMapService={
    saveCInsMap(requestOptions,handleErrors) {
        return fetch(cInsMapApis.saveCInsMapApi,requestOptions)
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllCInsMap(token,handleErrors) {
        return fetch(cInsMapApis.allCInsMapApi,{
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
      getAllCInsMapByUserIdAndCurrentDate(token,handleErrors,userid) {
        return fetch(cInsMapApis.allCInsMapApiByUserIdAndCurrentDate+userid,{
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
      deleteCInsMap(cimid,token,handleErrors) {
        return fetch(cInsMapApis.deleteCInsMapApi+cimid,{
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
      updateCInsMap(requestOptions,handleErrors) {
        return fetch(cInsMapApis.updateCInsMapApi,requestOptions)
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

export default cInsMapService;