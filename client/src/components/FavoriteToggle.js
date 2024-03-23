import React from 'react';
import { addToFavorites, removeFromFavorites } from '../api/apiServices'; // Adjust import path as needed

const FavoriteToggle = ({ listingId, isFavorited, onToggle }) => {
  const handleFavoriteClick = async () => {
    try {
      if (isFavorited) {
        await removeFromFavorites(listingId);
      } else {
        await addToFavorites(listingId);
      }
      onToggle(!isFavorited); // Update local UI state
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <button onClick={handleFavoriteClick}>
      {isFavorited ? '❤️' : '🤍'} {/* Simple visual feedback */}
    </button>
  );
};

export default FavoriteToggle;
