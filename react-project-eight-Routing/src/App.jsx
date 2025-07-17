import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Navbar from './Components/Navbar';
import ParamCompo from './Components/ParamCompo';
import NotFount from './Components/NotFount';
import Courses from './Components/Courses';
import MokeTest from './Components/MokeTest';



const router = createBrowserRouter(
  [
    {
      path: "/",
      element: 
      <div>
        <Navbar />
        <Home />
        
      </div>
    },
    {
      path: "/About",
      element: 
      <div>
        <Navbar />
        <About />
        
      </div>
    },
    {
      path: "/dashboard",
      element: <div>
        <Navbar />
        <Dashboard />
      </div>,
      children:
      [ 
        {
          path:"Courses",
          element: <Courses/>
        },
        {
          path:"Moke-Tests",
          element:<MokeTest />
        },

      ]
    },
    {
      path: "/student/:id",
      element: 
      <div>
        <Navbar />
        <ParamCompo />
        
      </div>
    },
    {
      path:"*",
      element:<NotFount/>

    }
  ]

)

function App() {

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
