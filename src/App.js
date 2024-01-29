import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./Components/Authentication/Authentication";
import VerifyEmail from "./Components/UI/VerifyEmail";
import NavBar from "./Components/UI/NavBar";
import Home from "./Components/UI/Home";
import Product from "./Components/UI/Product";
import UpdateProfile from "./Components/UI/UpdateProfile";
import ProfileDetails from "./Components/UI/Profile";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/updateProfile" exact Component={UpdateProfile} />
        <Route path="/profileDetails" exact Component={ProfileDetails} />
        <Route path="/verifyEmail" exact Component={VerifyEmail} />
        <Route path="/product" exact Component={Product} />
        <Route path="/login" exact Component={Authentication} />
      </Routes>
    </div>
  );
}

export default App;
