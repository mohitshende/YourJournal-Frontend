import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../backend";

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.authToken) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      showAlert("Logged in successfully", "success");
      history.push("/");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3 row justify-content-center">
      <form onSubmit={handleSubmit} className="col-lg-4 shadow-lg p-5">
        <h2 className="text-center mb-5 ">Login to your account</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
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
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loading && (
            <span
              className="spinner-border spinner-border-sm mx-1"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
