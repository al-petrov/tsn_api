const db = require("../db");

class PostsController {
  async createPost(req, res) {
    const { userId, postText, likeCount, date } = req.body;
    let mSenddate = date || new Date();
    const newPost = await db.query(
      `INSERT INTO posts (user_id, posttext, likecount, date) values ($1, $2, $3, $4) RETURNING *`,
      [userId, postText, likeCount, mSenddate]
    );
    res.json(newPost.rows[0]);
  }

  async getPosts(req, res) {
    let { user_id, current, size } = req.query;
    size = size || 20;
    current = current || 1;
    console.log("getPosts");
    if (!user_id) {
      res.json({ count: 0, posts: [] });
    } else {
      // console.log(user_id, current, size)
      const posts = await db.query(
        `SELECT posts.id, user_id, posttext as text, likecount, date, img as userImg 
        FROM posts LEFT JOIN users ON posts.user_id = users.id 
        WHERE user_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`,
        [
          // `SELECT id, user_id, posttext as text, likecount,  FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`,
          user_id,
          size,
          (current - 1) * size,
        ]
      );
      const count = await db.query(
        `SELECT count(*) FROM posts WHERE user_id = $1`,
        [user_id]
      );
      // console.log("found ", posts.rows);
      console.log("posts", posts.rows);
      res.json({ count: count.rows[0].count, posts: posts.rows });
    }
  }

  async getOnePost(req, res) {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM posts WHERE user_id = ${id}`);
    res.json(user.rows[0]);
  }

  async updatePost(req, res) {
    const { id, user_id, posttext } = req.body;
    //console.log(id, user_id, posttext);
    const post = await db.query(
      `UPDATE posts set user_id = $1, posttext = $2 WHERE user_id = $3 RETURNING *`,
      [user_id, posttext, id]
    );
    res.json(post.rows[0]);
  }

  async deletePost(req, res) {
    const id = req.params.id;
    const user = await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new PostsController();
