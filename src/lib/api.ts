import axios from "axios";

// Create an axios instance
export const api = axios.create({
    baseURL: process.env.HOST_URL as string,
})