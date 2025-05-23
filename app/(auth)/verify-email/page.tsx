import Link from "next/link"
import type { Metadata } from "next"
import { VerifyEmailForm } from "@/components/auth/verify-email-form"

export const metadata: Metadata = {
  title: "Verify Email - Pretty.af",
  description: "Verify your email address for your Pretty.af account",
}

export default function VerifyEmailPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
        <p className="text-sm text-muted-foreground">We've sent a verification code to your email address</p>
      </div>
      <VerifyEmailForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Didn't receive a code? <button className="underline underline-offset-4 hover:text-primary">Resend code</button>
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Back to login
        </Link>
      </p>
    </div>
  )
}
