const db = require("../db");
const uuid = require("uuid");

class UserController {
  async myLogin(req, res) {
    const { login, password } = req.body;
    // console.log()
    console.log(login, password);
    console.log("login");
    const thisUser = await db.query(
      `SELECT username, id, img, userstatus, password FROM users WHERE login = $1`,
      [login]
    );
    console.log(thisUser.rows[0]);
    if (thisUser.rows.length === 0) {
      res.json({ isLogined: false, reason: "wrong login" });
    } else {
      if (thisUser.rows[0].password === password) {
        const newToken = await db.query(
          `INSERT INTO user_tokens (user_id, user_token, creation_date) values ($1, $2, $3) RETURNING *`,
          [thisUser.rows[0].id, uuid.v4(), new Date()]
        );
        res.cookie("token", newToken.rows[0].user_token);
        console.log("cookie", newToken.rows[0].user_token);
        res.json({
          isLogined: true,
          id: newToken.rows[0].user_id,
          username: thisUser.rows[0].username,
          login: login,
          img: thisUser.rows[0].img,
          userstatus: thisUser.rows[0].userstatus,
        });
      } else {
        res.json({ isLogined: false, reason: "wrong password" });
        console.log("wrong pass", thisUser.rows[0].password, password);
      }
    }
  }
}

module.exports = new UserController();
