const db = require('../db')

class UserController {
    async createUser(req, res) {
        const {userName, country, friends, userStatus, img} = req.body
        const newPerson = await db.query(`INSERT INTO users (userName, country, friends, userStatus, img) values ($1, $2, $3, $4, $5) RETURNING *`,
        [userName, country, friends, userStatus, img])
        res.json(newPerson.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM users`)
        res.json(users.rows)   
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM users WHERE id = ${id}`)
        res.json(user.rows[0])
    }

    async updateUser(req, res) {
        const {id, userName, country} = req.body
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