import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/signup", formData);
      console.log(response.data); // Handle success response
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response.data.error); // Handle error response
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="cPassword"
            value={formData.cPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
