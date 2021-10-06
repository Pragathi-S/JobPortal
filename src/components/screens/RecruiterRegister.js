import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "./Form.png";
import "./RecruiterRegister.css";


const RecruiterRegister = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/recruiterhome");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/recruiterregister",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/recruiterhome");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <img className="form_img" src={Form} alt="Form" />
      <form onSubmit={registerHandler} className="register-screen_form">
        <h3 className="register-screen_title">Create Account</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label className="register_label">Username</label><br />
          <input
            type="text"
            required
            className="register_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="register_label">Email</label><br />
          <input
            type="email"
            required
            className="register_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="register_label">Password</label><br />
          <input
            type="password"
            required
            className="register_input"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="register_label">Confirm Password</label><br />
          <input
            type="password"
            required
            className="register_input"
            autoComplete="true"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
        <br />
        <br />
        <span className="register-screen_subtext">
          Already have an account? <Link className="recruiter-sublink" to="/recruiterlogin">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RecruiterRegister;