import React, { useEffect, useState } from 'react';
import { getUserFavorites } from '../api/apiServices'; // Adjust import path as needed
import ListingCard from '../components/ListingCard'; // Adjust import path as needed

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites();
        setFavorites(data.favorites); // Ensure the backend response structure is accounted for
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default FavoritesPage;
