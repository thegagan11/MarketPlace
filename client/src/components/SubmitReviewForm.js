import React, { useState } from 'react';
import { submitReview } from '../api/apiServices'; // Adjust path as needed

const SubmitReviewForm = ({ serviceId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(serviceId, rating);
      // Optionally, clear the form or give feedback
      onReviewSubmitted(); // Callback to refresh the reviews list or provide user feedback
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Rating</button>
    </form>
  );
};

export default SubmitReviewForm;
