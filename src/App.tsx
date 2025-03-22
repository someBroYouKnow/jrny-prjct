import './App.css';

export default function App() {
  return (
    <>
    <div className="header">
      <div className="logo"></div>
      <div className="navbar-div"><NavBar/></div>
    </div>
    <div className="container">
      <div className="hero-container">

      </div>
    </div>
    </>
  )
}

const NavBar = ()=>{
  return (
    <nav className={"navbar"}>
      <ul className={"navbar-list"}>
        <li>Home</li>
        <li>Portfolio</li>
        <li>About Us</li>
        <li>Blogs</li>
        <li>Contact</li>
      </ul>
    </nav>
  )
}