import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ClothingItem from '../components/ClothingItem';
import Fuse from 'fuse.js'; // For fuzzy search (optional)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BASE_URL = 'http://localhost:5000'; 

const ClothesPage = ({ token , clothes, setClothes,  isModalVisible, setIsModalVisible}) => {
    const [userId, setUserId] = useState(null); // Store userId in state

    const [selectedCloth, setSelectedCloth] = useState(null); 
    const [isPopupOpen, setIsPopupOpen] = useState(false); 

    const [searchQuery, setSearchQuery] = useState(''); // for filtering clothes
    const [filteredClothes, setFilteredClothes] = useState(clothes);


    useEffect(() => {
        // Decode the token and set the userId
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id); // Assuming the token contains the user ID in 'id'
        }
    }, [token]); // Run when the token changes


    // Function to handle deletion
    const handleDelete = async (clothId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/clothes/${clothId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the state to remove the deleted cloth from the list
            setClothes(clothes.filter((cloth) => cloth._id !== clothId));
            console.log(`Cloth with id ${clothId} has been deleted`);
        } catch (error) {
            console.error('Error deleting cloth', error);
        }
    };

    // Function to handle worn today
    const handleWornToday = async (clothId) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/clothes/${clothId}/wear`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
                // Update the specific clothing item's lastWorn in the state
                setClothes((prevItems) =>
                    prevItems.map((item) =>
                        item._id === clothId ? { ...item, lastWorn: response.data.lastWorn } : item
                    )
                );
            }
            console.log(`Cloth with id ${clothId} has been logged as work`);
        } catch (error) {
            console.error('Error logging cloth', error);
        }
    };


    useEffect(() => {
        // Filter clothes based on search query
        if (!searchQuery.trim()) {
            setFilteredClothes(clothes);
        } else {
            // Fuzzy Search with Fuse.js (for best match filtering)
            const fuse = new Fuse(clothes, {
                keys: ['name'], // Fields to search in
                threshold: 0.3, // Match sensitivity
            });

            const results = fuse.search(searchQuery).map((result) => result.item);
            setFilteredClothes(results);
        }
    }, [searchQuery, clothes]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle click and display popup
    const handleInClick = async (cloth) => {
        setSelectedCloth(cloth); // Set the clicked clothing item
        setIsPopupOpen(true); // Open the popup
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedCloth(null); // Clear the selected clothing data
    };


    return (
        <div>
            <main className="flex-grow pt-20 pb-5 bg-white min-h-screen">
            <div className="container mx-auto">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search clothes by name..."
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Clothing List */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {filteredClothes.length > 0 ? (
                            filteredClothes.map((cloth) => (
                                <ClothingItem
                                    key={cloth._id}
                                    cloth={cloth}
                                    BASE_URL={API_BASE_URL}
                                    handleDelete={handleDelete}
                                    lastWorn={cloth.lastWorn}
                                    handleWornToday={handleWornToday}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No items match your search.</p>
                        )}


                            {isModalVisible && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
                                        <h3 className="text-xl font-bold mb-4">Outfit Selection Completed!</h3>
                                        <button
                                            className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
                                        >
                                        Complete Outfit Selection
                                        </button>
                                        <button
                                        onClick={() => setIsModalVisible(false)} // Close the modal
                                        className="mt-4 w-full py-2 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
                                        >
                                        Close
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </main>

            {/* Popup for more details */}
            {isPopupOpen && selectedCloth && (
                <>
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999,
                        }}
                        onClick={() => setIsPopupOpen(false)}
                    />
                    <div 
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#fff',
                            padding: '40px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                            zIndex: 1000,
                            width: '20%',
                            maxWidth: '500px',
                        }}
                    >
                        <h2>{selectedCloth.name}</h2>
                        <img 
                            src={`${API_BASE_URL}${selectedCloth.file}`}
                            alt={selectedCloth.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '100px',
                                marginBottom: '20px',
                            }}
                        />
                        <p><strong>Size:</strong> {selectedCloth.size}</p>
                        <p><strong>Color:</strong> {selectedCloth.color}</p>
                        <p><strong>Brand:</strong> {selectedCloth.brand}</p>
                        <p><strong>Category:</strong> {selectedCloth.category}</p>
                        <button 
                            onClick={() => setIsPopupOpen(false)}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClothesPage;
