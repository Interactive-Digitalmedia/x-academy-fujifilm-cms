import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { baseUrl } from '@/utils/config'
import InputOTPControlled from '@/components/InputOTPControlled'

const ForgotPassword = () => {
  // const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [screen, setScreen] = useState<number>(1)
  const [otp, setOtp] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const navigate = useNavigate()
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!otp || otp.length != 6) {
      toast.error('Reset code is required')
      setIsLoading(false)
      return
    }

    try {
      await axios.post(`${baseUrl}auth/verify-reset-code`, {
        email,
        otp
      })

      setIsLoading(false)

      toast.success('Verfied successfully')
      navigate('/auth/reset-password')
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post(`${baseUrl}auth/forget-password`, {
        email
      })

      // I also store it in the localstorage for later
      toast.success('Sent! Check your email')
      localStorage.setItem('user_email', email)
      setIsLoading(false)
      setScreen(2)
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

  return (
    <>
      <div className='absolute right-10 top-10 flex items-center gap-4'>
        <span className='whitespace-nowrap text-sm'>Found it stashed? </span>

        <Button
          onClick={() => {
            navigate('/auth/login')
          }}
          type='button'
          className='button-custom w-full'
        >
          Login
        </Button>
      </div>

      {screen == 1 && (
        <div className='content forget-pass-screen m-[80px]'>
          <form onSubmit={handleSendOtp}>
            <CardHeader className='mb-4 text-center'>
              <CardTitle className='mb-2 text-2xl'>Forgot Password?</CardTitle>
              <CardDescription className='text-foreground-muted'>
                Don't worry, it happens to the best of us!
              </CardDescription>
            </CardHeader>
            <CardContent className='mb-4 space-y-4 p-6 pb-2 pt-2'>
              <div className=''>
                <Input
                  autoFocus
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  placeholder='Enter your registered email'
                  required
                  className='input-custom'
                />
              </div>
            </CardContent>
            <CardFooter className='pt-2'>
              <Button
                isLoading={isLoading}
                type='submit'
                className='button-custom w-full'
              >
                Send me the reset code
              </Button>
            </CardFooter>
          </form>
          <CardDescription
            className='pl-6 pr-6 pt-10 opacity-0'
            aria-hidden='true'
          >
            <p>
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </CardDescription>
        </div>
      )}
      {screen == 2 && (
        <div className='content verify-otp-screen m-[80px]'>
          <form onSubmit={handleVerifyOtp}>
            <CardHeader className='mb-1 pb-0 text-center'>
              <CardTitle className='text-2xl'>Verify reset code</CardTitle>
              <CardDescription aria-hidden='true' className='invisible'>
                none
              </CardDescription>
            </CardHeader>
            <CardContent className='mb-4 space-y-4 p-6 pb-2 pt-2'>
              <div className=''>
                <InputOTPControlled otp={otp} setOtp={setOtp} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
              </div>
            </CardContent>
            <CardFooter className='pt-2'>
              <Button
                isLoading={isLoading}
                type='submit'
                className='button-custom w-full'
              >
                Verify
              </Button>
            </CardFooter>
          </form>
          <CardDescription
            className='pl-6 pr-6 pt-10 opacity-0'
            aria-hidden='true'
          >
            <p>
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </CardDescription>
        </div>
      )}
    </>
  )
}

export default ForgotPassword
