import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import MainHomepage from "./components/screens/MainHomepage";
import RecruiterRegister from "./components/screens/RecruiterRegister";
import RecruiterLogin from "./components/screens/RecruiterLogin";
import CandidateRegister from "./components/screens/CandidateRegister";
import CandidateLogin from "./components/screens/CandidateLogin";
import CandidateApplyToJobs from "./components/screens/CandidateApplyToJobs";
import CandidateHomepage from "./components/screens/CandidateHomepage";
import RecruiterHomepage from "./components/screens/RecruiterHomepage";
import RecruiterNewJob from "./components/screens/RecruiterNewJob";
import RecruiterPostedJobs from "./components/screens/RecruiterPostedJobs";
import PageNotFound from "./components/screens/PageNotFound";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/recruiterhome" component={RecruiterHomepage} />
          <PrivateRoute exact path="/postedjobs" component={RecruiterPostedJobs} />
          <PrivateRoute exact path="/newjob" component={RecruiterNewJob} />
          <PrivateRoute exact path="/candidatehome" component={CandidateHomepage} />
          <PrivateRoute exact path="/apply" component={CandidateApplyToJobs} />
          <Route exact path="/homepage" component={MainHomepage} />
          <Route exact path="/recruiterregister" component={RecruiterRegister} />
          <Route exact path="/recruiterlogin" component={RecruiterLogin} />
          <Route exact path="/candidateregister" component={CandidateRegister} />
          <Route exact path="/candidatelogin" component={CandidateLogin} />
          <Route exact path="/"><Redirect to="/homepage" /></Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
