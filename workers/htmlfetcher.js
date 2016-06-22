// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(urls) {
  urls.forEach(function(url) {
    archive.isUrlArchived(url, function(archived) {
      console.log(url);
      if (!archived) {
        archive.downloadUrls([url]);
      }
    });
  });
});
