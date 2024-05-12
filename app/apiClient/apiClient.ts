import axios from "axios";

function getToken() {
  return localStorage.getItem('custom-auth-token');
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Authorization: getToken(), 
    },
  });

export default instance;