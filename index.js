const express = require("express");
const userRouter = require("./routes/user.routes");
const postsRouter = require("./routes/posts.routes");
const loginRouter = require("./routes/login.routes");
const authRouter = require("./routes/auth.routes");
const messagesRouter = require("./routes/messages.routes");
const redirectRouter = require("./routes/redirect.routes");
const filesRouter = require("./routes/files.routes");
const cookieParser = require("cookie-parser");
const db = require("./db");
const proxy = require("express-http-proxy");

const PORT = process.env.PORT || 8080;

const app = express();

const cors = require("cors");

var myLoger = function (req, res, next) {
  let cookie = req.cookies;

  // console.log('isLogined = ' + cookie.token);
  if (cookie && (!cookie.token || !cookie.user_id)) {
    res.json({ isLogined: false });
  } else {
    const thisToken = db.query(
      `SELECT * FROM user_tokens WHERE user_id = ${id} ORDER BY creation_date DESC LIMIT 1`,
      [cookie.user_id]
    );
    if (cookie.token == thisToken.rows[0].user_token) {
      next();
    } else {
      res.json({ isLogined: false });
    }
  }
};

app.use(
  cors({
    credentials: true,
    origin: ["http://barabulka.site", "https://barabulka.site"],
    // origin: "http://barabulka.site",
  })
);
app.use(cookieParser());
app.use(express.json());
//app.use(myLoger)
// app.use(
//   "/redirect",
//   proxy("https://barabulka.site/webdav", {
//     proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
//       console.log("in proxy");
//       proxyReqOpts.headers = {
//         Authorization: "Basic d2VidXNlcjoxMjM0NTZ5dHJld3E=",
//       };
//       return proxyReqOpts;
//     },
//   })
// );
app.use("/api", redirectRouter);
app.use("/api", authRouter);
app.use("/api", filesRouter);
app.use("/api", loginRouter);
app.use("/api", userRouter);
app.use("/api", postsRouter);
app.use("/api", messagesRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
