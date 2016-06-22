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
    cb(exists);
  })
};

exports.downloadUrls = function(urls){
  urls.forEach(function(url){
    var options = {
      host: url.parse(url).host,
      port: 80,
      path: url.parse(url).pathname
    };

    console.log(url.pathname);
    var file_name = paths.archivedSites + "/" + url;
  });
};
