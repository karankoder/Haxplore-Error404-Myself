import React, { useState } from 'react';

const AddEventPopup = ({ onClose }) => {
    const [eventName, setEventName] = useState('');
    const [numSlots, setNumSlots] = useState(1);
    const [slotTimings, setSlotTimings] = useState([]);

    const handleAddEvent = () => {
        // Logic to add the event with provided details
        console.log({
            eventName,
            numSlots,
            slotTimings
        });

        // Close the popup
        onClose();
    };

    const handleNumSlotsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumSlots(value);
        setSlotTimings(Array.from({ length: value }, () => ({ startTime: '', endTime: '' })));
    };

    const handleSlotTimingChange = (index, field, value) => {
        const updatedSlotTimings = [...slotTimings];
        updatedSlotTimings[index][field] = value;
        setSlotTimings(updatedSlotTimings);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
            <div className="relative p-8 mx-auto my-4 bg-white rounded-lg w-96">
                <h2 className="mb-4 text-2xl font-semibold">Add Event</h2>
                <label className="block mb-4">
                    <span className="text-gray-700">Event Name:</span>
                    <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Number of Slots:</span>
                    <input type="number" value={numSlots} onChange={handleNumSlotsChange} className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </label>
                {slotTimings.map((slot, index) => (
                    <div key={index} className="space-y-2">
                        <label className="block">
                            <span className="text-gray-700">Start Time:</span>
                            <input type="text" value={slot.startTime} onChange={(e) => handleSlotTimingChange(index, 'startTime', e.target.value)} className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">End Time:</span>
                            <input type="text" value={slot.endTime} onChange={(e) => handleSlotTimingChange(index, 'endTime', e.target.value)} className="block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </label>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button onClick={handleAddEvent} className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Event</button>
                    <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Cancel</button>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto flex items-center flex-col py-8">
                <h1 className="text-3xl font-semibold mb-8">Admin Portal</h1>
                <button onClick={openPopup} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Event</button>
                {isPopupOpen && <AddEventPopup onClose={closePopup} />}
            </div>
        </div>
    );
};

export default App;
