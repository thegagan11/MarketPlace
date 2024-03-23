const db = require('../db/db');


class Review {
    static async create({ listingId, reviewerId, rating, comment }) {
        const { rows } = await db.query(
            'INSERT INTO reviews (listing_id, reviewer_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
            [listingId, reviewerId, rating, comment]
        );
        return rows[0];
    }

    static async findByListingId(listingId) {
        const { rows } = await db.query('SELECT * FROM reviews WHERE listing_id = $1', [listingId]);
        return rows;
    }

    static async update(reviewId, { rating, comment }) {
        const { rows } = await db.query(
            'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *',
            [rating, comment, reviewId]
        );
        return rows[0];
    }

    static async delete(reviewId) {
        const { rows } = await db.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [reviewId]);
        return rows[0];
    }

    static async getAllReviews() {
        const { rows } = await db.query('SELECT * FROM reviews');
        return rows;
    }
}

module.exports = Review;
