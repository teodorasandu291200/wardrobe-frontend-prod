// src/components/BottomNav.js
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ClothingForm from './ClothingForm'

const BottomNav = ({ token, addClothingItem, isChoiceVisible, setIsChoiceVisible,  formType, setFormType, isOutfitFormVisible,setIsOutfitFormVisible  }) => {

    const openChoiceTab = () => {
        setIsChoiceVisible(true);
    };

    const closeChoiceTab = () => {
        setIsChoiceVisible(false);
        setFormType(null); // Reset the form type when closing
    };

    const handleAddClothes = () => {
        setFormType('Add Clothes'); // Set the form type based on user choice
        setIsChoiceVisible(false); // Close the choice tab
    };

    const handleCreateOutfit = () => {
        setFormType('Create Outfit'); // Set the form type based on user choice
        setIsChoiceVisible(false); // Close the choice tab
        setIsOutfitFormVisible(true)
      };

    return (
        <div className="relative">
            { /* Background Wrapper */}
            <div className={`${isChoiceVisible ? 'filter blur-sm' : ''}`}>
            {/* Navigation Bar */}
            <div className="fixed left-0 bottom-0 z-0 w-full h-16 bg-white border-t border-gray-200 dark:bg-[#1C6033]">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">

                    {/* First Icon Button */}
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-white dark:hover:bg-white group">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        className="w-6 h-6 fill-white group-hover:fill-[#1C6033] transition-colors duration-300"
                        >
                        <path fillRule="evenodd" d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                        <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                        </svg>
                            <span 
                                className="text-sm text-white group-hover:text-[#1C6033] transition duration-300"
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                                Wardrobe
                            </span>
                    </button>
                      

                    {/* Second Icon Button */}
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-white dark:hover:bg-white group">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            className="w-6 h-6 stroke-white group-hover:stroke-[#1C6033] transition-colors duration-300"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                            <span 
                                className="text-sm text-white group-hover:text-[#1C6033] transition duration-300"
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                                Care
                            </span>
                    </button>

                    {/* Central Main Attraction Button */}
                        <button
                            onClick={openChoiceTab}
                            type="button"
                            className="flex items-center justify-center w-16 h-16 mx-auto -mt-6 bg-[#1C6033] rounded-full shadow-lg hover:bg-[#2E4D3D]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-8 h-8 text-white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>


                    {/* Third Icon Button */}
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-white dark:hover:bg-white group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"  className="w-6 h-6 stroke-white group-hover:stroke-[#1C6033]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                            </svg>
                                <span 
                                    className="text-sm text-white group-hover:text-[#1C6033] transition duration-300"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    Impact
                                </span>
                        </button>

                    {/* Fourth Icon Button */}
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-white dark:hover:bg-white group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 stroke-white group-hover:stroke-[#1C6033]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                                <span 
                                    className="text-sm text-white group-hover:text-[#1C6033] transition duration-300"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                        
                                >
                                    Profile
                                </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Choice Tab Modal */}
            {isChoiceVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Choose an Action</h3>
                        <button
                            onClick={() => handleAddClothes()}
                            className="w-full py-2 text-[#1C6033] border border-[#1C6033] rounded hover:bg-[#1C6033] hover:text-white"
                        >
                            Add Clothes
                        </button>
                        <button
                            onClick={() => handleCreateOutfit()}
                            className="w-full py-2 text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white"
                        >
                            Create Outfit
                        </button>
                        <button
                            onClick={closeChoiceTab}
                            className="w-full py-2 text-gray-500 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BottomNav;
