import { useState, useEffect } from "react";
import axios from "axios";
import BrandName from "./BrandName.png";
import "./RecruiterNewJob.css";


const RecruiterNewJob = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {

    if (!localStorage.getItem("authToken")) {
      history.push("./homepage")
    }

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("http://localhost:5000/api/private/newjob", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  console.log(privateData);

  const handleChange = (e) => {
    setPrivateData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted...");
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/homepage");
  };

  return error ? (
    <>
      <span className="error-message">{error}</span>
    </>
  ) : (
    <>
      <div className="private_homepage">
        <div className="private_header">
          <img className="brandlogo" src={BrandName} alt="Jobz" />
          <button className="lastlogout-btn" onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className='newjob-container'>
        <h2 className="pageTitle"> Post new job</h2>
        <br />
        <form onSubmit={handleSubmit} className="postJob_form">
          <label className="job-label">Job Title</label><br />
          <input
            type="text"
            size="70"
            className="job-input"
            onChange={handleChange}
          /><br /><br />
          <label className="job-label">Experience required</label><br />
          <input
            type="text"
            className="job-input"
            size="70"
            onChange={handleChange}
            required
          />
          <br /><br />
          <label className="job-label">Skills required</label><br />
          <input
            size="70"
            type="text"
            className="job-input"
            onChange={handleChange}
            required
          /><br /><br />
          <button className="submit-btn" type="submit">
            Submit
          </button>
          <br></br>
        </form>
      </div>
    </>
  );
};


export default RecruiterNewJob;

