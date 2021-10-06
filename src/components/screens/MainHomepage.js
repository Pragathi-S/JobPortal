import { Link } from "react-router-dom";
import "./MainHomepage.css";
import BrandName from "./BrandName.png";
import MainHomepageimg from "./MainHomepageimg.png";

const MainHomepage = () => {
  return (
    <div className="main-homepage">
      <div className="main_header">
        <img className="brandlogo" src={BrandName} alt="Jobz" />
        <Link className="main_link" to="/recruiterlogin">Recruiter</Link>&nbsp;&nbsp;&nbsp;
        <Link className="main_link" to="/candidatelogin">Candidate</Link>
      </div>
      <div className="main_content">
        <img className="main_img" src={MainHomepageimg} alt="Jobz" />
        <span><h1 className="main_title" >Join the world's best
          work marketplace</h1>
          <p className="main_intro">Find great talent. Build your business.<br />
            Take your career to the next level.</p></span>
      </div>
    </div>
  );
};

export default MainHomepage;