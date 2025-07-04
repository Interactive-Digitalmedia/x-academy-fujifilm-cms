import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/button'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className='grid min-h-screen place-content-center'>
      <div>
        <h1 className='mb-8 text-5xl tracking-tighter'>404 Not found</h1>
        <div className='mx-auto max-w-max'>
          <Button
            onClick={() => {
              navigate('/')
            }}
            type='button'
            className='w-full rounded-sm bg-[#181818] font-medium text-white'
          >
            🏠 Back to home →
          </Button>
        </div>
      </div>
    </section>
  )
}
