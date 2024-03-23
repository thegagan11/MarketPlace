const db = require('../db/db');

class Booking {
    static async create({ listingId, clientId, scheduledFor }) {
        const { rows } = await db.query(
            'INSERT INTO bookings (listing_id, client_id, scheduled_for) VALUES ($1, $2, $3) RETURNING *',
            [listingId, clientId, scheduledFor]
        );
        return rows[0];
    }

    static async findByUserId(clientId) {
        const { rows } = await db.query('SELECT * FROM bookings WHERE client_id = $1', [clientId]);
        return rows;
    }

    static async updateStatus(bookingId, status) {
        const { rows } = await db.query(
            'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
            [status, bookingId]
        );
        return rows[0];
    }

    static async findByProviderId(providerId) {
        const { rows } = await db.query(
            'SELECT * FROM bookings WHERE provider_id = $1',
            [providerId]
        );
        return rows;
    }

    static async getAll() {
        const { rows } = await db.query('SELECT * FROM bookings');
        return rows;
    }


    
}



module.exports = Booking;
