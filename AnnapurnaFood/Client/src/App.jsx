<<<<<<< HEAD
import "./App.css";
// import Login from "./pages/loginpage/loginpage";
import {BrowserRouter,Router,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Router>
      <Route/>
    </Router>
    </BrowserRouter>
    </>
  );
}

export default App;
=======
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,Router,Route } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
>>>>>>> main
