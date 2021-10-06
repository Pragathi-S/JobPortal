import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "./Form.png";
import "./CandidateLogin.css";


const CandidateLogin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/candidatehome");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/candidatelogin",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/candidatehome");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <img className="form_img" src={Form} alt="Form" />
      <form onSubmit={loginHandler} className="login-screen_form">
        <h3 className="login-screen_title">Login</h3>
        {error && <span className="loginerror-message">{error}</span>}
        <div className="form-group">
          <label className="login-label">Email</label><br />
          <input
            type="email"
            required
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label className="login-label">Password</label><br />
          <input
            type="password"
            required
            className="login-input"
            autoComplete="true"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <br />
        <br />
        <span className="login-screen_subtext">
          Don't have an account? <Link className="login-screen_sublink" to="/candidateregister">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default CandidateLogin;