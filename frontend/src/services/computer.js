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
    return http.get(`/cpu`);
  }

  createComputer(data){
    return http.post(`/computer`, data);
  }

  
  getCart(){
    return http.get(`/cart`, {
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

  async addToCart(data){
    try {
      const response = await http.post(`/cart`, data, {
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON
        },
        withCredentials: true
      });
      console.log(response.data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      console.error("Status:", error.response.status);
      console.log("Data:", data);
    }    
  }

  testconfiguresession(data){
    return http.post(`/test`, data, { withCredentials: true }); 
  }
  testretrievesession() {
    return http.get(`/test`, {
      withCredentials: true
    })
  }

}

export default new ComputerDataService("");