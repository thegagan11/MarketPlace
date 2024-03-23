// // src/pages/ListingsPage.js
// import React, { useEffect, useState } from 'react';
// import { getAllListings } from '../api/apiServices';
// import ListingCard from '../components/ListingCard';

// const ListingsPage = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await getAllListings();
//         console.log("Fetched listings:", response.data);
//         setListings(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching listings:', err);
//         setError('Failed to load listings. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Service Listings</h2>
//       <div>
//         {listings.map(listing => {
//           console.log("Listing object in map:", listing);
//           return <ListingCard key={listing.id} listing={listing} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default ListingsPage;

// src/pages/ListingsPage.js
import React, { useEffect, useState } from 'react';
import { getAllListings } from '../api/apiServices';
import ListingCard from '../components/ListingCard';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data); // Adjust according to your API's response structure
        setLoading(false);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Service Listings</h2>
      <div>
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
