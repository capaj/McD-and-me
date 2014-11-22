var glob = require('glob');
var files = glob.sync('./content/*');
var c = files.length; //serves as id for our pictures
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var contentPath = './content/';
/**
 * @param {String} data base64 encoded image
 */
module.exports = {
  getRand: function() {
    var pr = fs.readFileAsync( contentPath + '1.jpg', 'base64').then(function(data) {
      return data.toString();
    });
    return pr;
  },
  save: function(data) {
    c++;
    return fs.writeFileAsync( contentPath + c + ".jpg", new Buffer(data, "base64"));
  }
};
