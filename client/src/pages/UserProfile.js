

import React, { useEffect, useState } from 'react';
import { getUserProfile, getUserBookings } from '../api/apiServices';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileData = await getUserProfile();
        setProfile(profileData);

        // Fetch user bookings
        const bookingsData = await getUserBookings();
        setBookings(bookingsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Bio: {profile.bio || 'Not provided'}</p>
      <p>Contact Number: {profile.contact_number || 'Not provided'}</p>
      <p>Address: {profile.address ? `${profile.address}, ${profile.city}, ${profile.state}, ${profile.country}, Postal Code: ${profile.postal_code}` : 'Not provided'}</p>
      <p>Profile Created: {profile.created_at ? new Date(profile.created_at).toLocaleDateString("en-US") : 'Unknown'}</p>

      <h3>Your Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              Booking on {new Date(booking.scheduledFor).toLocaleDateString()} - Listing ID: {booking.listingId}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings.</p>
      )}
    </div>
  );
};

export default UserProfile;
