import axios from "axios";

export const api = axios.create({
//   baseURL:"http://localhost:3000/",
  baseURL:"https://dailytracker-2hj3.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
