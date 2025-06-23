
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import useGlobalStore from '@/state/GlobalState'
import { baseUrl } from '@/utils/config'
import { Eye, EyeOff } from 'lucide-react'
// import Google from '../../../public/images/banner/logo/Google'
import posthog from 'posthog-js'
import LoginImage from '/public/images/login/login.jpg'
import Logo from '/public/images/logo/logo.webp'

const Login = () => {
  // const [step, setStep] = useState<number>(1);
  const { setSignedIn, setUser } = useGlobalStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //call the API
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${baseUrl}admin/admin-login`,
        {
          email,
          password
        },
        {
          headers: {
            'x-validation-string': 'Gy_Ly69C7$<' // Replace with actual string
          }
        }
      )

      //redirect after a timeout
      toast.loading('Logging in', { duration: 2000 })
      setTimeout(() => {
        setSignedIn(true)
        setIsLoading(false)
   

        const { userId, fullname, userRole = 'super admin' } = response.data.data
        const token = response.data.token

        setUser({ userId, fullname, token, userRole, email })
        posthog.capture('user_clicked_login_with_email')
        posthog.identify(
          email, // Replace 'distinct_id' with your user's unique identifier
          { email: email, name: fullname } // optional: set additional person properties
        )
        // console.log('User data:', response.data)
      }, 1500)
    } catch (error) {
      const err = error as AxiosError
      setIsLoading(false)
      console.log(err.response)

      const toastMessage =
        // @ts-expect-error custom error code
        err?.response?.data?.message || 'Unknown err check console'
      toast.error(toastMessage.toString())
    }
  }

  // const handleGoogleLogin = async () => {
  //   posthog.capture('user_clicked_login_with_google')
  //   try {
  //     const response = await axios.get(`${baseUrl}auth/google/url`, {
  //       withCredentials: true
  //     })
  //     if (response.data.authUrl) {
  //       window.location.href = response.data.authUrl
  //     } else {
  //       console.error('Failed to get auth URL')
  //     }
  //   } catch (error) {
  //     console.error('Error during Google authentication', error)
  //   }
  // }

  return (
    <div className="flex h-screen w-screen">
      {/* Left - Form */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 md:w-1/2">
        {/* Signup Link Top Right */}
        {/* <div className="absolute right-10 top-10 flex items-center gap-4">
          <span className="whitespace-nowrap text-sm">Haven't registered yet?</span>
          <Button
            type="button"
            onPress={() => {
              navigate('/auth/register')
              // posthog.capture('user_clicked_login_page_signup_button')
            }}
            className="bg-gray-200 text-sm font-medium"
          >
            Signup
          </Button>
        </div> */}

        {/* Login Form */}
        <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
    <img src={Logo} alt="Logo" className="h-12 w-auto" />
  </div>
          <h1 className="mb-2 text-2xl font-semibold text-center">Login</h1>
          <p className="mb-6 text-center text-sm text-gray-500">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              autoFocus
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="pe-12"
              />
              <Button
                type="button"
                onPress={() => setShowPassword((s) => !s)}
                size="sm"
                variant="light"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>

            <div className="text-right text-xs">
              <Link
                to="/auth/forgot-password"
                className="text-gray-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full normal-btn rounded-[8px]"
            >
              Login with Email
            </Button>
          </form>

        
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src={LoginImage}
          alt="Login visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Footer Center */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 transform opacity-50 text-xs">
        <p>X Academy</p>
      </div>
    </div>
  )
}

export default Login
