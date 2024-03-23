import React, { useState } from 'react';
import { createListing } from '../api/apiServices'; // Ensure the import path is correct
import { useNavigate } from 'react-router-dom'; // If you're using React Router for navigation

const CreateListingForm = ({ onSuccess }) => {
    const [listingData, setListingData] = useState({
        title: '',
        description: '',
        price: '',
        availability: true,
    });
    const navigate = useNavigate(); // Used for navigation after form submission if needed

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListingData({ ...listingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createListing(listingData);
            onSuccess(); // Call the onSuccess callback function
            // navigate('/listings'); // Optionally navigate to listings page
        } catch (error) {
            console.error('Failed to create listing:', error);
            // Implement additional error handling if necessary
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={listingData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={listingData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={listingData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Availability:</label>
                <select
                    name="availability"
                    value={listingData.availability.toString()}
                    onChange={handleChange}
                    required
                >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>
            <button type="submit">Create Listing</button>
        </form>
    );
};

export default CreateListingForm;
