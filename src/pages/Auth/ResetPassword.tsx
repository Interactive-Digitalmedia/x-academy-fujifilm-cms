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
import { Eye, EyeOff } from 'lucide-react'

const ResetPassword = () => {
  // const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const email = localStorage.getItem('user_email') || 'Err is null'
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error(`Email error`)
      return
    }
    if (password != confirmPassword) {
      toast.error(`Passwords don't match`)
      return
    }

    setIsLoading(true)
    try {
      await axios.post(`${baseUrl}auth/reset-password`, {
        email,
        newPassword: password
      })

      // I also store it in the localstorage for later
      toast.success('Password reset was successful')
      setIsLoading(false)

      //redirect after a timeout
      setTimeout(() => {
        // toast.loading('Redirecting')
        navigate('/auth/login', { replace: true })
        toast.dismiss()
      }, 1200)
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
      <div className='content forget-pass-screen m-[80px]'>
        <form onSubmit={handleResetPassword}>
          <CardHeader className='mb-4 text-center'>
            <CardTitle className='mb-2 text-2xl'>Reset Password</CardTitle>
            <CardDescription className='text-foreground-muted'>
              Create a new password
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 p-6 pb-2 pt-2'>
            {/* prefill email disabled */}
            <div className=''>
              <Input
                className='input-custom'
                autoFocus
                id='email'
                type='email'
                value={email}
                disabled
                placeholder='name@example.com'
                required
              />
            </div>

            {/* password */}
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder='New Password'
                required
                className='input-custom pe-12'
              />
              <Button
                disableRipple
                onClick={() => {
                  setShowPassword((s) => !s)
                }}
                size='sm'
                variant='light'
                className='button-custom absolute right-1 top-1/2 min-h-0 min-w-0 -translate-y-1/2 !bg-transparent hover:!bg-card-muted'
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

            {/* confirm password */}
            <div className='relative'>
              <Input
                id='confirmPassword'
                type={showPassword2 ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                placeholder='Confirm New Password'
                required
                className='input-custom pe-12'
              />
              <Button
                disableRipple
                onClick={() => {
                  setShowPassword2((s) => !s)
                }}
                size='sm'
                variant='light'
                className='button-custom absolute right-1 top-1/2 min-h-0 min-w-0 -translate-y-1/2 !bg-transparent hover:!bg-card-muted'
              >
                {showPassword2 ? (
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
          </CardContent>
          <CardFooter className='pt-2'>
            <Button
              isLoading={isLoading}
              type='submit'
              className='button-custom w-full'
            >
              Done
            </Button>
          </CardFooter>
        </form>
        {/* <div className='flex w-full max-w-2xl items-center px-4'>
            <div className='flex-grow border-t border-gray-300'></div>
            <div className='flex-grow border-t border-gray-300'></div>
          </div> */}
        <CardDescription
          className='pl-6 pr-6 pt-10 opacity-0'
          aria-hidden='true'
        >
          <p>
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </CardDescription>
      </div>
    </>
  )
}

export default ResetPassword
