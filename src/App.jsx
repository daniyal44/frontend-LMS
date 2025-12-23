

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Services from './pages/Serv'
import Contact from './pages/Contactus'
import About from './pages/About'   
import AuthForm from './pages/AuthForm'
import Dashboard from './pages/Dashboard'
import Profile from './pages/AccountSetting'
import Billing from './pages/Billing'
import Portfolio from './pages/portfolio'
import Complaint from './pages/Complaint'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Google from './pages/Google'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />   {/* ✅ Works now */}
          <Route path="/services" element={<Services />} />
          <Route path="/billing/:orderId" element={<Billing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/authform" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/google" element={<Google />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
