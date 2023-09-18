import http from "../http-common";

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

  async testconfiguresession(data){
    try {
      await http.post(`/test`, data, {withCredentials: true}); // Include credentials
    } catch (error) {
      console.error('Error setting session data:', error);
    }
  }
  testretrievesession(){
    const response = http.get(`/test`, {
      withCredentials: true
    })
    return response;
  }

}

export default new ComputerDataService("");