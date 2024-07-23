import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const isLogin = useSelector((state) => state.auth.userIsLoggedIn);
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        {isLogin && <Route path="/" exact Component={Home} />}
        <Route path="/front" exact Component={FrontPage} />
        {isLogin && (
          <Route path="/updateProfile" exact Component={UpdateProfile} />
        )}
        {isLogin && (
          <Route path="/profileDetails" exact Component={ProfileDetails} />
        )}
        {isLogin && <Route path="/verifyEmail" exact Component={VerifyEmail} />}

        {!isLogin && (
          <Route path="/forgotPassword" exact Component={ForgotPassword} />
        )}
        <Route path="/myExpense" exact Component={MyExpense} />
        {!isLogin && <Route path="/login" exact Component={Authentication} />}
      </Routes>
    </div>
  );
}

export default App;
