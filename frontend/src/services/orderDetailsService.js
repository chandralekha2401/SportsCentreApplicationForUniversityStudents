import { orderDetailsApis } from "../utils/apiConfig";

const orderDetailsService = {
    saveOrderDetail(requestOptions,handleErrors) {
        return fetch(orderDetailsApis.saveOrderDetailsApi,requestOptions)
          .then(handleErrors)
          .then(data => {
            return data;
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          });
      },
      getAllOrderDetails(token,handleErrors) {
        return fetch(orderDetailsApis.allOrderDetailsApi,{
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
      deleteOrderDetailByScmId(scmid,token,handleErrors) {
        return fetch(orderDetailsApis.deleteOrderDetailsApi+scmid,{
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
      getAllOrderDetailsByScmId(scmid,token,handleErrors) {
        return fetch(orderDetailsApis.OrderDetailsByScmIdApi+scmid,{
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
      }
  };
  

export default orderDetailsService;