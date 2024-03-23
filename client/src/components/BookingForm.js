// import React, { useState } from 'react';
// import { createBooking } from '../api/apiServices';

// const BookingForm = ({ listingId, onSuccess }) => {
//   const [scheduledFor, setScheduledFor] = useState('');
//   const [specialRequests, setSpecialRequests] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // New state for loading indication
//   const [error, setError] = useState(''); // New state for error messages

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true); // Indicate loading start
//     setError(''); // Reset error message
//     try {
//       await createBooking({
//         listingId,
//         scheduledFor,
//         specialRequests,
//       });
//       onSuccess(); // Invoke onSuccess callback
//       setIsLoading(false); // Reset loading state
//     } catch (error) {
//       console.error('Failed to create booking:', error);
//       setError('Failed to book the service. Please try again.'); // Set error message
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div>
//       {error && <p className="error">{error}</p>} {/* Display error message */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="scheduledFor">Date and Time:</label>
//           <input
//             type="datetime-local"
//             id="scheduledFor"
//             value={scheduledFor}
//             onChange={(e) => setScheduledFor(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="specialRequests">Special Requests:</label>
//           <textarea
//             id="specialRequests"
//             value={specialRequests}
//             onChange={(e) => setSpecialRequests(e.target.value)}
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Booking...' : 'Book Now'} {/* Update button text based on loading state */}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;

// src/components/BookingForm.js
import React, { useState } from 'react';
import { createBooking } from '../api/apiServices';

const BookingForm = ({ listingId, onSuccess }) => {
  const [scheduledFor, setScheduledFor] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await createBooking({
        listingId,
        scheduledFor,
        specialRequests,
      });
      setIsLoading(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to create booking:', error);
      setError('Failed to book the service. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="scheduledFor">Date and Time:</label>
          <input
            type="datetime-local"
            id="scheduledFor"
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="specialRequests">Special Requests:</label>
          <textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
