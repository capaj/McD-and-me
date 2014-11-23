var glob = require('glob');
var files = glob.sync('./content/*');

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var contentPath = './content/';

var imageNumbers = files.map(function(name) {
  return parseInt(name.substr(contentPath.length));
});
imageNumbers.sort(function numOrdA(a, b){ return (a-b); });

module.exports = {
  /**
   * @param {Number} previous
   * @returns {data: {String}, id: {String}} object
   */
  getRand: function(previous) {
    if (previous === undefined) {
      previous = 0;
    }
    //var nextIndex = (imageNumbers.indexOf(previous) || previous) + 1;

    var nextNumber = (previous + 1);
    return fs.readFileAsync(contentPath + nextNumber + '.jpg', 'base64').then(function(data) {
      return {data:data.toString(), id: nextNumber};
    });
  },
  /**
   * @param {String} data base64 encoded image
   * @returns {Promise<Number>} id of the image
   */
  save: function(data) {
    var id = Math.max.apply(imageNumbers, imageNumbers) + 1;
    return fs.writeFileAsync( contentPath + id + ".jpg", new Buffer(data, "base64")).then(function(){
      console.log("image saved ", id);
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
