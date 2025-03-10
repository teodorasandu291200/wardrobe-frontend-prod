import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ClothingForm({ token, addClothingItem }) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    if (typeof token !== 'string' || token.trim() === '') {
        console.log("This is the token: ", {token});
        console.error('Invalid token:', token);
        return;  // You can handle this error in a more user-friendly way depending on your use case.
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;  // Assuming the token contains the user ID    const userId = decodedToken.id; 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setFile(selectedFile);
    };


    const removeBackgroundClient = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            setLoading(true); // Show loading indicator

            // Send POST request to the backend to process the image
            const response = await axios.post(`${API_BASE_URL}/api/remove-background-test`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Expect binary data as response
            });

            // Step 1: Convert the binary data (Blob) to a File object
            const blob = new Blob([response.data], { type: 'image/png' });

            // Step 2: Optional: Show the processed image
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl); // Update the UI with the image

            // Step 3: Return the File object for further use
            return blob;
                
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Failed to remove the background. Please try again.');
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };

    const handleSubmit = async (e) => {  
        e.preventDefault(); // Ensure form submission doesn't trigger a page refresh

        // Check that all data is present
        if (!file || !name || !size || !color || !brand || !category) {
            alert('Please complete all fields before submitting.');
            return;
        };

        try {
            const backgroundRemovedImage = await removeBackgroundClient(file);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('size', size);
            formData.append('color', color);
            formData.append('brand', brand);
            formData.append('category', category);
            formData.append('file', backgroundRemovedImage);
            formData.append('user', userId)
            await addClothingItem(formData);
            alert('Clothing item added successfully!'); // Feedback to user

            setName(''); setSize(''); setColor(''); setBrand(''); setCategory(''); setFile(null); setImageUrl(null);  // Reset fields
        } catch (error) {
            console.error('Error uploading clothing item:', error);
            alert('Failed to upload item. Please try again.');
        }
        setStep(1); // Reset to step 1
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="add-clothing-item">
            <div className="form-container mx-auto w-full max-w-[600px] bg-white p-6 rounded-md">
                <form onSubmit={handleSubmit}>

                    {step === 1 && (
                        <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                placeholder="Name" className="w-full p-2 border rounded-md mb-4"
                            />
                            <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required
                                placeholder="Size" className="w-full p-2 border rounded-md mb-4"
                            />
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required
                                placeholder="Color" className="w-full p-2 border rounded-md mb-4"
                            />
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required
                                placeholder="Brand" className="w-full p-2 border rounded-md mb-4"
                            />
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required
                                placeholder="Category" className="w-full p-2 border rounded-md mb-4"
                            />
                            <button type="button" onClick={nextStep} className="btn-primary px-3 py-1 text-lg rounded-full">Next Step</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <p className="mb-4">Please prepare an image of the clothing item with a clear background. Avoid using hangers.</p>
                            <button type="button" onClick={prevStep} className="btn-secondary px-3 py-1 text-lg rounded-full">Previous</button>
                            <button type="button" onClick={nextStep} className="btn-primary px-3 py-1 text-lg rounded-full">Next Step</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <input type="file" onChange={handleFileChange} required
                                className="file-input mb-4" />
                            <button type="button" onClick={prevStep} className="btn-secondary px-3 py-1 text-lg rounded-full">Previous</button>
                            <button type="submit" className="btn-primary px-3 py-1 text-lg rounded-full">Submit</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ClothingForm;
