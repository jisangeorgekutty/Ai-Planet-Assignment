import React from 'react'

import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';
import SignUpPage from './auth/SignUpPage';
import SignInPage from './auth/SignInPage';



function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/auth/sign-in' element={<SignInPage />} />
      </Routes>
    </div>
  )
}

export default App