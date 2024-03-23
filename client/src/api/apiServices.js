import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to retrieve the token from local storage
const getToken = () => localStorage.getItem('token');


// const authHeader = () => ({
//   headers: { Authorization: `Bearer ${getToken()}` },
// });

const authHeader = () => {
  const token = getToken();
  console.log("Token: ", token);
    return {
      headers: { Authorization: `Bearer ${token}` },
    };  
};

// Authentication
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const registerUser = async (userInfo) => {
  const response = await axios.post(`${API_URL}/api/users/register`, userInfo);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Service Listings
export const getAllListings = async () => {
  return await axios.get(`${API_URL}/api/servicelisting/listings`);
};

export const getListingById = async (id) => {
  return await axios.get(`${API_URL}/api/servicelisting/listings/${id}`);
};

// export const getListingById = async (id) => {
//   console.log(`Fetching listing with ID: ${id}`); // Temporary check
//   return await axios.get(`${API_URL}/api/servicelisting/listings/${id}`);
// };



export const createListing = async (listingData) => {
  return await axios.post(`${API_URL}/api/listings`, listingData, authHeader());
};

export const updateListing = async (id, listingData) => {
  return await axios.put(`${API_URL}/api/listings/${id}`, listingData, authHeader());
};

export const deleteListing = async (id) => {
  return await axios.delete(`${API_URL}/api/listings/${id}`, authHeader());
};

// User Profile
export const getUserProfile = async () => {
  console.log("getUserProfile");
  return await axios.get(`${API_URL}/api/users/profile`, authHeader());
};

export const updateUserProfile = async (userData) => {
  return await axios.put(`${API_URL}/api/users/profile`, userData, authHeader());
};

// Reviews
export const submitReview = async (listingId, rating, comment) => {
  return await axios.post(`${API_URL}/api/reviews`, { listingId, rating, comment }, authHeader());
};

export const getReviewsForListing = async (listingId) => {
  return await axios.get(`${API_URL}/api/reviews/listing/${listingId}`);
};

// Bookings
export const createBooking = async (bookingData) => {
  return await axios.post(`${API_URL}/api/bookings`, bookingData, authHeader());
};

// export const getUserBookings = async () => {
//   return await axios.get(`${API_URL}/api/bookings`, authHeader());
// };

export const getUserBookings = async () => {
  const response = await axios.get(`${API_URL}/api/bookings`, authHeader());
  return response.data; // Assuming your backend sends the bookings data directly
};



// Favorites
export const addToFavorites = async (listingId) => {
  return await axios.post(`${API_URL}/api/favorites`, { listingId }, authHeader());
};

export const getUserFavorites = async () => {
  return await axios.get(`${API_URL}/api/favorites`, authHeader());
};

export const removeFromFavorites = async (listingId) => {
  return await axios.delete(`${API_URL}/api/favorites/${listingId}`, authHeader());
};

// Admin functionalities
export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/api/admin/users`, authHeader());
};

export const updateUserRole = async (userId, role) => {
  return await axios.put(`${API_URL}/api/admin/users/${userId}/role`, { role }, authHeader());
};

export const deleteUser = async (userId) => {
  return await axios.delete(`${API_URL}/api/admin/users/${userId}`, authHeader());
};

export const getProviderListings = async () => {
  return await axios.get(`${API_URL}/api/servicelisting/provider/listing`, authHeader());
};


export const getProviderBookings = async () => {
  return await axios.get(`${API_URL}/api/bookings/provider/bookings`, authHeader());
};

export const getUserListings = async () => {
  return await axios.get(`${API_URL}/api/servicelisting/user/listings`, authHeader());
};
