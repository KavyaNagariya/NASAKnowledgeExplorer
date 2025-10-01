'use client'

import Link from 'next/link'
import { stackServerApp } from '@/lib/stack'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignUp = () => {
    setIsLoading(true);
    // Redirect will happen via the Link component
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xl">🚀</span>
            </div>
            <span className="font-bold text-2xl">NASA Explorer</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Join the Journey</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <Link
            href="/handler/sign-up"
            onClick={handleSignUp}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium hover:opacity-90 transition-all"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Continue to sign up"
            )}
          </Link>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
