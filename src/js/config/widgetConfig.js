define([
 ], function ( ) {

	return {
		menus: [
			//simple menu
			{
				type: 'simple',
				title:  'Example',
				icon: '',
				widgetLoadFn: callback => require(["../../app/widgets/example/example"], callback)
				// // widget: {
				// 	title:  'Example',
				// 	icon: '<i class="fa fa-clone"></i>',
				// 	
 				// }
			},
			//dropdown menuC:\Users\mohammedi.aicha\Desktop\harmoni\ostora3-webpack\src\app\widgets\draw\draw.html
			// {
			// 	type: 'dorpdown',
			// 	title:   'drawTitleMenu',
			// 	icon: '',
			// 	submenus: [{
			// 		title:   'drawTitle',
			// 		icon: '',
			// 		widget: {
			// 			title:   'drawTitle',
			// 			icon: '<i class="fas fa-pencil-alt"></i>',
			// 			path: 'ostora3-webpack/src/app/widgets/draw/draw'
			// 		}
			// 	}]
			// }
		]


	}
});