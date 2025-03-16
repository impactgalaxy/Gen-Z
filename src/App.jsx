import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <main>
      <Navbar></Navbar>
      <Outlet/>
      
    </main>
  )
}
export default App
