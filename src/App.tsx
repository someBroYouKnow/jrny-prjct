import "./App.css";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";
import { Outlet } from "react-router";


export default function App() {


  return (
    <>
      <div className="header">
        <div className="logo-div">
        <Logo />
        </div>
        <div className="navbar-div">
          <NavBar />
        </div>
      </div>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
} 

 
