import React from 'react'
import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignUp/>
    </div>
  )
}

export default SignUpPage