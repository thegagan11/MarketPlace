const db = require('../db/db');



class ServiceListing {
    static async create({ providerId, title, description, price, categoryId, availability, imageUrls = [], tags = [] }) {
        const { rows } = await db.query(
            'INSERT INTO service_listings (provider_id, title, description, price, category_id, availability, image_urls, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [providerId, title, description, price, categoryId, availability, imageUrls, tags]
        );
        return rows[0];
    }

    static async findByProviderId(providerId) {
        const { rows } = await db.query(
            'SELECT * FROM service_listings WHERE provider_id = $1',
            [providerId]
        );
        return rows;
    }


    static async findAll() {
        const { rows } = await db.query('SELECT * FROM service_listings');
        return rows;
    }

    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM service_listings WHERE id = $1', [id]);
        return rows[0];
    }

    static async update(id, { title, description, price, categoryId, availability, imageUrls, tags }) {
        const { rows } = await db.query(
            'UPDATE service_listings SET title = $1, description = $2, price = $3, category_id = $4, availability = $5, image_urls = $6, tags = $7 WHERE id = $8 RETURNING *',
            [title, description, price, categoryId, availability, imageUrls, tags, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await db.query('DELETE FROM service_listings WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }


    
        static async getAllListings() {
            const { rows } = await db.query('SELECT * FROM service_listings');
            return rows;
        }
}

module.exports = ServiceListing;
