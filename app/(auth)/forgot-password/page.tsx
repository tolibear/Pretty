import Link from "next/link"
import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password - Pretty.af",
  description: "Reset your Pretty.af account password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Forgot password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      <ForgotPasswordForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Back to login
        </Link>
      </p>
    </div>
  )
}
