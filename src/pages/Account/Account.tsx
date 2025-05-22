import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import { createOne } from '@/api/workspace/Api'
import useGlobalStore from '@/state/GlobalState'
import toast from 'react-hot-toast'
import DeleteAccount from './components/DeleteAccount'
import useDeviceDetect from '@/hooks/useDeviceDetect'

const Account = () => {
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(['0']))
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)
  const isMobile = useDeviceDetect()

  const { user } = useGlobalStore((state) => ({
    user: state.user
  }))

  const bearerToken = user?.token as string

  useEffect(() => {
    if (user?.googleUID) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [user?.googleUID])

  const handleCancel = () => {
    setSelectedKeys(new Set()) // Close all items by setting an empty Set
    setConfirmPassword('')
    setNewPassword('')
    setCurrentPassword('')
  }

  const validate = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!')
      return false
    }

    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault() // Prevent form submission

    if (validate()) {
      console.log('Validation is good')
      // Proceed with the form submission logic here

      const changePasswordUrl = `/profile/change-password`
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword
      }
      const response = await createOne(changePasswordUrl, bearerToken, payload)
      console.log(response)
      if (response.data.status === 200) {
        toast.success('Password updated!')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast.error(response.data.message)
      }
    } else {
      console.log('Validation failed')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev)
  }

  return (
    <div
      className={`space-y-6 ${isMobile && 'h-[69vh] overflow-y-auto px-2'} `}
    >
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      {/* <ProfileForm /> */}

      <div>
        <Accordion
          className={`rounded-md p-4 shadow-md ${disable ? 'cursor-not-allowed' : ''} bg-card`}
          variant='light'
          isCompact={true}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          isDisabled={disable}
        >
          <AccordionItem
            key='1'
            aria-label='Accordion 1'
            subtitle='Expand to change password'
            title='Change Password'
            className=''
          >
            <form onSubmit={handleSubmit}>
              <div className='relative mt-12 p-1'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='currentPassword'
                  placeholder='Current password'
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className='input-custom flex-1 pe-12'
                />
                <Button
                  type='button'
                  onClick={togglePasswordVisibility}
                  size='sm'
                  variant='ghost'
                  className='absolute right-1 top-1/2 -translate-y-1/2'
                >
                  {showPassword ? (
                    <EyeOff
                      size={16}
                      strokeWidth={1.5}
                      className='text-foreground-muted hover:text-[unset]'
                    />
                  ) : (
                    <Eye
                      size={16}
                      strokeWidth={1.5}
                      className='text-foreground-muted hover:text-[unset]'
                    />
                  )}
                </Button>
              </div>
              <div className='relative p-1'>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  name='newPassword'
                  placeholder='New password'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='input-custom mt-1 flex-1 pe-12'
                />
                <Button
                  type='button'
                  onClick={toggleNewPasswordVisibility}
                  size='sm'
                  variant='ghost'
                  className='absolute right-1 top-1/2 -translate-y-1/2'
                >
                  {showNewPassword ? (
                    <EyeOff
                      size={16}
                      strokeWidth={1.5}
                      className='text-foreground-muted hover:text-[unset]'
                    />
                  ) : (
                    <Eye
                      size={16}
                      strokeWidth={1.5}
                      className='text-foreground-muted hover:text-[unset]'
                    />
                  )}
                </Button>
              </div>

              <div className='relative p-1'>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='Confirm password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='input-custom mt-1 flex-1 pe-12'
                />
                <Button
                  type='button'
                  onClick={toggleConfirmPasswordVisibility}
                  size='sm'
                  variant='ghost'
                  className='absolute right-1 top-1/2 -translate-y-1/2'
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={16}
                      strokeWidth={1.5}
                      className='text-foreground-muted hover:text-[unset]'
                    />
                  ) : (
                    <Eye
                      size={16}
                      strokeWidth={1.5}
                      className='text-foreground-muted hover:text-[unset]'
                    />
                  )}
                </Button>
              </div>

              <div className='mt-[80px] flex justify-end space-x-4'>
                <Button
                  // variant='outline'
                  type='button'
                  className='border-none'
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type='submit' className=''>
                  Proceed to save
                </Button>
              </div>
            </form>
          </AccordionItem>
        </Accordion>
      </div>

      {user?.googleUID ? (
        <p className='text-muted-foreground'>
          You’ve logged in using Google. Password changes need to be managed
          through your Google account settings.
        </p>
      ) : (
        ''
      )}

      {/* Additional code */}
      <DeleteAccount />
    </div>
  )
}

export default Account
