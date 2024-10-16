import axios from "axios";

export const auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL_LOGIN,
  headers: {
    "Content-Type": "application/json",
  },
});
