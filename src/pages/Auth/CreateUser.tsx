import {
  // Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import UserTypeCard from '@/components/ui/userTypeCard'
import { Button } from '@nextui-org/button'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import useGlobalStore from '@/state/GlobalState'
import { baseUrl } from '@/utils/config'
import {
  Eye,
  EyeOff,
  ChevronLeft
  // CodeXml,
  // Briefcase,
  // Linkedin,
  // BookText,
  // Video,
  // Scale,
  // Lightbulb,
  // UserRound
} from 'lucide-react'
// import adoerImg from '../../../public/images/adoerLogo.svg'

import posthog from 'posthog-js'
// import ProgressBar from '@/components/command-bar/ProgressBar'
// import { Select, SelectItem } from '@nextui-org/react'
// import GoogleIcon from '@/components/icons/GoogleIcon'
// import RedditIcon from '@/components/icons/RedditIcon'
// import InstagramIcon from '@/components/icons/InstagramIcon'
// import Onboarding from '@/components/onboarding/OnBoarding'

export default function CreateUser() {
  const navigate = useNavigate()

  // if email doesn't exist in store, redirect
  // this can only happen in a scenario where the user manually puts in the url
  const inputElement = useRef(null)
  useEffect(() => {
    //@ts-expect-error...
    inputElement?.current?.focus()
    const email = sessionStorage.getItem('user_email')
    if (!email) navigate('/auth/register')
    return () => {}
  }, [navigate])

  const { setUser, setSignedIn } = useGlobalStore()
  const [step, setStep] = useState<number>(1)
  const [fullname, setFullName] = useState<string>('')
  const [password, setPasword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // const [role, setRole] = useState<string>('') // New state to select occupation
  // const [source, setSource] = useState<string>('')
  const [clickedAtStepOne, setClickedAtStepOne] = useState<boolean>(false)

  // const [accessCode, setAccessCode] = useState<string>('')
  // useEffect(() => {
  //   console.log('Selected Role:', source)
  // }, [source])
  // const cardsData = [
  //   { id: 1, imageSrc: '/images/founder.png', title: 'Founder / Co-Founder' },
  //   { id: 2, imageSrc: '/images/creative.png', title: 'Content Creator' },
  //   { id: 3, imageSrc: '/images/reading.png', title: 'Student' },
  //   {
  //     id: 4,
  //     imageSrc: '/images/professional.png',
  //     title: 'Working Professional'
  //   },
  //   { id: 5, imageSrc: '/images/freelancer.png', title: 'Freelancer' },
  //   {
  //     id: 6,
  //     imageSrc: '/images/businessman.png',
  //     title: 'Licensed Professional'
  //   }
  // ]

  // const occupationOptions = [
  //   {
  //     label: 'Founder / Co-Founder',
  //     value: 'Founder / Co-Founder',
  //     icon: <Lightbulb size={14} />
  //   },
  //   {
  //     label: 'Content Creator',
  //     value: 'Content Creator',
  //     icon: <Video size={14} />
  //   },
  //   { label: 'Student', value: 'Student', icon: <BookText size={14} /> },
  //   {
  //     label: 'Working Professional',
  //     value: 'Working Professional',
  //     icon: <CodeXml size={14} />
  //   },
  //   { label: 'Freelancer', value: 'freelancer', icon: <Briefcase size={14} /> },
  //   {
  //     label: 'Licensed Professional',
  //     value: 'Licensed Professional',
  //     icon: <Scale size={14} />
  //   }
  // ]

  // const sourceOptions = [
  //   { label: 'LinkedIn', value: 'linkedIn', icon: <Linkedin size={14} /> },
  //   {
  //     label: 'Google',
  //     value: 'google',
  //     icon: <GoogleIcon size={16} />
  //   },
  //   {
  //     label: 'Instagram',
  //     value: 'instagram',
  //     icon: <InstagramIcon size={14} />
  //   },
  //   {
  //     label: 'Reddit',
  //     value: 'reddit',
  //     icon: <RedditIcon size={18} />
  //   },
  //   {
  //     label: 'Refered by friend',
  //     value: 'referedByFriend',
  //     icon: <UserRound size={14} />
  //   }
  // ]

  const containsDigit = /\d/.test(password)
  const containsAlphabet = /[a-zA-Z]/.test(password)
  const doesNotContainName = !password
    .toLowerCase()
    .includes(fullname.toLowerCase())

  const isStrongPassword =
    password.length >= 8 && containsDigit && containsAlphabet

  const handleSubmitDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (step === 1 && (!fullname || !password)) {
      toast.error('All fields are required')
      return
    }

    if (step === 1) {
      posthog.capture('user_clicked_complete_registration')
      // setStep(2)
    }

    // if (step === 2 && !role) {
    //   toast.error('Please enter your current professional role')
    //   return
    // }

    // now create a user object and send to DB

    if (step === 1) {
      posthog.capture('user_clicked_go_to_dashboard')
      toast.loading('Creating user', { duration: 800 })
      const email = sessionStorage.getItem('user_email')
      const userAuthPayload = {
        email: email?.toLowerCase(),
        password,
        fullname,
        // accessCode: accessCode.toLowerCase(),
        googleUID: null
        // userType: role,
        // source
      }
      try {
        const response = await axios.post(
          `${baseUrl}auth/register`,
          userAuthPayload
        )
        const user: any = response.data
        console.log(user)
        //@ts-expect-error---
        handleUserLogin(email, password)
      } catch (error) {
        // first cancel all toasts
        toast.dismiss()
        const err = error as AxiosError
        // user already exists!
        if (err.response) {
          if (err.response.status === 409) {
            sessionStorage.clear()
            navigate('/auth/login')
          }
        }

        console.error(err?.code)
        console.error(err?.response?.data)
        const toastMessage =
          // @ts-expect-error custom error code
          err?.response?.data?.message || 'Unknown err check console'
        toast.error(toastMessage.toString())
      }
    }

    // redirection logic what even is this
    // if (step < 3) {
    //   setStep(step + 1)
    // }
  }

  // last step
  const handleUserLogin = async (email: string, password: string) => {
    // toast.success("Finished! You'll soon be redirected")

    // now LOG in
    try {
      const response = await axios.post(`${baseUrl}auth/login`, {
        email,
        password
      })

      //redirect after a timeout
      setTimeout(() => {
        setSignedIn(true)

        // navigate('/')

        const { userId, fullname, googleUID, source, userType } =
          response.data.data
        const token = response.data.token

        setUser({ userId, fullname, googleUID, token, source, userType })
        posthog.identify(
          email, // Replace 'distinct_id' with your user's unique identifier
          { email: email, name: fullname } // optional: set additional person properties
        )
        console.log('User data:', response.data)
      }, 1500)
    } catch (error) {
      const err = error as AxiosError

      console.error(err?.response?.data)

      // @ts-expect-error custom error code
      const toastMessage = err?.response?.data?.message
      if (toastMessage) {
        toast.error(toastMessage.toString())
        return
      }
      navigate('/auth/login')
    }
  }

  // const handleRoleChange = (selectedOccupation: string) => {
  //   setRole(selectedOccupation)
  // }
  // const handleSourceClick = (selectedOption: string) => {
  //   setSource(selectedOption)
  // }
  const handleBackClick = () => {
    if (step > 1) {
      setStep((prevStep) => Math.max(1, prevStep - 1))
      setClickedAtStepOne(false)
    } else {
      if (clickedAtStepOne) {
        navigate('/auth/register')
      } else {
        setClickedAtStepOne(true)
      }
    }
  }

  return (
    <>
      <div className='absolute top-10 flex w-full items-center justify-between px-8'>
        <Button
          // onClick={() => setStep((prevStep) => prevStep - 1)}
          onPress={handleBackClick}
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
        {/* <div className='mr-4 flex items-center gap-1'>
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
        </div> */}
      </div>
      <div className='absolute top-20 h-14 w-14 md:hidden [@media(min-width:408px)_and_(max-width:915px)]:top-20'>
        {/* <img src={adoerImg} alt='adoer.logo' className='h-[100%] w-[100%]' /> */}
      </div>
      <div className='m-[80px]'>
        {step === 1 && (
          <form onSubmit={handleSubmitDetails}>
            <div className='mb-6'>
              {/* <ProgressBar currentStep={step + 1} /> */}
            </div>
            <CardHeader className='mb-4 text-center'>
              <CardTitle className='mb-2 text-2xl'>
                What should we call you?
              </CardTitle>
              <CardDescription className='text-foreground-muted'>
                Introduce yourself to Adoer
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 p-6 pb-2 pt-2'>
              <div className=''>
                <input
                  ref={inputElement}
                  autoFocus
                  id='name'
                  type='text'
                  placeholder='Full Name'
                  className='outline-1.2 founded-xl flex h-10 w-full min-w-[19rem] rounded-xl border-none bg-background px-3 py-2 pe-12 text-sm outline-dashed outline-offset-0 outline-[#EDEDED] placeholder:text-[#D9D9D9] focus:outline-2 focus:outline-[#a5a5a5] sm:w-[28rem]'
                  value={fullname}
                  onChange={(e) => {
                    setFullName(e.target.value)
                  }}
                  required
                />
              </div>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  // className='input-custom min-w-[19rem] pe-12 sm:w-[28rem]'
                  className='outline-1.2 founded-xl flex h-10 w-full min-w-[19rem] rounded-xl border-none bg-background px-3 py-2 pe-12 text-sm outline-dashed outline-offset-0 outline-[#EDEDED] placeholder:text-[#D9D9D9] focus:outline-2 focus:outline-[#a5a5a5] sm:w-[28rem]'
                  value={password}
                  onChange={(e) => {
                    setPasword(e.target.value)
                  }}
                  required
                />
                <Button
                  disableRipple
                  onPress={() => {
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
              {/* <div className='p !mt-4 flex w-full max-w-2xl items-center'> */}
              {/* <div className='flex-grow border-t border-gray-300'></div> */}
              {/* <div className='flex items-center gap-1 px-4 text-sm text-gray-500'> */}
              {/* <KeyRoundIcon size={16} strokeWidth={1.5} /> */}
              {/* <span>Access code</span>
                    <Lock
                    size={13}
                    strokeWidth={2}
                  /> */}
              {/* </div> */}
              {/* <div className='flex-grow border-t border-gray-300'></div> */}
              {/* </div> */}
              {/* <div className=''>
                <Input
                  id='accessCode'
                  type='accessCode'
                  placeholder='Enter your access code'
                  className='input-custom w-[450px]'
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value)
                  }}
                  required
                />
              </div> */}

              <div className='!mt-4 ml-2 grid grid-cols-2 text-gray-500'>
                <div
                  className={`flex items-baseline space-x-2 text-xs font-medium ${isStrongPassword ? 'text-[#00A76F]' : ''}`}
                >
                  <span className='mt-1.5'>•</span>
                  <span>Strong Password</span>
                </div>
                <div
                  className={`flex items-baseline space-x-2 text-xs font-medium ${doesNotContainName ? 'text-[#00A76F]' : ''}`}
                >
                  <span className='mt-1.5'>•</span>
                  <span>Does not contain name</span>
                </div>
                <div
                  className={`flex items-baseline space-x-2 text-xs font-medium ${containsDigit ? 'text-[#00A76F]' : ''}`}
                >
                  <span className='mt-1.5'>•</span>
                  <span>Contains atleast one digit</span>
                </div>
                <div
                  className={`flex items-baseline space-x-2 text-xs font-medium ${containsAlphabet ? 'text-[#00A76F]' : ''}`}
                >
                  <span className='mt-1.5'>•</span>
                  <span>Atleast one alphabet</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type='submit'
                className='button-custom mt-4 w-full !rounded-xl !bg-[#1877F2] !text-white'
              >
                Continue
              </Button>
            </CardFooter>
          </form>
        )}

        {/* Change state from this point */}
        {step === 2 && (
          <></>
          // <Onboarding />
          //     <form onSubmit={handleSubmitDetails} className='w-full'>
          //       <div className='mb-6'>
          //         <ProgressBar currentStep={step + 1} />
          //       </div>
          //       <CardHeader className='mb-4 text-center'>
          //         <CardTitle className='mb-2 text-2xl'>What do you do?</CardTitle>
          //         <CardDescription className='text-foreground-muted'>
          //           We will optimise Adoer accordingly for your best use
          //         </CardDescription>
          //       </CardHeader>
          //       <Select
          //         label='Select Occupation'
          //         onSelectionChange={(keys) => {
          //           const selectedKey = Array.from(keys)[0]
          //           handleRoleChange(selectedKey as string)
          //         }}
          //         classNames={{
          //           base: 'w-full',
          //           trigger: `
          //          mb-8 !rounded-xl !bg-background !outline-dashed !outline-offset-0
          // !outline-[#EDEDED]  px-4
          // !focus:outline-[#a5a5a5] focus:border-transparent  !border-none
          //         `
          //         }}
          //       >
          //         {occupationOptions.map((option) => (
          //           <SelectItem
          //             key={option.value}
          //             value={option.value}
          //             startContent={option.icon}
          //             className='w-full'
          //           >
          //             {option.label}
          //           </SelectItem>
          //         ))}
          //       </Select>

          //       <Select
          //         label='Where did you hear about us?'
          //         onSelectionChange={(keys) => {
          //           const selectedKey = Array.from(keys)[0]
          //           handleSourceClick(selectedKey as string)
          //         }}
          //         classNames={{
          //           base: 'w-full',
          //           trigger: `
          //          mb-8 !rounded-xl !bg-background !outline-dashed !outline-offset-0
          // !outline-[#EDEDED]  px-4
          // !focus:outline-[#a5a5a5] focus:border-transparent  !border-none
          //         `
          //         }}
          //       >
          //         {sourceOptions.map((option) => (
          //           <SelectItem
          //             key={option.value}
          //             value={option.value}
          //             startContent={option.icon}
          //             className='w-full'
          //           >
          //             {option.label}
          //           </SelectItem>
          //         ))}
          //       </Select>

          //       {/* <CardFooter> */}
          //       {/* <Button
          //           type='submit'
          //           className='button-custom mt-4 !w-full !rounded-xl !bg-[#1877F2] !text-white'
          //           // style={{ width: '100%' }}
          //         >
          //           Continue
          //         </Button> */}
          //       <Button
          //         type='submit'
          //         color='primary'
          //         className='button-custom !w-full'
          //         style={{
          //           borderRadius: '12px',
          //           backgroundColor: '#1877F2',
          //           color: 'white'
          //         }}
          //       >
          //         Continue
          //       </Button>
          //       {/* </CardFooter> */}
          //       {/* <CardHeader className='mb-2 text-center'>
          //         <CardTitle className='mb-2 text-2xl text-a-text-primary'>
          //           Your Professional Role
          //         </CardTitle>
          //         <CardDescription className='text-a-text-muted-900'>
          //           Please let us know what you currently do
          //         </CardDescription>
          //       </CardHeader>
          //       <CardContent className='space-y-4 p-6 pb-2 pt-2 xs:p-0 md:p-6'>
          //         <div className='grid grid-cols-3 gap-4 p-4 xs:grid-cols-1 md:grid-cols-3'>
          //           {cardsData.map((card) => (
          //             <UserTypeCard
          //               key={card.id}
          //               imageSrc={card.imageSrc}
          //               title={card.title}
          //               onSelect={handleSelectRole}
          //               isSelected={role === card.title}
          //             />
          //           ))}
          //         </div> */}
          //       {/* <div className=''>
          //           <Input
          //             ref={inputElement}
          //             autoFocus
          //             id='role'
          //             type='text'
          //             placeholder='Current Professional Role'
          //             className='input-custom w-[450px]'
          //             value={role}
          //             onChange={(e) => {
          //               setRole(e.target.value)
          //             }}
          //             required
          //           />
          //         </div> */}
          //       {/* <CardFooter>
          //         <Button type='submit' className='button-custom mt-4 w-full'>
          //           Take me to Dashboard
          //         </Button>
          //       </CardFooter> */}
          //     </form>
        )}
      </div>
    </>
  )
}
// const UserTypeCard = ({ imageSrc, title, onSelect, isSelected }: any) => {
//   return (
//     <div
//       onClick={() => onSelect(title)}
//       className={`card-container cursor-pointer rounded-lg border p-4 shadow-lg ${
//         isSelected
//           ? 'border-gray-300'
//           : 'border border-border bg-[#101010] opacity-75'
//       }`}
//     >
//       <div className='image-container mb-4 flex justify-center'>
//         <img src={imageSrc} alt={title} className='h-20 w-20 object-cover' />
//       </div>
//       <div className='text-center'>
//         <h3 className='card-title text-md font-semibold'>{title}</h3>
//       </div>
//     </div>
//   )
// }
