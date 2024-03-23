import React, { useEffect, useState } from 'react';
import { getReviewsForListing } from '../api/apiServices'; // Adjust path as needed

const ReviewsDisplay = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsForListing(serviceId);
        setReviews(response.data); // Make sure to adjust based on your actual API response
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [serviceId]);

  return (
    <div>
      <h3>Ratings</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating} / 5</p>
          </div>
        ))
      ) : (
        <p>No ratings yet.</p>
      )}
    </div>
  );
};

export default ReviewsDisplay;
