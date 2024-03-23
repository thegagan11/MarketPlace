const db = require('../db/db');

class Favorite {
    static async addToFavorites(userId, listingId) {
        const { rows } = await db.query(
            'INSERT INTO user_favorites (user_id, listing_id) VALUES ($1, $2) RETURNING *',
            [userId, listingId]
        );
        return rows[0];
    }

    static async findByUserId(userId) {
        const { rows } = await db.query('SELECT * FROM user_favorites WHERE user_id = $1', [userId]);
        return rows;
    }

    static async removeFromFavorites(userId, listingId) {
        const { rows } = await db.query(
            'DELETE FROM user_favorites WHERE user_id = $1 AND listing_id = $2 RETURNING *',
            [userId, listingId]
        );
        return rows[0];
    }
    
        static async getAllFavorites() {
            const { rows } = await db.query('SELECT * FROM user_favorites');
            return rows;
        }
    }
     


module.exports = Favorite;
