define([
], function () {

	return {
		menus: [
			//simple menu
			{
				type: 'simple',
				title: 'Example',
				icon: '',
				widgetLoadFn: callback => require(["../../app/widgets/example/example"], callback)
				// // widget: {
				// 	title:  'Example',
				// 	icon: '<i class="fa fa-clone"></i>',
				// 	
				// }
			},
			{
				type: 'dorpdown',
				title: 'drawTitleMenu',
				icon: '',
				submenus: [{
					title: 'drawTitle',
					title: 'drawTitle',
					icon: '<i class="fas fa-pencil-alt"></i>',
					widgetLoadFn: callback => require(["../../app/widgets/draw/draw"], callback)

				}]
			}
		]


	}
});