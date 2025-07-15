import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChildA from './Components/ChildA'


const Themecontext=createContext();

function App() {
  const [theme, settheme] = useState("light")

  return (
    <>
    <Themecontext.Provider value={{theme,settheme}}>
      <div id="container" style={{backgroundColor:theme === "light"?"beige":"black"}}>
          <ChildA />
      </div>
    </Themecontext.Provider>
      
    </>
  )
}

export default App
export {Themecontext}
