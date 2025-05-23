import Link from "next/link"
import type { Metadata } from "next"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"

export const metadata: Metadata = {
  title: "Sign Up - Pretty.af",
  description: "Create a new account on Pretty.af",
}

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Join Pretty.af and start creating amazing images</p>
      </div>
      
      {/* Social Authentication - Primary */}
      <SocialAuthButtons />
      
      {/* Email Registration - Fallback */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>
      
      <SignUpForm />
      
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
      
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </p>
    </div>
  )
}
