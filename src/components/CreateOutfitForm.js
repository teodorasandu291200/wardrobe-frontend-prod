import React, { useState, useEffect } from 'react';

const CreateOutfitForm = ({ clothes, setSelectedClothes, onClose, onSave }) => {
    const [outfitItems, setOutfitItems] = useState([]); // Temporary state for selected items in the form
    const [outfitName, setOutfitName] = useState(''); // State to store the outfit name

    // Handle toggling of clothing items
    const toggleItem = (item) => {
        if (outfitItems.includes(item)) {
            setOutfitItems(outfitItems.filter((i) => i !== item));
        } else {
            setOutfitItems([...outfitItems, item]);
        }
    };

    const handleSave = () => {
        // Log the data to ensure the format is correct
        console.log('Outfit Data to Save:', {
            name: outfitName,
            clothingItems: outfitItems.map((item) => item._id),
        });
   
        // Now call onSave with the outfit data
        onSave({
            name: outfitName,
            clothingItems: outfitItems.map((item) => item._id),
        });
        onClose();
    };
   

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Create Your Outfit</h3>

                {/* Outfit name input */}
                <div className="mb-4">
                    <label className="font-semibold" htmlFor="outfitName">
                        Outfit Name:
                    </label>
                    <input
                        id="outfitName"
                        type="text"
                        className="w-full border border-gray-300 rounded py-2 px-3 mt-2"
                        placeholder="Enter outfit name"
                        value={outfitName}
                        onChange={(e) => setOutfitName(e.target.value)} // Update outfit name on change
                    />
                </div>

                {/* Display available clothes */}
                <div className="mb-4">
                    <h4 className="font-semibold">Available Clothes:</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {clothes.map((item) => (
                            <div
                                key={item._id} // Use item._id to uniquely identify
                                className={`p-2 border rounded ${outfitItems.includes(item) ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => toggleItem(item)} // Toggle selection
                            >
                                <img
                                    src={item.file} // Assuming each clothing item has an `image (the file with the image)` property
                                    alt={item.name}
                                    className="w-full h-24 object-cover rounded"
                                />
                                <p className="text-center text-sm mt-1">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save and Close Buttons */}
                <button
                    className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={handleSave} // Pass name and selected items to onSave
                >
                    Save Outfit
                </button>
                <button
                    onClick={onClose} // Close without saving
                    className="mt-4 w-full py-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CreateOutfitForm;
