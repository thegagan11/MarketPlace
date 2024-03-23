// // src/components/ListingCard.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ListingCard = ({ listing }) => {
//   console.log("ListingCard rendered with listing", listing.id);
//   const navigate = useNavigate();

//   const handleBookNow = () => {

//     console.log("Navigate to booking with listing id", listing.id);

//     console.log("Listing ID in handleBookNow:", listing?.id);
//     navigate(`/book/${listing.id}`);
//   };

//   return (
//     <div className="listing-card">
//       {listing.imageUrls && listing.imageUrls[0] && (
//         <img src={listing.imageUrls[0]} alt={listing.title} />
//       )}
//       <h3>{listing.title}</h3>
//       <p>{listing.description}</p>
//       <p>Price: ${listing.price}</p>
//       <button onClick={handleBookNow}>Book Now</button>
//     </div>
//   );
// };

// export default ListingCard;

// src/components/ListingCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../api/apiServices'; // Ensure this import is correct

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const [scheduledFor, setScheduledFor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDirectBooking = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Assuming createBooking accepts an object with listingId and scheduledFor properties
      await createBooking({ listingId: listing.id, scheduledFor });
      setIsLoading(false);
      alert('Booking successful!'); // Replace with a more sophisticated feedback mechanism as needed
      // navigate('/bookings/success'); // Optionally navigate to a success page or modal
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to book. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="listing-card">
      {listing.imageUrls && listing.imageUrls[0] && (
        <img src={listing.imageUrls[0]} alt={listing.title} />
      )}
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      <input
        type="datetime-local"
        value={scheduledFor}
        onChange={(e) => setScheduledFor(e.target.value)}
        required
      />
      <button onClick={handleDirectBooking} disabled={isLoading}>
        {isLoading ? 'Booking...' : 'Book Now'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ListingCard;
