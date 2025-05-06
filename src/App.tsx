import "./App.css";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";
import { Outlet } from "react-router";


export default function App() {


  return (
    <>
    <div className="pinMe">

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
      <div className="chat-with-us-container">
        <section className="chat-with-links-section">
          <div className="chat-with-link">Facebook</div>
          <div className="chat-with-link">Instagram</div>
          <div className="chat-with-link">Youtube</div>
          <div className="chat-with-link">LinkedIn</div>
          <div className="chat-with-link">Whatsapp</div> 
        </section>
        <button className="chat-with-us-btn">
          <span className="chat-span">Chat With Us</span>
        </button>
      </div>
      </div>
    </>
  );
} 

 
