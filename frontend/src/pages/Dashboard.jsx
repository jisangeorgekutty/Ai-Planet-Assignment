import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import NewStackModel from '../components/NewStackModel';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />

            <div className="px-4 py-6">
                <div className="flex justify-between items-center mb-1">
                    <h1 className="text-2xl font-semibold text-gray-800">My Stacks</h1>
                    <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                        + New Stack
                    </button>
                </div>

                {/* Underline */}
                <div className="h-[1px] w-full max-w-[95%] mx-auto bg-gray-300 mb-5 mt-5" />

                <div className="flex justify-center mt-20">
                    <div className="bg-white rounded-xl shadow p-6 max-w-sm w-full text-center">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Create New Stack</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Start building your generative AI apps with our essential tools and frameworks
                        </p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                            + New Stack
                        </button>
                    </div>
                </div>
            </div>
            <NewStackModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Dashboard