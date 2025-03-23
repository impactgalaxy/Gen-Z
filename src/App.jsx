import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import CostPanal from './components/costs/CostPanal'

function App() {
  

  return (
    <main>
      <Navbar></Navbar>
      <CostPanal/>
      <Outlet/>
      
    </main>
  )
}
export default App
