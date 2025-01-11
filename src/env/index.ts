import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;
console.log("SALO",API_URL);


export const http_common = axios.create({
   baseURL: API_URL,
   //baseURL: "http://localhost:5126",
   headers: {
       "Content-Type": "application/json"
   }
});