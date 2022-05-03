const db = require("../db");
const http = require("http"),
  httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

class RedirectController {
  async redirectMe(req, res) {
    const id = req.params.id;
    //req.setHeader("Authorization", "Basic d2VidXNlcjoxMjM0NTZ5dHJld3E=");
    //console.log(req);
    //console.log(res);
    proxy.web(req, res, {
      target: "https://barabulka.site/webdav/",
    });
    // req.setHeader("Authorization", "Basic d2VidXNlcjoxMjM0NTZ5dHJld3E=");
    console.log(
      "trying to proxy /webdav/",
      "https://barabulka.site/webdav/" + id
    );
    // res.redirect("https://barabulka.site/webdav/" + id);
  }
}

proxy.on("error", function (err, req, res) {
  console.log(err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Oops");
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.setHeader("Authorization", "Basic d2VidXNlcjoxMjM0NTZ5dHJld3E=");
});

proxy.on("proxyRes", function (proxyRes, req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
});

module.exports = new RedirectController();
