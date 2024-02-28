import React, { useEffect, useState } from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUserName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/login", formData);
      const { token } = response.data; // Extract token from response
      localStorage.setItem("token", token); // Store token in localStorage
      console.log("Token:", token); // Handle success response
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response.data.error); // Handle error response
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailOrUserName" className="form-label">
            Email or Username
          </label>
          <input
            type="text"
            className="form-control"
            id="emailOrUserName"
            name="emailOrUserName"
            value={formData.emailOrUserName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
