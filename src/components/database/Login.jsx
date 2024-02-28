import React, { useState } from "react";
import Api from "../Api";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUserName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/login", formData);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Login error:", error.response.data.error); // Handle error response
    }
  };

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
