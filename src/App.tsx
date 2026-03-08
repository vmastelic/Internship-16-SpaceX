import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Launches from './pages/Launches/Launches'
import ShipDetails from './pages/ShipDetails/ShipDetails'
import Ships from './pages/Ships/Ships'
import LaunchDetails from './pages/LaunchDetails/LaunchDetails'
import ErrorPage from './pages/ErrorPage/ErrorPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/'element={<Home />}/>
        <Route path='/launches'element={<Launches />}/>
        <Route path='/launches/:id'element={<LaunchDetails />}/>
        <Route path='/ships'element={<Ships />}/>
        <Route path='/ships/:id'element={<ShipDetails />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>      
    </>
  )
}

export default App
