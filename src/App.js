import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./Components/Authentication/Authentication";
import VerifyEmail from "./Components/UI/VerifyEmail";
import NavBar from "./Components/UI/NavBar";
import Home from "./Components/UI/Home";
import MyExpense from "./Components/UI/MyExpense";
import UpdateProfile from "./Components/UI/UpdateProfile";
import ProfileDetails from "./Components/UI/Profile";
import ForgotPassword from "./Components/UI/ForgotPassword";
import FrontPage from "./Components/UI/FrontPage";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/front" exact Component={FrontPage} />
        <Route path="/updateProfile" exact Component={UpdateProfile} />
        <Route path="/profileDetails" exact Component={ProfileDetails} />
        <Route path="/verifyEmail" exact Component={VerifyEmail} />

        <Route path="/forgotPassword" exact Component={ForgotPassword} />
        <Route path="/myExpense" exact Component={MyExpense} />
        <Route path="/login" exact Component={Authentication} />
      </Routes>
    </div>
  );
}

export default App;
