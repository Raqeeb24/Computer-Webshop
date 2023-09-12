import http from "../http-common";
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/" // for local usage

class ComputerDataService {
  getAll(page = 0) {
    return http.get(`/computers?page=${page}`);
  }

  get(id) {
    return http.get(`/computers/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`/computers?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    //return axios.post(`${baseURL}/computers/review-new`, data);
    return http.post("/computers/review", data);
  }

  updateReview(data) {
    //return axios.put(`${baseURL}/computers/review-edit`, data);
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getCpu(id) {
    return http.get(`/computers/cpu`);
  }

  createComputer(data){
    return http.post(`/computers/computer`, data);
  }

  getCart(){
    return http.get(`/computers/cart`, {
      withCredentials: true
    })
    .then((response) => {
      // Handle the response here
      console.log(response.data);
    })
    .catch((error) => {
      // Handle any errors here
      console.log(error);
    });
  }

  addToCart(data){
    return http.post(`/computers/cart`, data, {
      headers: {
      'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON
    },
      withCredentials: true
    }).then((response) => {
      // Handle the response here
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      console.error("Status:", error.response.status);
      console.log("Data:", data);
    });    
  }

  testconfiguresession(){
    return http.post(`/test`, {
      withCredentials: true
    })
    .then((response) => {
      // Handle the response here
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      console.error("Status:", error.response.status);
    });    
    
  }
  testretrievesession(){
    axios.get(`${baseURL}test-retrieve`)
  .then(response => {
    const testData = response.data.message;
    if (testData === 'No data found in session.') {
      // Handle the case where session data is missing
      console.error('Session data not found.');
    } else {
      // Handle the case where session data is present
      console.log('Session data retrieved:', testData);
    }
  })
  .catch(error => {
    console.error('Error retrieving session data:', error);
  });
  }

}

export default new ComputerDataService("");