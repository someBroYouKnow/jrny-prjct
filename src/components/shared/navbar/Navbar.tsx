import { Link } from 'react-router'
import './navbar.css'

export const NavBar = ()=>{
    return (
      <nav className={"navbar"}>
        <ul className={"navbar-list"}>
          <li> <Link to='/'>Home</Link></li>
          <li> <Link to='/portfolio'>Portfolio</Link></li>
          <li> <Link to='/about-us'>About Us</Link></li>
          <li> <Link to='/blogs'>Blogs</Link></li>
          <li> <Link to='/contact-us'>Contact</Link></li>
        </ul>
      </nav>
    )
}