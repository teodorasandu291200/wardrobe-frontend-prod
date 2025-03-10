import React, { useState, useEffect } from 'react';

const ClothingItem = ({ cloth, BASE_URL,  handleDelete, lastWorn, handleWornToday }) => {
    const [isWornToday, setIsWornToday] = useState(false);
    const imageUrl = `${BASE_URL}${cloth.file}`; // Construct image URL

    useEffect(() => {
        // Check if the item was worn today
        const today = new Date().toDateString();
        const lastWornDate = lastWorn ? new Date(lastWorn).toDateString() : null;
        setIsWornToday(lastWornDate === today);
    }, [lastWorn]);

    const handleClick = () => {
        handleWornToday(cloth._id); // Trigger the parent function with the item's ID
        setIsWornToday(true); // Optimistically update the button state
    };

    return (
        <li
            style={{
                border: '1px solid gray', // Green border if selected
                borderRadius: '40px',
                padding: '16px',
                backgroundColor: 'white', // Light green background if selected
                transition: 'all 0.3s ease', // Smooth transition for selection
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2
                    style={{ marginBottom: '10px' }}
                    className="text-xl font-bold text-black text-center"
                >
                    {cloth.name}
                </h2>
                {cloth.file ? (
                    <img
                        src={imageUrl}
                        alt={cloth.name}
                        style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                        //onClick={() => handleInClick(cloth._id)}
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <button type="button" className="mt-2 ml-1 bg-red-600 text-white border-none p-1 cursor-pointer rounded-md hover:bg-red-900"
                onClick={() => handleDelete(cloth._id)}
            
            >
                delete
            </button>
            {isWornToday ? (
                <button type="button" className="mt-2 ml-20 bg-green-600 text-white border-none p-1 cursor-disabled rounded-md">
                    saved
                </button>

            ) : (
                    <button type="button" className= "mt-2 ml-12 bg-red-600 text-white border-none p-1 cursor-pointer rounded-md hover:bg-red-900"
                        onClick={() => handleClick()}
                    >
                        worn it today!
                    </button>
                )}
           
        </li>
    );
};

export default ClothingItem;
