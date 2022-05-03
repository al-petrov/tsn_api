const db = require("../db");

class messagesController {
  async createMessage(req, res) {
    const { senderId, getterId, messagetext, senddate } = req.body;
    console.log("createMessage");
    if (senderId && getterId) {
      let mSenddate = senddate || new Date();
      const newMessage = await db.query(
        `INSERT INTO messages (sender_id, getter_id, messagetext, senddate) values ($1, $2, $3, $4) RETURNING *`,
        [senderId, getterId, messagetext, mSenddate]
      );
      console.log("messages", newMessage.rows[0]);
      res.json(newMessage.rows[0]);
    } else {
      res.json({});
    }
  }

  async getMessages(req, res) {
    console.log("getMessages");
    let { senderId, getterId, current, size } = req.query;
    size = size || 5;
    current = current || 1;
    // console.log("messages controller");
    if (senderId && getterId) {
      const messages = await db.query(
        `SELECT *
        FROM (SELECT 
          messages.id, 
          sender_id,
          getter_id,
          messagetext,
          senddate,
          usersend.username as sendername,
          userget.username as gettername
        FROM messages 
        LEFT JOIN 
          users as usersend 
          ON messages.sender_id = usersend.id 
        LEFT JOIN
          users as userget 
          ON messages.getter_id = userget.id 
        WHERE sender_id = $1 and getter_id = $2 OR sender_id = $2 and getter_id = $1
        ORDER BY id DESC LIMIT $3 OFFSET $4) as x
        ORDER BY senddate ASC`,
        [senderId, getterId, size, (current - 1) * size]
      );
      console.log(messages.rows);
      res.json(messages.rows);
    } else {
      res.json([]);
    }
  }

  async getOneMessage(req, res) {
    // const id = req.params.id;
    // console.log(`SELECT * FROM users WHERE id = ${id}`);
    // const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    // res.json(user.rows[0]);
  }

  async updateMessage(req, res) {
    // const { id, username, country, userstatus, img, login } = req.body;
    // // console.log(id, username, country, userstatus, img, login);
    // const user = await db.query(
    //   `UPDATE users set username = $1, country = $2, userstatus = $3, img = $4 WHERE id = $5 RETURNING *`,
    //   [username, country, userstatus, img, id]
    // );
    // // console.log(user.rows[0]);
    // res.json(user.rows[0]);
  }

  async deleteMessage(req, res) {
    // const id = req.params.id;
    // const user = await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    // res.json(user.rows[0]);
  }
}

module.exports = new messagesController();
