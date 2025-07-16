import { SignUp } from '@clerk/clerk-react'
import React from 'react'

function SignUpPage() {
    return (
        <div className='justify-center items-center flex my-10'>
            <SignUp fallbackRedirectUrl={"/dashboard"} />
        </div>
    )
}

export default SignUpPage