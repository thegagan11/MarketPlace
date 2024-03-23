const Booking = require('../models/bookingModel');

const createBooking = async (req, res) => {
    const { listingId, scheduledFor } = req.body;
    const clientId = req.user.id;

    try {
        const newBooking = await Booking.create({ listingId, clientId, scheduledFor });
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Server error');
    }
};

const getUserBookings = async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.findByUserId(userId);
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Server error');
    }
};

const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
        const updatedBooking = await Booking.updateStatus(bookingId, status);
        res.json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).send('Server error');
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAllBookings();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).send('Server error');
    }


};

const getProviderBookings = async (req, res) => {
    const providerId = req.user.id; // Assuming the provider's ID is stored in req.user.id

    try {
        const bookings = await Booking.findByProviderId(providerId);
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching provider bookings:', error);
        res.status(500).send('Server error');
    }
};


module.exports = {
    createBooking,
    getUserBookings,
    updateBookingStatus,
    getAllBookings,
    getProviderBookings
};
