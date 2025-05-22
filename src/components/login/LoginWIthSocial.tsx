import { Button, Divider } from '@nextui-org/react'
// import FaceBookLogo from 'public/images/banner/logo/FacebookLogo.tsx'
// import GoogleLogo from 'public/images/banner/logo/Google.tsx'
// import PhoneLogo from 'public/images/banner/logo/PhoneLogo.tsx'
import * as React from 'react'
import axios from 'axios'
import { baseUrl } from '@/utils/config'

interface LoginWithSocialProps {}

const LoginWithSocial: React.FunctionComponent<LoginWithSocialProps> = () => {

    const handleGoogleLogin = async () => {
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
    <>
      <div className='my-1 flex items-center gap-2'>
        <Divider className='flex-1' />
        <span className='text-xs'>Or Continue with</span>
        <Divider className='flex-1' />
      </div>
      <div className='flex justify-between gap-3'>
        <Button isIconOnly className='w-full dark:bg-white'>
          {/* <FaceBookLogo /> */}
        </Button>
        <Button
          isIconOnly
          className='w-full'
          style={{
            backgroundColor: 'rgba(66, 133, 244, 1)',
            color: 'white'
          }}
          onPress={handleGoogleLogin}
        >
          <div className='rounded-full bg-white'>
            {/* <GoogleLogo width={20} /> */}
          </div>
        </Button>
        <Button isIconOnly className='w-full dark:bg-white'>
          {/* <PhoneLogo fill='black' /> */}
        </Button>
      </div>
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
}

export default LoginWithSocial
