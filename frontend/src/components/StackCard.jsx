import React from 'react'
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StackCard({ title, id, description, onEdit }) {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 w-full max-w-xs shadow-sm hover:shadow-md transition duration-200 mx-auto">
            <div className="flex flex-col justify-between h-full">
                <div onClick={() => navigate(`/dashboard/workflow/${id}`)} className='cursor-pointer'>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{description}</p>
                </div>
                <div className="flex justify-end">
                    <button onClick={onEdit} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100">
                        Edit Stack <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StackCard