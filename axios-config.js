import axios from "axios";

export const request = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
