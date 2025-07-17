import React, { useEffect, useState } from 'react';
import NewStackModel from '../components/NewStackModel';
import StackCard from '../components/StackCard';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

function Dashboard() {
    const { user } = useUser();
    const userId = user?.id;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stacks, setStacks] = useState([]);
    const [editStackData, setEditStackData] = useState(null);

    console.log('edit stack data:', editStackData);

    useEffect(() => {
        if (userId) {
            fetchStacks();
        }
    }, [userId]);

    const fetchStacks = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/workflow/user-stacks?user_id=${userId}`);
            setStacks(res.data);
        } catch (err) {
            console.error('Failed to fetch stacks:', err);
        }
    };

    const hasStacks = stacks.length > 0;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="px-4 py-6">
                <div className="flex justify-between items-center mb-1">
                    <h1 className="text-2xl font-semibold text-gray-800">My Stacks</h1>
                    <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                        + New Stack
                    </button>
                </div>

                {/* Underline */}
                <div className="h-[1px] w-full max-w-[95%] mx-auto bg-gray-300 mb-5 mt-5" />
                {hasStacks ? (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {stacks.map((stack, index) => (
                            <StackCard key={index} title={stack.name} description={stack.description} onEdit={() => {
                                setEditStackData(stack);
                                setIsModalOpen(true);
                            }} />
                        ))}
                    </div>
                ) : (
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
                )}
            </div>
            <NewStackModel isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditStackData(null); }} userId={userId} editData={editStackData} onUpdate={fetchStacks} />
        </div>
    );
}

export default Dashboard