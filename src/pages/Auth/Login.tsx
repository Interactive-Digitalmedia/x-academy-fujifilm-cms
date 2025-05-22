import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
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

const Login = () => {
  // const [step, setStep] = useState<number>(1);
  const { setSignedIn, setUser } = useGlobalStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //call the API
    try {
      setIsLoading(true)
      const response = await axios.post(`${baseUrl}auth/login`, {
        email,
        password
      })

      //redirect after a timeout
      toast.loading('Logging in', { duration: 2000 })
      setTimeout(() => {
        setSignedIn(true)
        setIsLoading(false)
        // navigate('/')

        const { userId, fullname, googleUID } = response.data.data
        const token = response.data.token

        setUser({ userId, fullname, googleUID, token })
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

  const handleGoogleLogin = async () => {
    posthog.capture('user_clicked_login_with_google')
    try {
      const response = await axios.get(`${baseUrl}auth/google/url`, {
        withCredentials: true
      })
      if (response.data.authUrl) {
        window.location.href = response.data.authUrl
      } else {
        console.error('Failed to get auth URL')
      }
    } catch (error) {
      console.error('Error during Google authentication', error)
    }
  }

  return (
    <div>
      <div className='absolute right-10 top-10 flex items-center gap-4'>
        <span className='whitespace-nowrap text-sm'>
          Haven't registered yet?{' '}
        </span>

        <Button
          onPress={() => {
            navigate('/auth/register')
            posthog.capture('user_clicked_login_page_signup_button')
          }}
          type='button'
          className='button-custom w-full'
        >
          Signup
        </Button>
      </div>

      <div className='m-20 xs:m-2.5 md:m-[80px] lg:m-[80px]'>
        <form onSubmit={handleSubmit}>
          <CardHeader className='mb-4 text-center'>
            <CardTitle className='mb-2 text-2xl'>Login</CardTitle>
            <CardDescription className='text-foreground-muted'>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 p-6 pb-2 pt-2'>
            <div className=''>
              <Input
                autoFocus
                id='email'
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder='name@example.com'
                required
                className='input-custom'
              />
            </div>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder='Password'
                required
                className='input-custom pe-12'
              />
              <Button
                disableRipple
                onPress={() => {
                  setShowPassword((s) => !s)
                }}
                size='sm'
                variant='light'
                className='button-custom hover:!bg-card-muted absolute right-1 top-1/2 min-h-0 min-w-0 -translate-y-1/2 !bg-transparent'
              >
                {showPassword ? (
                  <EyeOff
                    size={16}
                    strokeWidth={1.5}
                    className='text-muted-foreground hover:text-[unset]'
                  />
                ) : (
                  <Eye
                    size={16}
                    strokeWidth={1.5}
                    className='text-muted-foreground hover:text-[unset]'
                  />
                )}
              </Button>
            </div>
            <div className='relative -top-2 flex flex-col items-end'>
              <Link
                className='text-foreground-muted p-[2px] pb-0 text-xs transition-all hover:underline'
                to='/auth/forgot-password'
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              isLoading={isLoading}
              type='submit'
              className='button-custom w-full'
            >
              Login with Email
            </Button>
          </CardFooter>
        </form>

        {/* Change state from this point */}

        <div className='flex w-full max-w-2xl items-center px-4'>
          <div className='flex-grow border-t border-gray-300'></div>
          <span className='text-foreground-muted px-4 text-sm'>
            OR CONTINUE WITH
          </span>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>
        <CardFooter className='mt-6'>
          <Button
            onPress={handleGoogleLogin}
            className='button-custom flex w-full items-center gap-2'
          >
            {/* <img src={google} alt='google' /> */}
            {/* <Google width={18} /> */}
            <span>Google</span>
          </Button>
        </CardFooter>
        <CardDescription className='text-foreground-muted pl-6 pr-6'>
          <p>
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </CardDescription>
      </div>
      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 transform opacity-50'>
        <p>Adoer</p>
      </div>
    </div>
  )
}

export default Login
