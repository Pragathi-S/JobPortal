import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BrandName from "./BrandName.png";
import "./RecruiterPostedJobs.css";


const RecruiterPostedJobs = ({ history }) => {
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
        const { data } = await axios.get("http://localhost:5000/api/private/postedjobs", config);
        setPrivateData(data);
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
    <>
      <div className="private_homepage">
        <div className="private_header">
          <img className="brandlogo" src={BrandName} alt="Jobz" />
          <Link to="/newjob" className="private_link">Post new job</Link>&nbsp;&nbsp;&nbsp;
          <button className="logout-btn" onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className='job-container'>
        <table className="job-table">
          <thead>
            <tr>
              <th width="28%" className="table-data">Job Title</th>
              <th width="20%" className="table-data">Experience required</th>
              <th width="46%" className="table-data">Skills required</th>
              <th className="table-applicant">Applicants</th>
            </tr>
          </thead>
          <tbody>
            {privateData && privateData.map((job) => {
              return (
                <tr key={job._id}>
                  <td className="table-data">{job.title}</td>
                  <td className="table-data">{job.experience}</td>
                  <td className="table-data">{job.skills}</td>
                  <td><button className="applicants-btn">&#128101;</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};


export default RecruiterPostedJobs;;

