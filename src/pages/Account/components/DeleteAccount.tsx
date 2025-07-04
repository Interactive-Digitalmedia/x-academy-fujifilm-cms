import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'
import { Spinner } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { deleteAccount } from '@/api/Auth'

export default function DeleteAccount() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDeleteAccount = async (reason: string) => {
    setLoading(true)

    try {
      await deleteAccount(reason)
      console.log('Account deleted successfully')
      toast.success('Account deleted successfully')
      navigate('/logout')
    } catch (err) {
      console.error('Error deleting account:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Card className='max-w-2xl border-red-600 bg-background'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>
              Delete Account
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 p-3 pt-0'>
            <p className='text-sm leading-relaxed'>
              Once you proceed, your Personal Account and all its contents will
              be permanently removed from Adoer. This action is{' '}
              <b>irreversible,</b> so please be absolutely certain before
              continuing.
            </p>
            <div className='flex justify-end'>
              <Button
                size='sm'
                className='border-red-400 bg-red-600 px-6 text-sm font-normal hover:bg-red-600'
                onClick={() => setOpen(true)}
              >
                Delete Personal Account
              </Button>
            </div>
          </CardContent>
          <ConfirmationModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        </Card>
      )}
    </>
  )
}
