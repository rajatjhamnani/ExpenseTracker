import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./Components/Authentication/Authentication";

import NavBar from "./Components/UI/NavBar";
import Home from "./Components/UI/Home";
import Product from "./Components/UI/Product";
import UpdateProfile from "./Components/UI/UpdateProfile";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/updateProfile" exact Component={UpdateProfile} />
        <Route path="/product" exact Component={Product} />
        <Route path="/login" exact Component={Authentication} />
      </Routes>
    </div>
  );
}

export default App;
