import './navbar.css'

export const NavBar = ()=>{
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