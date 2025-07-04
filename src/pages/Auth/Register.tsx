import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
// import { Input } from '@/components/ui/input'
import { Button } from '@nextui-org/button'
import toast from 'react-hot-toast'
import { baseUrl } from '@/utils/config'
import InputOTPControlled from '@/components/InputOTPControlled'
import posthog from 'posthog-js'
// import Google from '../../../public/images/banner/logo/Google'
import { ChevronLeft } from 'lucide-react'
// import ProgressBar from '@/components/command-bar/ProgressBar'
// import adoerImg from '../../../public/images/adoerLogo.svg'
const Register = () => {
  const [step, setStep] = useState<number>(1) // State to manage current step in registration process
  const [email, setEmail] = useState<string>('') // State to store user's email input
  const [otp, setOTP] = useState<string>('') // State to store OTP input
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const navigate = useNavigate()
  // const otpRef = useRef(null)

  // useEffect(() => {
  //   if (step === 2) {
  //     // @ts-expect-error...
  //     otpRef?.current?.focus()
  //   }
  // }, [step])
  // Function to handle submission when user enters their email
  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission behavior
    try {
      const response = await axios.post(`${baseUrl}auth/register-with-otp`, {
        email
      })
      posthog.capture('user_clicked_signup_with_email')
      const toastMessage = response?.data?.message
      toast.success(toastMessage && toastMessage.toString()) // Update message state on successful OTP request
      setStep(2) // Move to next step in registration process
    } catch (error) {
      const err = error as AxiosError
      if (err.response) {
        if (err.response.status === 409)
          // Logs the status code
          navigate('/auth/login')
      }
      console.error(err?.response?.data)
      // @ts-expect-error custom error code
      const toastMessage = err?.response?.data?.message
      toast.error(toastMessage && toastMessage.toString())
    }
  }

  // Function to handle submission when user enters OTP to verify email
  const handleSubmitOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    posthog.capture('user_clicked_register_page_continue')
    e.preventDefault() // Prevent default form submission behavior
    if (!otp || otp.length != 6) {
      toast.error('OTP is required!')
      return
    }

    try {
      const response = await axios.post(`${baseUrl}auth/verify-otp`, {
        email,
        otp
      })

      const toastMessage = response.data?.message
      toast.success(toastMessage && toastMessage.toString()) // Update message state on successful OTP request

      // store email in sessionStorage
      sessionStorage.setItem('user_email', email)

      navigate('/auth/create-user') // Navigate to create user page on successful verification
    } catch (error) {
      const err = error as AxiosError
      console.error(err?.response?.data)
      // @ts-expect-error custom error code
      const toastMessage = err?.response?.data?.message
      setErrorMessage(true)
      toast.error(toastMessage && toastMessage.toString()) //error message when OTP is incorrect
    }
  }

  const handleGoogleLogin = async () => {
    posthog.capture('user_clicked_register_with_google')
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
    <div className=''>
      <div className='absolute top-10 flex w-full items-center justify-between px-8'>
        <Button
          onPress={() => setStep((prevStep) => Math.max(1, prevStep - 1))}
          className='button-custom rounded-lg border'
          style={{
            width: '40px',
            minWidth: '40px',
            maxWidth: '40px',
            borderRadius: '12px'
          }}
        >
          <ChevronLeft className='min-w-4' />
        </Button>
        <div className='mr-4 hidden items-center gap-1 sm:flex'>
          <span className='whitespace-nowrap text-sm text-[#323232]'>
            Already have an account?
          </span>

          <a
            onClick={() => {
              navigate('/auth/login')
            }}
            className='underline'
          >
            Log in
          </a>
        </div>
      </div>
      {/* <div className='absolute top-[6%] h-16 w-16 md:hidden'>
        <img src={adoerImg} alt='adoer.logo' className='h-[100%] w-[100%]' />
      </div> */}
      <div className='m-20 xs:m-2.5 md:m-[80px] lg:m-[80px]'>
        {step === 1 ? ( // Render form for step 1 of registration process
          <form onSubmit={handleSubmitEmail}>
            <CardHeader className='mb-4 text-center'>
              <CardTitle className='mb-2 text-2xl'>Let's get started</CardTitle>
              <CardDescription className='text-foreground-muted'>
                Please enter your email to log in or sign up
              </CardDescription>
            </CardHeader>
            <CardContent className='mb-4 space-y-4 p-6 pb-2 pt-2'>
              <div className='w-full'>
                <input
                  autoFocus
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@example.com'
                  className='outline-1.2 flex h-10 w-full min-w-[19rem] rounded-xl border-none bg-background px-3 py-2 pe-12 text-sm outline-dashed outline-offset-0 outline-[#EDEDED] placeholder:text-[#D9D9D9] focus:outline-2 focus:outline-[#a5a5a5]'
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type='submit'
                color='primary'
                className='button-custom w-full'
                style={{
                  borderRadius: '12px',
                  backgroundColor: '#1877F2',
                  color: 'white'
                }}
              >
                Continue
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleSubmitOTP}>
            <CardHeader className='mb-4 text-center'>
              <div className='mb-6'>
                {/* <ProgressBar currentStep={1} /> */}
              </div>
              <CardTitle className='mb-2 text-2xl'>
                Please enter the code
              </CardTitle>
              <CardDescription>
                We've sent a code to <b>{email}</b>
              </CardDescription>
            </CardHeader>
            <CardContent className='mb-4 space-y-4 p-6 pb-2 pt-2'>
              <div className=''>
                <InputOTPControlled
                  //autoFocus
                  //id='otp'
                  otp={otp}
                  setOtp={setOTP}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
                {/* <Input
              ref={otpRef}
              autoFocus
              id='otp'
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            /> */}
              </div>
              {errorMessage && (
                <div className={`text-sm text-[#F92B2B]`}>
                  Please enter the correct code
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type='submit'
                className='button-custom w-full !rounded-xl !bg-[#1877F2] !text-[white]'
              >
                Continue
              </Button>
            </CardFooter>
          </form>
        )}

        {/* <div className='flex w-full max-w-2xl items-center px-4'>
      <div className='flex-grow border-t border-gray-300'></div>
      <span className='px-4 text-sm text-gray-500'>OR CONTINUE WITH</span>
      <div className='flex-grow border-t border-gray-300'></div>
    </div>
    <CardFooter>
      <Button
        onClick={handleGoogleLogin}
        className='text-black-700 mt-5 w-[450px] rounded-sm border border-gray-300 bg-white font-medium hover:bg-gray-200'
      >
        Google
      </Button>
    </CardFooter> */}
        {step == 1 && (
          <>
            <div className='flex w-full max-w-2xl items-center px-4'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='text-foreground-muted px-4 text-sm'>or</span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>
            <CardFooter className='mt-6 flex flex-col'>
              <Button
                onPress={handleGoogleLogin}
                className='button-custom mb-4 flex w-full items-center gap-2 !rounded-xl'
              >
                {/* <img src={google} alt='google' /> */}
                {/* <Google width={18} /> */}
                <span>Continue with Google </span>
              </Button>
              <div className='block sm:hidden'>
                <span className='whitespace-nowrap text-sm text-[#323232]'>
                  Already have an account?{' '}
                </span>

                <a
                  onClick={() => {
                    navigate('/auth/login')
                  }}
                  className='underline'
                >
                  Log in
                </a>
              </div>
            </CardFooter>
            <CardDescription className='pl-6 pr-6 text-center'>
              <p>
                By continuing to use Adoer, you agree to our{' '}
                <a className='underline'>Terms of Service</a> and{' '}
                <a className='underline'>Privacy Policy.</a>
              </p>
            </CardDescription>
          </>
        )}
      </div>

      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 transform opacity-50'>
        <p>Adoer</p>
      </div>
    </div>
  )
}

export default Register
