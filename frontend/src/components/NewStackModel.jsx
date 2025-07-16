import React, { useState } from 'react';

function NewStackModel({ isOpen, onClose }) {
 const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Stack</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-md px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              className="mt-1 block w-full border rounded-md px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={!name.trim()}
            className={`text-sm px-4 py-2 rounded-md ${name.trim()
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewStackModel