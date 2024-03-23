import React, { useEffect, useState } from 'react';
import { getProviderListings } from '../api/apiServices';
import ListingCard from '../components/ListingCard';
import CreateListingForm from '../components/CreateListingForm'; // Make sure this import path is correct

const ProviderDashboard = () => {
    const [listings, setListings] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false); // Control the display of the CreateListingForm

    useEffect(() => {
        const fetchData = async () => {
            const listingsRes = await getProviderListings();
            setListings(listingsRes.data);
        };
        fetchData();
    }, []);

    // Function to toggle the create listing form display
    const toggleCreateForm = () => setShowCreateForm(!showCreateForm);

    // Function to be called after a listing has been successfully created
    const handleFormSuccess = () => {
        setShowCreateForm(false); // Hide the form
        // Optionally, refresh the listings here
    };

    return (
        <div>
            <h2>My Listings</h2>
            <button onClick={toggleCreateForm}>{showCreateForm ? 'Cancel' : 'Create New Listing'}</button>
            {showCreateForm && <CreateListingForm onSuccess={handleFormSuccess} />}
            <div>
                {listings.length > 0 ? (
                    listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
                ) : (
                    <p>You have no listings yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProviderDashboard;
