import {
  Card
  // CardHeader,
  // CardTitle,
  // CardDescription,
  // CardContent,
  // CardFooter,
} from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@nextui-org/button";
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function AcessCode() {
  const navigate = useNavigate()

  // if email doesn't exist in store, redirect
  // this can only happen in a scenario where the user manually puts in the url
  useEffect(() => {
    const email = sessionStorage.getItem('user_email')

    if (!email) navigate('/auth/register')
    return () => {}
  }, [navigate])

  const email = sessionStorage.getItem('user_email')

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <Card className='w-full max-w-md'>
        {/* <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter> */}
        <p className='p-4'>
          Your Access code will be sent to you on{' '}
          <span className='font-semibold'>{email}</span> shortly
        </p>
        <p className='mx-auto mb-4 max-w-max'>
          <Link to={'/'}>
            <Button variant='link'>🏠 Back to Home</Button>
          </Link>
        </p>
      </Card>
    </div>
  )
}
