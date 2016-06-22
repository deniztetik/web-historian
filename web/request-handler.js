var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');


exports.handleRequest = function (req, res) {

  var site = req.url.split("/")[1];
  if(req.method === "GET"){
    if(req.url === "/"){
      renderFile("web/public/index.html", "text/html", site);
    } else {
      renderFile("archives/sites.txt", "text/plain", site);
    }
  } else if (req.method === "POST") {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function(data) {
      archive.addUrlToList(body.split("=")[1]);
      res.writeHead(302);
      res.end();
    })
  }


  ////// **************UTILS************** //////
  function renderFile (path, contentType, site){
    var content = '';
    fs.readFile(path, function(err, data){
      if (err) {
        console.error(err);
      }
      content += data;
      var sites = content.split("\n");
      if(site !== "" && sites.indexOf(site) === -1) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content);
      }
    });
  };
};
