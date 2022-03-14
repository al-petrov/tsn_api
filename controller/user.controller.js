const db = require('../db')

class UserController {
    async createUser(req, res) {
        const { userName, country, friends, userStatus, img } = req.body
        // if (userName && country && !friends)
        const newPerson = await db.query(`INSERT INTO users (userName, country, friends, userStatus, img) values ($1, $2, $3, $4, $5) RETURNING *`,
            [userName, country, friends, userStatus, img])
        res.json(newPerson.rows[0])
    }

    async getUsers(req, res) {

        let cookie = req.cookies;
        
        console.log(cookie);
        if (cookie && !cookie.token) {
            res.cookie('token', 1);
            console.log('seted');
            console.log(cookie.token);
        } else {
            console.log(cookie.token);
        }
        // if (cookie === undefined) {
        //     res.cookie('token', 1);
        // }
        let { current, size } = req.query;
        size = size || 5;
        current = current || 1;
        const users = await db.query(`SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2`, [size, (current - 1) * (size)]);
        const count = await db.query(`SELECT count(*) FROM users`);
        res.json({ count: count.rows[0].count, users: users.rows });
    }

    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
        res.json(user.rows[0]);
    }

    async updateUser(req, res) {
        const { id, userName, country } = req.body
        console.log(id, userName, country)
        const user = await db.query(`UPDATE users set userName = $1, country = $2 WHERE id = $3 RETURNING *`, [userName, country, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query(`DELETE FROM users WHERE id = $1`, [id])
        res.json(user.rows[0])
    }

}

module.exports = new UserController()