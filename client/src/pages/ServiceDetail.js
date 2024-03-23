import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById, submitReview, getReviewsForListing } from '../api/apiServices';
import ReviewsDisplay from '../components/ReviewsDisplay'; // Adjust path as necessary
import SubmitReviewForm from '../components/SubmitReviewForm'; // Adjust path as necessary

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  const isAuthenticated = localStorage.getItem('token') !== null;

  useEffect(() => {
    const fetchServiceAndReviews = async () => {
      try {
        const serviceResponse = await getListingById(id);
        const reviewsResponse = await getReviewsForListing(id);
        if (serviceResponse.status === 200) setService(serviceResponse.data);
        if (reviewsResponse.status === 200) setReviews(reviewsResponse.data);
      } catch (err) {
        console.error("Error fetching service details or reviews:", err.message);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchServiceAndReviews();
  }, [id]);

  // Optional: Function to handle review submission, only if user is authenticated
  const handleReviewSubmit = async (reviewData) => {
    if (!isAuthenticated) {
      console.error('User must be logged in to submit a review');
      return;
    }
    try {
      await submitReview(id, reviewData);
      // Optionally, refresh the reviews to include the new submission
      const updatedReviews = await getReviewsForListing(id);
      setReviews(updatedReviews.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!service) return <div>Loading service details...</div>;

  return (
    <div>
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      {/* Include more details about the service as needed */}
      <ReviewsDisplay reviews={reviews} />
      {isAuthenticated && <SubmitReviewForm onReviewSubmit={handleReviewSubmit} />}
    </div>
  );
};

export default ServiceDetail;
