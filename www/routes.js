module.exports = [
	{ route:'/', resolve: {templateUrl:'/templates/root.html'}},
	{ route:'/about', resolve: {templateUrl:'/templates/about.html'}},
	{ route:'/map', resolve: {templateUrl:'/templates/map.html', reloadOnSearch: false}},
	{ route:'/nearestMc', resolve: {templateUrl:'/templates/nearest.html', reloadOnSearch: false}},
	{ route:'/photo-rate', resolve: {templateUrl:'/templates/photo-rate.html', reloadOnSearch: false}},
	{ route:'/videochat', resolve: {templateUrl:'/templates/videochat.html', controller: 'videochatCtrl', reloadOnSearch: false}},
	{ route:'/photo-add', resolve: {templateUrl:'/templates/photo-add.html', reloadOnSearch: false}},
	{ route:'/settings', resolve: {templateUrl:'/templates/settings.html', reloadOnSearch: false}}

];