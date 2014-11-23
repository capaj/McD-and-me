require('../app').directive('fileInput', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var parent = element.parent();
      var fInput = angular.element('<input type="file" accept="image/*" style="display: none"/>');
      var imgEl = angular.element('<img style="display: none"/>');
      parent.append(fInput);
      //parent.append(imgEl);

      fInput.change(function(){
        element.text($(this).val());
        var input = this;
        if ( input.files && input.files[0] ) {
          var FR = new FileReader();
          FR.onload = function(e) {
            //imgEl.attr( "src", e.target.result );
            var callback = scope.$eval(attrs.onFile);
            callback(e.target.result);
          };
          FR.readAsDataURL( input.files[0] );
        }
      });

      element.click(function(){
        fInput.click();
      });
    }
  }
});