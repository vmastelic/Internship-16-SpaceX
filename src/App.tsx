import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Launches from './pages/Launches/Launches'
import ShipDetails from './pages/ShipDetails/ShipDetails'
import Ships from './pages/Ships/Ships'
import LaunchDetails from './pages/LaunchDetails/LaunchDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path='/'element={<Home />}/>
        <Route path='/launches'element={<Launches />}/>
        <Route path='/launches/:id'element={<LaunchDetails />}/>
        <Route path='/ships'element={<Ships />}/>
        <Route path='/ships/:id'element={<ShipDetails />}/>
      </Routes>      
    </>
  )
}

export default App
