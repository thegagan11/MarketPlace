// const express = require('express');
// const router = express.Router();
// // const bookingsController = require('../controllers/bookingsController');

// const authenticateToken = require('../middleware/authenticateToken');

// router.post('/', authenticateToken, bookingsController.createBooking);
// router.get('/', authenticateToken, bookingsController.getUserBookings);
// router.put('/:bookingId', authenticateToken, bookingsController.updateBookingStatus);



// router.get('/provider/bookings', authenticateToken(['provider', 'admin']), bookingsController.getProviderBookings);
// router.put('/bookings/:bookingId/status', authenticateToken(['provider', 'admin']), bookingsController.updateBookingStatus);


// module.exports = router;

const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, updateBookingStatus, getProviderBookings } = require('../controllers/bookingsController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, createBooking);
router.get('/', authenticateToken, getUserBookings);
router.put('/:bookingId', authenticateToken, updateBookingStatus);
router.get('/provider/bookings', authenticateToken, getProviderBookings);
router.put('/bookings/:bookingId/status', authenticateToken, updateBookingStatus);

module.exports = router;
