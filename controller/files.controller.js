const db = require("../db");

class FilesController {
  async createFile(req, res) {
    const {
      ownerId,
      type,
      fileName,
      fileDesc,
      uploadDate,
      fileUrl,
      previewUrl,
      lastModified,
      fileSize,
    } = req.body;
    let mSenddate = uploadDate || new Date();
    const newPost = await db.query(
      `INSERT INTO file_data (owner_id, data_type, file_name, file_description, upload_date, file_url, preview_url, last_modified, file_size) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        ownerId,
        type,
        fileName,
        fileDesc,
        mSenddate,
        fileUrl,
        previewUrl,
        lastModified,
        fileSize,
      ]
    );
    res.json(newPost.rows[0]);
  }

  async getFiles(req, res) {
    let { user_id, current, size, dataType } = req.query;
    size = size || 20;
    current = current || 1;
    console.log(user_id, current, size, dataType);
    dataType = dataType || "all";
    console.log(user_id, current, size, dataType);
    console.log("get Files");
    if (!user_id) {
      res.json({ count: 0, posts: [] });
    } else {
      console.log(
        `SELECT file_data.id, 
      owner_id, 
      data_type, 
      file_name,
      file_description,
      upload_date,
      file_url, 
      preview_url,
      last_modified  
FROM file_data 
WHERE owner_id = $1` +
          (dataType === "all" ? ` ` : ` and data_type = $4 `) +
          `ORDER BY id DESC LIMIT $2 OFFSET $3`
      );

      // console.log(user_id, current, size)
      const files = await db.query(
        `SELECT file_data.id, 
      owner_id, 
      data_type, 
      file_name,
      file_description,
      upload_date,
      file_url, 
      preview_url,
      last_modified  
FROM file_data 
WHERE owner_id = $1` +
          (dataType === "all" ? ` ` : ` and data_type = $4 `) +
          `ORDER BY id DESC LIMIT $2 OFFSET $3`,
        [user_id, size, (current - 1) * size, dataType]
      );

      const count = await db.query(
        `SELECT count(*) FROM file_data WHERE owner_id = $1`,
        [user_id]
      );
      // console.log("found ", posts.rows);
      console.log("files", files.rows);
      res.json({ count: count.rows[0].count, files: files.rows });
    }
  }

  async getOneFile(req, res) {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM posts WHERE user_id = ${id}`);
    res.json(user.rows[0]);
  }

  async updateFile(req, res) {
    const { id, user_id, posttext } = req.body;
    //console.log(id, user_id, posttext);
    const post = await db.query(
      `UPDATE posts set user_id = $1, posttext = $2 WHERE user_id = $3 RETURNING *`,
      [user_id, posttext, id]
    );
    res.json(post.rows[0]);
  }

  async deleteFile(req, res) {
    const id = req.params.id;
    const user = await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new FilesController();
