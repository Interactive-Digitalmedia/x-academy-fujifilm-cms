import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { useEffect } from 'react'

type T = {
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
  errorMessage: boolean
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>
}
export default function InputOTPControlled({
  otp,
  setOtp,
  errorMessage,
  setErrorMessage
}: T) {
  useEffect(() => {
    if (otp.length <= 5) {
      setErrorMessage(false)
    }
  })

  return (
    <div className=''>
      <InputOTP
        className='min-w-full'
        maxLength={6}
        value={otp}
        onChange={(value) => setOtp(value)}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup className='w-full gap-3' autoFocus>
          <InputOTPSlot
            // className={`w-full ${otp.length === 6 && 'border-green-600'}`}
            className={`w-full font-bold ${
              otp.length === 6 ? 'outline-green-600' : ''
            } ${errorMessage ? 'text-[#F92B2B] outline-[#F92B2B]' : ''}`}
            autoFocus
            index={0}
          />
          <InputOTPSlot
            className={`w-full font-bold ${
              otp.length === 6 ? 'outline-green-600' : ''
            } ${errorMessage ? 'text-[#F92B2B] outline-[#F92B2B]' : ''}`}
            index={1}
          />
          <InputOTPSlot
            className={`w-full font-bold ${
              otp.length === 6 ? 'outline-green-600' : ''
            } ${errorMessage ? 'text-[#F92B2B] outline-[#F92B2B]' : ''}`}
            index={2}
          />
          {/* <InputOTPSeparator /> */}
          <InputOTPSlot
            className={`w-full font-bold ${
              otp.length === 6 ? 'outline-green-600' : ''
            } ${errorMessage ? 'text-[#F92B2B] outline-[#F92B2B]' : ''}`}
            index={3}
          />
          <InputOTPSlot
            className={`w-full font-bold ${
              otp.length === 6 ? 'outline-green-600' : ''
            } ${errorMessage ? 'text-[#F92B2B] outline-[#F92B2B]' : ''}`}
            index={4}
          />
          <InputOTPSlot
            className={`w-full font-bold ${
              otp.length === 6 ? 'outline-green-600' : ''
            } ${errorMessage ? 'text-[#F92B2B] outline-[#F92B2B]' : ''}`}
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
