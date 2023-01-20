const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeLookup = {
  ".js": "application/javascript",
  ".html": "text/html",
};

http
  .createServer((req, res) => {
    if (req.method == "GET") {
      let fileurl;
      if (req.url == "/") {
        fileurl = "src/index.html";
      } else {
        fileurl = req.url;
      }
      let filepath = path.resolve("./" + fileurl);
      let fileExt = path.extname(filepath);
      let mimeType = mimeLookup[fileExt];
      if (mimeType === undefined) {
        return;
      }
      fs.exists(filepath, (exists) => {
        res.writeHead(200, { "Content-Type": mimeType });
        fs.createReadStream(filepath).pipe(res);
      });
    }
  })
  .listen(3000);
