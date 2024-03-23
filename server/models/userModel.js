const db = require('../db/db');


class User {
    static async findByEmail(email) {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
        return rows[0];
    }

    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ username, email, passwordHash, role = 'client' }) {
        const { rows } = await db.query(
            'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, passwordHash, role]
        );
        return rows[0];
    }

    static async updateProfile(id, { username, email, bio, profilePicture }) {
        const { rows } = await db.query(
            'UPDATE users SET username = $1, email = $2, bio = $3, profile_picture = $4 WHERE id = $5 RETURNING *',
            [username, email, bio, profilePicture, id]
        );
        return rows[0];
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM users');
        return rows;
      }
    
      static async updateRole(id, role) {
        const { rows } = await db.query(
          'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
          [role, id]
        );
        return rows[0];
      }
    
      static async deleteUser(id) {
        const { rows } = await db.query(
          'DELETE FROM users WHERE id = $1 RETURNING *',
          [id]
        );
        return rows[0];
      }


}



module.exports = User;
