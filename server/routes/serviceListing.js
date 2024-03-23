// const express = require('express');
// const router = express.Router();
// // const authenticateToken = require('../middleware/authenticateToken');
// const { createListing, getListingById, updateListing, deleteListing } = require('../controllers/serviceController');
// const serviceController = require('../controllers/serviceController');

// router.post('/services', createListing);
// router.get('/services/:id', getListingById);
// router.put('/services/:id', updateListing); // Changed from GET to PUT for updating
// router.delete('/services/:id', deleteListing);


// router.post('/', authenticateToken(['provider', 'admin']), serviceController.createListing);
// router.put('/:id', authenticateToken(['provider', 'admin']), serviceController.updateListing);
// router.delete('/:id', authenticateToken(['provider', 'admin']), serviceController.deleteListing);



// module.exports = router;


const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const { createListing, getListingById, updateListing, deleteListing, getProviderListings, getAllListings, getUserListings } = require('../controllers/serviceController');

router.post('/services', authenticateToken, createListing);
router.get('/listings', getAllListings);
router.get('/services/:id', getListingById);
// router.get('/provider/listing', authenticateToken(['provider']), getProviderListings);
router.get('/provider/listing', authenticateToken, getProviderListings);

router.put('/services/:id', authenticateToken, updateListing);
router.delete('/services/:id', authenticateToken, deleteListing);

module.exports = router;
