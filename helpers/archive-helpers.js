var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var url = require('url');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(cb){
  var content = "";
  fs.readFile(paths.list, function(err, data) {
    if (err) {
      console.error(err);
    }
    content += data;
    var sites = content.split("\n");
    if(cb){
      cb(sites);
    }
  })
};

exports.isUrlInList = function(url, cb){
  readListOfUrls(function(urls){
    if (cb) {
      cb(urls.indexOf(url) !== -1);
    } else {
      return urls.indexOf(url) !== -1;
    }
  });
};

exports.addUrlToList = function(url, cb){
  fs.appendFile(paths.list, url + "\n", function (err) {
    if (err) {
      console.error("addsite error:", err);
    }
    if(cb){
      cb();
    }
  });
};

exports.isUrlArchived = function(url, cb){
  fs.exists(paths.archivedSites + "/" + url, function(exists){
    if (cb) {
      cb(exists);
    } else {
      return exists;
    }
  })
};

exports.downloadUrls = function(urls){
  urls.forEach(function(url){
    http.get('http://'+url,function(res){
      var body = '';
      res.on('data',function(d){
        body += d;
      });
      res.on('end', function(){
        fs.writeFile(paths.archivedSites + "/" + url, body, function(err) {
          if (err) {
            return console.error(err);
          }
        })
      });
    });
  });
};
