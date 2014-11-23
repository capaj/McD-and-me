var glob = require('glob');
var files = glob.sync('./content/*');

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var contentPath = './content/';

var imageNumbers = files.map(function(name) {
  return parseInt(name.substr(contentPath.length));
});

module.exports = {
  /**
   * @param {Number} previous
   * @returns {data: {String}, id: {String}} object
   */
  getRand: function(previous) {
    if (!previous) {
      previous = 1;
    }
    var nextIndex = (imageNumbers.indexOf(previous) || previous) + 1;

    return fs.readFileAsync(contentPath + imageNumbers[nextIndex] + '.jpg', 'base64').then(function(data) {
      return {data:data.toString(), id: nextIndex};
    });
  },
  /**
   * @param {String} data base64 encoded image
   * @returns {Promise<Number>} id of the image
   */
  save: function(data) {
    var id = imageNumbers.last + 1;
    return fs.writeFileAsync( contentPath + id + ".jpg", new Buffer(data, "base64")).then(function(){
       return id;
    });
  },
  /**
   *
   * @param id
   */
  getLikesFor: function(id) {

  }
};
