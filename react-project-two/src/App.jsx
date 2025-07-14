import Usercard from "./components/usercard"
import './App.css'
import shreyash from "./assets/shreyash.jpeg";
import myone1 from "./assets/myone1.png";
import itsme from "./assets/itsme.jpg";


function App() {
  

  return (
      <div className="container">

        <Usercard name="Akshay" desc="Developer" image={itsme} style={{"border-radius": "10px"}} />
        <Usercard name="Nikhil" desc="Developer"  image={myone1} style={{"border-radius": "10px"}} />
        <Usercard name="shreyash" desc="Tester" image={shreyash} style={{"border-radius": "10px"}} />

      </div>
  )
}

export default App
