import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BrandName from "./BrandName.png";
import Candidatehomepageimg from "./Candidatehomepageimg.png";
import "./CandidateHomepage.css";


const CandidateHomepage = ({ history }) => {
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
        const { data } = await axios.get("http://localhost:5000/api/private/candidatehome", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  console.log(privateData);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/homepage");
  };

  return error ? (
    <>
      <span className="error-message">{error}</span>
    </>
  ) : (
    <div className="private_homepage">
      <div className="private_header">
        <img className="brandlogo" src={BrandName} alt="Jobz" />
        <Link to="/apply" className="private_link">Apply Jobs</Link>&nbsp;&nbsp;&nbsp;
        <button className="logout-btn" onClick={logoutHandler}>Logout</button>
      </div>
      <div className="private_content">
        <img className="home_img" src={Candidatehomepageimg} alt="Jobz" />
        <span><h1 className="home_title" >Find the best jobs that suit you</h1>
          <p className="home_intro">Take your career to the next level.</p></span>
      </div>
    </div>
  );
};


export default CandidateHomepage;

