import React from 'react'
import LandingPage from './pages/LandingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';
import SignUpPage from './auth/SignUpPage';
import SignInPage from './auth/SignInPage';
import WorkFlowPage from './pages/WorkFlowPage';
import NavBar from './components/NavBar';



function App() {
  const location = useLocation();
  const hideNavBarOnRoutes = ['/'];
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div>
      {!hideNavBarOnRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/auth/sign-in' element={<SignInPage />} />
        <Route path='/auth/sign-up' element={<SignUpPage />} />
        <Route path='/dashboard/workflow/:id' element={<WorkFlowPage />} />
      </Routes>
    </div>
  )
}

export default App