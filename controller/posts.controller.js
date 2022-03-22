const db = require("../db");

class PostsController {
  async createPost(req, res) {
    const { userId, postText, likeCount } = req.body;
    const newPost = await db.query(
      `INSERT INTO posts (user_id, posttext, likecount) values ($1, $2, $3) RETURNING *`,
      [userId, postText, likeCount]
    );
    res.json(newPost.rows[0]);
  }

  async getPosts(req, res) {
    let { user_id, current, size } = req.query;
    size = size || 20;
    current = current || 1;
    // console.log("посты ", user_id, current, size)
    if (!user_id) {
      res.json({ count: 0, posts: [] });
    } else {
      // console.log(user_id, current, size)
      const users = await db.query(
        `SELECT id, user_id, posttext as text, likecount FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`,
        [user_id, size, (current - 1) * size]
      );
      const count = await db.query(
        `SELECT count(*) FROM posts WHERE user_id = $1`,
        [user_id]
      );
      // console.log("found ", users.rows);
      res.json({ count: count.rows[0].count, posts: users.rows });
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
