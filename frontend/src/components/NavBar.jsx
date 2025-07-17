import { UserButton } from '@clerk/clerk-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';


function NavBar() {
    const navigate = useNavigate();
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div  onClick={()=>navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-green-500 rounded-full" />
                <span className="font-semibold text-lg text-gray-800">GenAI Stack</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-white font-bold">
                <UserButton/>
            </div>
        </nav>
    );
}

export default NavBar