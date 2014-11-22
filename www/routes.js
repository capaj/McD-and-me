module.exports = [
	{ route:'/', resolve: {templateUrl:'/templates/root.html'}},
	{ route:'/about', resolve: {templateUrl:'/templates/about.html'}},
	{ route:'/map', resolve: {templateUrl:'/templates/map.html', reloadOnSearch: false}},
	{ route:'/nearest', resolve: {templateUrl:'/templates/nearest.html', reloadOnSearch: false}},
	{ route:'/world', resolve: {templateUrl:'/templates/world.html', reloadOnSearch: false}},
	{ route:'/videochat', resolve: {templateUrl:'/templates/videochat.html', controller: 'videochatCtrl', reloadOnSearch: false}},
	{ route:'/settings', resolve: {templateUrl:'/templates/settings.html', reloadOnSearch: false}}

];