/* eslint-disable no-unused-vars */
import axios from "axios";

// const localURL = "http://localhost:3000";
const HostedURL = "https://novamusicbackend.netlify.app";
const netlifylocal = "http://localhost:8888";
const TestingBackend =
  "https://64f5f08f8d3917593054ddd7--novamusicbackend.netlify.app";
export default axios.create({
  baseURL: netlifylocal,
});
