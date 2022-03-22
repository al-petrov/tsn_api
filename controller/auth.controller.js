const db = require("../db");
//const cookieParser = require('cookie-parser')

class AuthController {
  async authMe(req, res) {
    let cookie = req.cookies;

    // console.log('isLogined = ' + cookie.token);
    // console.log(typeof cookie.token)
    if (!cookie) {
      res.json({ isLogined: false });
    } else {
      if (!cookie.token) {
        res.json({ isLogined: false });
      } else {
        const thisToken = await db.query(
          `SELECT * FROM user_tokens WHERE user_token = $1 ORDER BY creation_date DESC LIMIT 1`,
          [cookie.token]
        );
        if (
          thisToken.rowCount > 0 &&
          cookie.token == thisToken.rows[0].user_token
        ) {
          //   console.log("user NEW TOKEN ", thisToken.rows[0].user_id);
          const user = await db.query(
            `SELECT id, username, login, img, userstatus FROM users WHERE id = $1`,
            [thisToken.rows[0].user_id]
          );
          res.json({ isLogined: true, ...user.rows[0] });
        } else {
          res.json({ isLogined: false });
        }
      }
    }
  }
}

module.exports = new AuthController();
