import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Contact from './components/Contact/Contact.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Portfolio from './pages/Portfolio.tsx';
import Blogs from './pages/Blogs.tsx';
import AboutUs from './pages/AboutUs.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index:true,Component: LandingPage
      },
      ,{
        path:"contact-us",
        Component:  Contact 
      },
      {
        path:"portfolio",
        Component:  Portfolio 
      },
      {
        path:"blogs",
        Component:  Blogs 
      },
      {
        path:"about-us",
        Component:  AboutUs 
      },

    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
 
  </StrictMode>,
)
