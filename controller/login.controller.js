const db = require('../db')
const uuid = require('uuid')

class UserController {
    async myLogin(req, res) {
        const { login, pas } = req.body
        console.log()
        console.log(login, pas)
        const thisUser = await db.query(`SELECT username, id, img, userstatus, password FROM users WHERE login = $1`, [login])
        if (thisUser.rows.length === 0) {
            res.json({ isLogined: false, reason: 'wrong login' })
        } else {
            if (thisUser.rows[0].password = pas) {
                const newToken = await db.query(`INSERT INTO user_tokens (user_id, user_token, creation_date) values ($1, $2, $3) RETURNING *`,
                    [thisUser.rows[0].id, uuid.v4(), new Date()])
                res.cookie('token', newToken.rows[0].user_token)
                res.json({
                    isLogined: true,
                    id: newToken.rows[0].user_id,
                    username: thisUser.rows[0].username,
                    login: login,
                    img: thisUser.rows[0].img,
                    userstatus: thisUser.rows[0].userstatus,
                })
            } else {
                res.json({ isLogined: false, reason: 'wrong password' })   
            }

        }
    }

}

module.exports = new UserController()