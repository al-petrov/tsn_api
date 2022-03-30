const db = require("../db");

class UserController {
  async createUser(req, res) {
    const { userName, country, friends, userStatus, img } = req.body;
    // if (userName && country && !friends)
    const newPerson = await db.query(
      `INSERT INTO users (userName, country, friends, userStatus, img) values ($1, $2, $3, $4, $5) RETURNING *`,
      [userName, country, friends, userStatus, img]
    );
    res.json(newPerson.rows[0]);
  }

  async getUsers(req, res) {
    console.log("getUsers");
    let { current, size } = req.query;
    size = size || 5;
    current = current || 1;
    // console.log(size, current);
    const users = await db.query(
      `SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2`,
      [size, (current - 1) * size]
    );
    const count = await db.query(`SELECT count(*) FROM users`);
    res.json({ count: count.rows[0].count, users: users.rows });
  }

  async getOneUser(req, res) {
    const id = req.params.id;
    // console.log(`SELECT * FROM users WHERE id = ${id}`);
    const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(user.rows[0]);
  }

  async updateUser(req, res) {
    const { id, username, country, userstatus, img } = req.body;
    console.log("update user");
    if (id) {
      const existingUser = await db.query(
        `SELECT username, country, userstatus, img FROM users WHERE id = $1`,
        [id]
      );
      let myUser = existingUser.rows[0];
      const user = await db.query(
        `UPDATE users set username = $1, country = $2, userstatus = $3, img = $4 WHERE id = $5 RETURNING *`,
        [
          username || myUser.username,
          country || myUser.country,
          userstatus || myUser.userstatus,
          img || myUser.img,
          id,
        ]
      );
      // console.log(user.rows[0]);
      res.json(user.rows[0]);
    } else {
      res.json({});
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new UserController();
