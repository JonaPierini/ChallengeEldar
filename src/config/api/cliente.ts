import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL_JSON_PLACEHOLDER,
  headers: {
    "content-Type": "application/json; charset=UTF-8",
  },
});
