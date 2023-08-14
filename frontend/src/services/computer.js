import http from "../http-common";
import axios from "axios";

const baseURL = "https://backend-computer-webshop.vercel.app/api/v1"

class ComputerDataService {
  getAll(page = 0) {
    //return axios.get(`${baseURL}/computers?page=${page}`);
    return http.get(`/computers?page=${page}`);
  }

  get(id) {
    return axios.get(`${baseURL}/computers/id/${id}`);
    //return http.get(`/computers/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    //return axios.get(`${baseURL}/computers?${by}=${query}&page=${page}`);
    return http.get(`/computers?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return axios.post(`${baseURL}/computers/review-new`, data);
    //return http.post("/review-new", data);
  }

  updateReview(data) {
    return axios.put(`${baseURL}/computers/review-edit`, data);
    //return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getCpu(id) {
    return http.get(`/computers/cpu`);
  }

  createComputer(data){
    return axios.post(`${baseURL}/computers/computer`, data);
  }

}

export default new ComputerDataService();