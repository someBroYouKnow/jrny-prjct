import "./App.css";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";

export default function App() {
  return (
    <>
      <div className="header">
        <Logo />
        <div className="navbar-div">
          <NavBar />
        </div>
      </div>

      <div className="container">
        <div className="hero-container">
          <div className="show-reel">

          </div>
          <div className="landing-text-container">
            
          </div>
        </div>
      </div>
    </>
  );
}
