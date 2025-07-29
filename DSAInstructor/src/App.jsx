import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatContainer from './components/ChatContainer'
import useChat from './hooks/useChat'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const chat = useChat()

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatContainer {...chat} />
    </div>
  )
}

export default App