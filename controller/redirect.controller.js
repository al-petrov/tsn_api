const db = require("../db");

class RedirectController {
  async redirectMe(req, res) {
    const id = req.params.id;
    res.header("Authorization", "Basic d2VidXNlcjoxMjM0NTZ5dHJld3E=");
    console.log(res);
    res.redirect("https://barabulka.site/webdav/" + id);
  }
}

module.exports = new RedirectController();
