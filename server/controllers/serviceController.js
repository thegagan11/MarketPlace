const ServiceListing = require('../models/serviceListing');

const createListing = async (req, res) => {
    try {
        const newListing = await ServiceListing.create(req.body);
        res.json(newListing);
    } catch (error) {
        console.error('Error creating service listing:', error);
        res.status(500).send("Server error");
    }
};

const getAllListings = async (req, res) => {
    try {
        const listings = await ServiceListing.findAll();
        res.json(listings);
    } catch (error) {
        console.error('Error fetching all listings:', error);
        res.status(500).send("Server error");
    }
};

const getListingById = async (req, res) => {
    const { id } = req.params;

    try {
        const listing = await ServiceListing.findById(id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (error) {
        console.error('Error fetching listing by ID:', error);
        res.status(500).send("Server error");
    }
};

const updateListing = async (req, res) => {
    const { id } = req.params;
    const listingData = req.body;

    try {
        const updatedListing = await ServiceListing.update(id, listingData);
        res.json(updatedListing);
    } catch (error) {
        console.error('Error updating listing:', error);
        res.status(500).send("Server error");
    }
};

const deleteListing = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedListing = await ServiceListing.delete(id);
        res.json({ message: "Listing deleted successfully." });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).send("Server error");
    }
};

const getProviderListings = async (req, res) => {
    const providerId = req.user.id; // Assuming the provider's ID is stored in req.user.id

    try {
        const listings = await ServiceListing.findByProviderId(providerId);
        res.json(listings);
    } catch (error) {
        console.error('Error fetching provider listings:', error);
        res.status(500).send('Server error');
    }
};



module.exports = {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
    getProviderListings, 
   
};
