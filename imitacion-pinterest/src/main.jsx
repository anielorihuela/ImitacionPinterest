import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './GeneralComponents/Header.jsx'
import Mosaic from './PinComponents/Mosaic.jsx'
import PinDetail from './PinComponents/PinDetail.jsx'
import ProfilePage from './ProfileComponents/ProfilePage.jsx'
import Login from './ProfileComponents/Login.jsx'
import Register from './ProfileComponents/Register.jsx'
import Discover from './PagesComponents/Discover.jsx'
import Update from './PagesComponents/Update.jsx'
import Create from './PagesComponents/Create.jsx'
import './scss/styles.scss'
import './style.css'
import * as bootstrap from 'bootstrap'
import './theme.js'

// Simulación de datos para el mosaico
import pinesData from './datos/pines.json';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Mosaic pins={pinesData} />} />
        <Route path="/pin/:id" element={
          <>
            <PinDetail /> 
            <Mosaic pins={pinesData} />
            </>
        } />
        <Route path="/profile" element={<ProfilePage /> } />
        <Route path="/profile/login" element={<Login />} />
        <Route path="/profile/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/modboard/:id" element={
          <Update type="board" />
        } />
        <Route path="/modpin/:id" element={
          <Update type="pin" />
        } />
        <Route path="*" element={<h2 className="text-center mt-5">404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

