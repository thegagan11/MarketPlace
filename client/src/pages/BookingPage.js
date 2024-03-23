// src/pages/BookingPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { getListingById } from '../api/apiServices';

const BookingPage = () => {
  console.log("BookingPage rendered");
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // New state for error messages

  useEffect(() => {
    console.log("Fetching listing details for ID");
    console.log("Listing ID:", listingId);
    const fetchListingDetails = async () => {
      try {
        const response = await getListingById(listingId);
        console.log("Fetched listing details:", response.data);
        setListing(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch details for listing ID ${listingId}:`, error);
        setError('Failed to load service details. Please try again.'); // Set error message
        setLoading(false);
      }
    };

    if (listingId) {
      fetchListingDetails();
    }
  }, [listingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message if unable to fetch listing
  }

  return (
    <div>
      <h2>Book a Service</h2>
      {listing ? (
        <BookingForm listingId={listingId} onSuccess={() => alert('Booking successful!')} />
      ) : (
        <p>Failed to load service details for booking.</p>
      )}
    </div>
  );
};

export default BookingPage;
