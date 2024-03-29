require('../../../public/main');
require('../../../public/built/ng-templates');

// Very basic unit test for a directive with template
describe('Directive: dummy', function() {
	beforeEach(angular.mock.module('app'));

	var element, scope;

	beforeEach(angular.mock.module('ngTemplates'));

	beforeEach(inject(function($rootScope, $compile) {
		element = angular.element('<dummy></dummy>');

		scope = $rootScope;

		$compile(element)(scope);
		scope.$digest();
	}));

	it("should include the template", function() {
		var tpl = element.find('.test');
		expect(element.html()).toBe('<div class="test"></div>');
	});
});

