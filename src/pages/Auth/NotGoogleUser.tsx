

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function NotGoogleUser() {
  const navigate=useNavigate()

  const handleRedirect = () => {
    navigate("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-lg"
      >
        <div className="bg-primary/10 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <AlertCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Account Already Exists</h1>
        </div>

        <div className="space-y-6 p-6">
          <p className="text-center text-muted-foreground">
            You've previously logged in with email and password. Unfortunately, you cannot log in with Google using the
            same email.
          </p>

          <Button
            onClick={handleRedirect}
            className="w-full rounded-lg py-6 text-base font-medium transition-all hover:shadow-md"
            size="lg"
          >
            Log in with your credentials
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Need help? Contact our <span className="cursor-pointer text-primary hover:underline">support team</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

