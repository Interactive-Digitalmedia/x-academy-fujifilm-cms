import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Checkbox,
  Form,
  InputOtp
} from '@nextui-org/react'
import { Input } from '@/components/ui/input'
import { X, Eye, EyeOff } from 'lucide-react'
import whiteLogo from '../../../public/images/banner/logo/whiteLogo.svg'
import blackLogo from '../../../public/images/banner/logo/blackLogo.svg'
import { useEffect, useState } from 'react'
import useGlobalStore from '@/state/GlobalState'
import LoginWithSocial from './LoginWIthSocial'


interface LoginModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  // State to toggle between login and create account views
  const { signedIn, showLoginModal, setShowLoginModal } = useGlobalStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [otp, setOtp] = useState()
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false)
  const [showCreateAccountPassword, setShowCreateAccountPassword] =
    useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)


useEffect(() => {
  if (signedIn && showLoginModal) {
    setShowLoginModal(false)
  }
}, [signedIn, showLoginModal, setShowLoginModal])



  useEffect(() => {
    const handleModalOpen = () => {
      // Save the current scroll position
      const scrollY = window.scrollY

      // Add styles to prevent scrolling and fix content in place
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden' // html element
    }

    const handleModalClose = () => {
      // Remove the fixed position and restore scrolling
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''

      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    if (isOpen) {
      handleModalOpen()
    } else {
      handleModalClose()
    }

    // Cleanup function to ensure scrolling is restored when component unmounts
    return () => {
      if (isOpen) {
        handleModalClose()
      }
    }
  }, [isOpen])
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='lg'
      placement='center'
      hideCloseButton
      classNames={{
        base: 'overflow-hidden',
        wrapper: 'overflow-hidden',
        body: 'overflow-hidden',
        backdrop: 'overflow-hidden'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className='relative p-4'>
            {/* Close Icon */}
            <button
              onClick={onClose}
              className='absolute right-4 top-4 text-gray-500 hover:text-gray-800'
            >
              <X size={20} />
            </button>

            {/* Logo */}
            <div className='flex justify-center'>
              <img
                src={whiteLogo}
                className='hidden h-10 dark:block'
                alt='Logo Dark'
              />
              <img
                src={blackLogo}
                className='block h-10 dark:hidden'
                alt='Logo Light'
              />
            </div>

            <ModalBody className='gap-4'>
              {{
                0: (
                  <>
                    <h2 className='mt-1 text-center text-lg font-semibold'>
                      Login
                    </h2>
                    <p className='mt-2 text-center text-sm'>
                      Don't have an account?
                      <button
                        onClick={() => setCurrentStep(1)}
                        className='font-medium text-blue-500 underline'
                      >
                        Sign up for free
                      </button>
                    </p>
                    <>
                      {/* Email Input */}
                      <div>
                        <div className='mb-1 flex justify-between'>
                          <label className='text-sm font-medium'>
                            Username or Email Address
                          </label>
                        </div>
                        <Input
                          placeholder='Eg. johndoe@gmail.com'
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                        />
                      </div>

                      {/* Password Input */}
                      <div>
                        <div className='mb-1 flex justify-between'>
                          <label className='text-sm font-medium'>
                            Password<span className='text-red-500'>*</span>
                          </label>
                        </div>
                        <div className='relative'>
                          <Input
                            type={showLoginPassword ? 'text' : 'password'}
                            placeholder='***************'
                            required
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                          />
                          <Button
                            // disableRipple
                            onPress={() => {
                              setShowLoginPassword((s) => !s)
                            }}
                            size='sm'
                            // variant='light'
                            className='button-custom hover:!bg-card-muted absolute right-1 top-1/2 min-h-0 min-w-0 -translate-y-1/2 !bg-transparent'
                          >
                            {showLoginPassword ? (
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
                        <a
                          href='#'
                          className='mt-2 flex justify-end text-xs text-blue-500 underline'
                        >
                          Forgot Password
                        </a>
                      </div>

                      {/* Checkbox */}
                      <Checkbox size='sm' defaultSelected className='mt-1'>
                        Keep me signed in
                      </Checkbox>
                      <Button onClick={() => {}} className='normal-btn mt-2'>
                        Continue
                      </Button>
                      <LoginWithSocial />
                    </>
                  </>
                ),
                // Create Account Step
                1: (
                  <>
                    <h2 className='mt-1 text-center text-lg font-semibold'>
                      Create Account
                    </h2>
                    <div>
                      <div className='mb-1 flex justify-between'>
                        <label className='text-sm font-medium'>
                          Username or Email Address
                        </label>
                      </div>
                      <Input placeholder='Eg. johndoe@gmail.com' required />
                    </div>
                    <Button
                      onClick={() => {
                        setCurrentStep(2)
                      }}
                      className='normal-btn mt-2'
                    >
                      Continue
                    </Button>
                    <p className='text-xs text-gray-600'>
                      Your personal data will be used to support your experience
                      throughout this website, to manage access to your account,
                      and for other purposes described in our Privacy policy.
                    </p>
                    <LoginWithSocial />
                  </>
                ),
                // OTP Step
                2: (
                  <>
                    <h2 className='mt-1 text-center text-lg font-semibold'>
                      Enter your OTP
                    </h2>
                    <Form
                      className='flex w-full flex-col items-center gap-4'
                      onSubmit={(e) => {
                        e.preventDefault()
                        // const formData = new FormData(e.currentTarget)
                        // const otp = formData.get('otp')
                        // setOtp(otp)
                      }}
                    >
                      <div className='mb-1 flex justify-between'>
                        <label className='text-sm font-medium'>
                          Enter OTP received on your registered email/phone? *
                        </label>
                      </div>

                      <InputOtp
                        isRequired
                        aria-label='OTP input field'
                        length={6}
                        name='otp'
                        placeholder='Enter code'
                      />
                      <Button
                        onClick={() => {
                          setCurrentStep(3)
                        }}
                        className='normal-btn mt-2 w-full'
                      >
                        Submit
                      </Button>
                      {otp && (
                        <div className='text-small text-default-500'>
                          OTP submitted: {otp}
                        </div>
                      )}
                    </Form>
                  </>
                ),
                // password and confirm password step
                3: (
                  <>
                    <h2 className='mt-1 text-center text-lg font-semibold'>
                      Create Account
                    </h2>
                    <div>
                      <div className='mb-1 flex justify-between'>
                        <label className='text-sm font-medium'>Username</label>
                      </div>
                      <Input placeholder='Eg. johndoe@gmail.com' required />
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className='mb-1 flex justify-between'>
                        <label className='text-sm font-medium'>
                          Password<span className='text-red-500'>*</span>
                        </label>
                      </div>
                      <div className='relative'>
                        <Input
                          type={showCreateAccountPassword ? 'text' : 'password'}
                          placeholder='***************'
                          required
                        />
                        <Button
                          // disableRipple
                          onPress={() => {
                            setShowCreateAccountPassword((s) => !s)
                          }}
                          size='sm'
                          // variant='light'
                          className='button-custom hover:!bg-card-muted absolute right-1 top-1/2 min-h-0 min-w-0 -translate-y-1/2 !bg-transparent'
                        >
                          {showCreateAccountPassword ? (
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
                    </div>
                    <div>
                      <div className='mb-1 flex justify-between'>
                        <label className='text-sm font-medium'>
                          Confirm Password
                          <span className='text-red-500'>*</span>
                        </label>
                      </div>
                      <div className='relative'>
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='***************'
                          required
                        />
                        <Button
                          // disableRipple
                          onPress={() => {
                            setShowConfirmPassword((s) => !s)
                          }}
                          size='sm'
                          // variant='light'
                          className='button-custom hover:!bg-card-muted absolute right-1 top-1/2 min-h-0 min-w-0 -translate-y-1/2 !bg-transparent'
                        >
                          {showConfirmPassword ? (
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
                    </div>
                    <Button onClick={() => {}} className='normal-btn mt-2'>
                      Done
                    </Button>
                    <p className='w-full text-center text-[11px]'>
                      By continuing to use X Academy, you agree to our{' '}
                      <a href='/terms' className='underline'>
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href='/privacy' className='underline'>
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </>
                )
              }[currentStep] ?? <></>}
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LoginModal
