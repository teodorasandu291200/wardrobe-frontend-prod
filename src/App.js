import React, { useEffect, useState } from 'react';
import ClothesPage from './Pages/ClothesPage';
import Login from './components/Auth/Login';
import axios from 'axios';
import Register from './components/Auth/Register';
import TitleBar from './components/TitleBar';
import BottomNav from './components/BottomNav';
import { jwtDecode } from 'jwt-decode';
import './App.css'; // Ensure to import your CSS file
import SelectMenu from './components/SelectMenu';
import ClothingForm from './components/ClothingForm';
import CreateOutfitForm from './components/CreateOutfitForm';
import OutfitsPage from './Pages/OutfitsPage';

function App() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [activePage, setActivePage] = useState('Clothes');  // Default page

    // State for outfit creation
    const [isOutfitFormVisible, setIsOutfitFormVisible] = useState(false);
    const [selectedClothes, setSelectedClothes] = useState([]);
    
    const [showRegister, setShowRegister] = useState(false);
    const [clothes, setClothes] = useState([]);
    const [outfits, setOutfits] = useState([]);
    const [formType, setFormType] = useState(null);
    const [isChoiceVisible, setIsChoiceVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleForm = () => setShowRegister(!showRegister);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id); 
        }
    }, [token]); 

    const addClothingItem = async (newItem) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/`, newItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setClothes((prevClothes) => [...prevClothes, response.data]);
        } catch (error) {
            console.error('Error adding clothing item', error.response?.data || error.message);
            alert(`Error: ${error.response?.data || error.message}`);
        }
    };

    const saveOutfitToServer = async (outfitData) => {
        if (!userId) return;
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/outfits`,
                {
                    name: outfitData.name,
                    clothingItems: outfitData.clothingItems,
                    createdBy: userId
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setOutfits((prevOutfits) => [...prevOutfits, response.data]);
        } catch (error) {
            console.error('Error saving outfit:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data || error.message}`);
        }
    };

    useEffect(() => {
        if (!userId) return;
        const fetchClothes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/clothes/${userId}/clothes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClothes(response.data);
            } catch (error) {
                console.error('Error fetching clothes', error);
            }
        };
        fetchClothes();
    }, [token, userId]);

    const logout = () => {
        setToken(null);
        console.log("Logging out");
        localStorage.removeItem('token');
    };

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {!token ? (
                <>
                    {showRegister ? (
                        <>
                            <Register />
                            <p className="toggle-link" onClick={toggleForm}>
                                Already have an account? Log in
                            </p>
                        </>
                    ) : (
                        <>
                            <Login setToken={setToken} />
                            <p className="toggle-link" onClick={toggleForm}>
                                Don't have an account? Register
                            </p>
                        </>
                    )}
                </>
            ) : (
                <>
                    {/* Navbar (TitleBar) */}
                    <div style={{ flexShrink: 0 }}>
                        <TitleBar logout={logout} />
                    </div>

                    {/* Main Layout (Side Menu + Content) */}
                    <div style={{ display: 'flex', flex: 1, height: '100vh' }}>
                        {/* Sidebar (Side Menu) */}
                        <div style={{ width: "230px", height: "100vh", flexShrink: 0 }}>
                            <SelectMenu activePage={activePage} setActivePage={setActivePage} />
                        </div>

                        {/* Main Content */}
                        <div style={{ flexGrow: 1, overflow: 'auto', padding: '10px' }}>
                            <div className={`relative ${isChoiceVisible ? 'filter blur-sm' : ''}`}>

                                {/* Render the active page */}
                                {activePage === 'Clothes' && (
                                    <ClothesPage
                                        token={token}
                                        clothes={clothes}
                                        setClothes={setClothes}
                                        isModalVisible={isModalVisible}
                                        setIsModalVisible={setIsModalVisible}
                                    />
                                )}
                                {activePage === 'Outfits' && <OutfitsPage token={token} />}

                                {/* Global Modals */}
                                {formType === 'Add Clothes' && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
                                            <h3 className="text-xl font-bold mb-4">Add Clothes</h3>
                                            <ClothingForm token={token} addClothingItem={addClothingItem} />
                                            <button
                                                onClick={() => setFormType(null)}
                                                className="mt-4 w-full py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {isOutfitFormVisible && (
                                    <CreateOutfitForm
                                        clothes={clothes}
                                        setSelectedClothes={setSelectedClothes}
                                        onClose={() => setIsOutfitFormVisible(false)}
                                        onSave={saveOutfitToServer}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div style={{ flexShrink: 0 }}>
                        <BottomNav
                            token={token}
                            isChoiceVisible={isChoiceVisible}
                            setIsChoiceVisible={setIsChoiceVisible}
                            formType={formType}
                            setFormType={setFormType}
                            isOutfitFormVisible={isOutfitFormVisible}
                            setIsOutfitFormVisible={setIsOutfitFormVisible}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
