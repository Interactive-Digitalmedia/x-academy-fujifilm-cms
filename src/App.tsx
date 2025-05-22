import { Route, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register'
import CreateUser from './pages/Auth/CreateUser'
import Login from './pages/Auth/Login'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './utils/ThemeProvider'
import NotFound from './pages/NotFound'
import CheckAuth from './utils/CheckAuth'
import CheckAuthLogin from './utils/CheckAuthLogin'
import Logout from './pages/Auth/Logout'
import GoogleLoginRedirect from './pages/Auth/GoogleLoginRedirect'
import DashboardLayout from './layouts/DashboardLayout'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'



// import Channel1 from './pages/Channel1/Channel1'

import NotGoogleUser from './pages/Auth/NotGoogleUser'

import Home from './pages/Home/Home'
import useGlobalStore from '@/state/GlobalState'
import LoginModal from './components/login/LoginModal'
import useAuthValidator from './hooks/useAuthValidator'


function App() {
  useAuthValidator()
  const { showLoginModal, setShowLoginModal } = useGlobalStore()
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <LoginModal
  isOpen={showLoginModal}
  onOpenChange={setShowLoginModal}
/>
      {/* <PlanProvider> */}
      <Toaster />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/invalid-login-method' element={<NotGoogleUser />} />

      
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/' element={<CheckAuth />}>
          <Route path='logout' element={<Logout />} />
          <Route path='*' element={<NotFound />} />
        </Route>
       
        <Route path='/auth' element={<CheckAuthLogin />}>
          <Route index element={<NotFound />} />
          <Route
              path='google-login-redirect'
              element={<GoogleLoginRedirect />}
            />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='register' element={<Register />} />
            <Route path='create-user' element={<CreateUser />} />
          
   
        </Route>
      </Routes>
      {/* </PlanProvider> */}
    </ThemeProvider>
  )
}

export default App
