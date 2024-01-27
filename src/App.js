import "./App.css";
import Authentication from "./Components/Authentication/Authentication";

import NavBar from "./Components/UI/NavBar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Authentication />
      <h1>Expense Tracker</h1>
    </div>
  );
}

export default App;
