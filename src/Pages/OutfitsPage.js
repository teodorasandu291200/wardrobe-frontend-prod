import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const OutfitsPage = ({ token }) => {
    const [outfits, setOutfits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // User ID state

    useEffect(() => {
        // Decode the token to get the user ID (assuming the token contains a userId field)
        if (token) {
            const decodedToken = jwtDecode(token); // Use jwt-decode to extract user ID
            setUserId(decodedToken.id); // Set the userId from the token
        }
    }, [token]);

    // Fetch outfits from the backend using userId
    useEffect(() => {
        if (!userId) return; // Ensure userId is available before making the request

        const fetchOutfits = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/outfits/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOutfits(response.data); // Set the fetched outfits data
            } catch (error) {
                console.error('Error fetching outfits:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOutfits();
    }, [token, userId]); // Fetch outfits whenever token or userId changes

    if (loading) {
        return <p>Loading outfits...</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Outfits</h2>
            {outfits.length === 0 ? (
                <p>No outfits created yet. Start adding your outfits!</p>
            ) : (
                <div className="space-y-6">
                    {outfits.map((outfit) => (
                        <div
                            key={outfit._id}
                            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
                        >
                            <h3 className="text-lg font-semibold mb-2">{outfit.name || 'Unnamed Outfit'}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {(outfit.clothingItems || []).map((item) => (
                                    <div key={item._id} className="text-center">
                                        {item.file ? (
                                            <img
                                                src={`${API_BASE_URL}${item.file}`} 
                                                alt={item.name || 'Unnamed Item'}
                                                className="w-full h-32 object-cover rounded mx-auto"
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                        <p className="mt-2 text-sm">{item.name || 'Unnamed Item'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OutfitsPage;
