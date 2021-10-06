import { Link } from "react-router-dom";
import PageNotFoundImage from './PageNotFound.png';
import "./PageNotFound.css";


const PageNotFound = () => {
  return (
    <div className="main-homepage">
      <img className="pageNotFound_img" src={PageNotFoundImage} alt="Page not found" />
      <Link to="/homepage" className="pageNotFound_link">Return to homepage</Link>
    </div>
  );
};

export default PageNotFound;