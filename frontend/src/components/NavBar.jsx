import React from 'react'

function NavBar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full" />
                <span className="font-semibold text-lg text-gray-800">GenAI Stack</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-white font-bold">
                S
            </div>
        </nav>
    );
}

export default NavBar