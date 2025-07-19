import React, { useEffect, useState } from 'react'
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


function LandingPage() {
    const navigate = useNavigate();
    const { user, isLoaded, isSignedIn } = useUser();


    const handleGetStarted = () => {
        if (isLoaded && isSignedIn) {
            navigate('/dashboard')
        } else {
            navigate('/auth/sign-up');
        }
    }

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate("/dashboard");
        }
    }, [user, isLoaded, isSignedIn]);

    return (
        <div className="bg-[#022C43] text-white font-sans">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#022C43]">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/main-logo.jpg"
                            alt="AI Planet Logo"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xl font-semibold">Ai Planet</span>
                        <span className="text-xs text-white/60 -mt-1">formerly <span className='text-xs text-green-500'>DPhi</span></span>
                    </div>
                </div>

                <div className="hidden md:flex space-x-6 text-white/80 items-center">
                    <a href="#" className="hover:text-white flex items-center space-x-1">
                        <span>Products</span> <ChevronDown size={16} />
                    </a>
                    <a href="#" className="hover:text-white flex items-center space-x-1">
                        <span>Models</span> <ChevronDown size={16} />
                    </a>
                    <a href="#" className="hover:text-white flex items-center space-x-1">
                        <span>Solutions</span> <ChevronDown size={16} />
                    </a>
                    <a href="#" className="hover:text-white">Community</a>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-4 text-sm">
                    Contact Us
                </button>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center px-4 py-20">
                <h1 className="text-3xl md:text-5xl font-bold leading-snug">
                    Deploy <span className="text-yellow-300">GenAI Apps</span>
                    <br /> in minutes, not months.
                </h1>
                <p className="mt-4 text-white/70 max-w-xl">
                    Integrate reliable, private and secure GenAI solutions within your enterprise environment
                </p>
                <div className="mt-8 flex space-x-4">
                    <button onClick={handleGetStarted} className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100">
                        Get Started
                    </button>
                    <button className="bg-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700">
                        Book Demo
                    </button>
                </div>
            </section>

            {/* Benefits Section with background wrapper */}
            <section className="relative z-10">
                <div className="relative z-20 px-4 pb-10 md:px-20 flex flex-col items-center">
                    <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-4xl divide-y md:divide-y-0 md:divide-x divide-gray-700 bg-[#012636] rounded-2xl overflow-hidden text-center shadow-lg">
                        <div className="flex-1 px-6 py-8">
                            <h2 className="text-2xl font-semibold text-white">20x</h2>
                            <p className="text-sm text-white/70">Faster time to market</p>
                        </div>
                        <div className="flex-1 px-6 py-8">
                            <h2 className="text-2xl font-semibold text-white">upto 30x</h2>
                            <p className="text-sm text-white/70">Infra Cost Savings</p>
                        </div>
                        <div className="flex-1 px-6 py-8">
                            <h2 className="text-2xl font-semibold text-white">10x</h2>
                            <p className="text-sm text-white/70">Productivity Gains</p>
                        </div>
                    </div>
                </div>

                {/* White curved background starts behind bottom half */}
                <div className="absolute top-1/2 left-0 w-full h-1/2 bg-white z-0" />
            </section>

            {/* Footer note with dark text on white background */}
            <footer className="bg-white text-center py-6 text-gray-700 text-sm">
                Trusted by leading organizations and 300k+ global community
            </footer>
        </div>
    )
}

export default LandingPage