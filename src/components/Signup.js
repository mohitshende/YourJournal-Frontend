import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../backend";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);

  let history = useHistory();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      showAlert("Passwords does not match", "danger");
      setCredentials({ name: "", email: "", password: "", cpassword: "" });
      return { error: "Password does not match with confirm password" };
    }
    const { name, email, password } = credentials;
    const response = await fetch(`${API}/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();

    if (json.authToken) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      showAlert("Account created successfully", "success");
      history.push("/");
    } else {
      showAlert("Invalid details", "danger");
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <h2 className="my-2">Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            minLength={3}
          />
        </div>
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
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loading && (
            <span
              class="spinner-border spinner-border-sm mx-1"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
