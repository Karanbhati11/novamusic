/* eslint-disable no-unused-vars */
import axios from "axios";

const localURL = "http://localhost:3000";
const HostedURL = "https://novamusicbackend.netlify.app";
const netlifylocal = "http://localhost:8888";
export default axios.create({
  baseURL: HostedURL,
});
