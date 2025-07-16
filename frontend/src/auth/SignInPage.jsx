import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
    return (
        <div className='justify-center items-center flex my-10'>
            <SignIn fallbackRedirectUrl={"/dashboard"} />
        </div>
    )
}

export default SignInPage