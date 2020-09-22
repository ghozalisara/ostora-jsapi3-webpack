define([
    "require",
    "../js/config/widgetConfig",
    "../js/loader",
    "../app/header/header",
    "../app/aside/aside",
    "../app/widgets/example/example",
    "../app/widgets/widgetContainer"
], function (require, widgetConfig, loader, header, aside, example,widgetContainer) {

    return {
        startup: function (map) {

            //create an instance of header widget and add it's domNode (html code) to the documents in the #header element                 
            this.createHeaderWidget(map);

            //create an instance of aside widget and add it's domNode (html code) to the documents in the #main element       
            this.createAsideWidget(map);

            widgetConfig.menus.forEach((menu) => {
            
                if (menu.type == 'simple') {
                    //case of widget with a simple menu
                    this.simpleMenuWidget(menu, widgetContainer, map);

                } else if (menu.type == 'dorpdown') {
                    //case of widget with a dropdown menu
                    this.dropdownMenuWidget(menu, widgetContainer, map);
                }
            });
        },
        createHeaderWidget: function (map) {

            let headerWidget = new header();
            headerWidget.map = map; //this is added so the map can be accessed in the widget
            $('#header').append($(headerWidget.domNode));

            headerWidget.startup();
        },
        createAsideWidget: function (map) {

            let asideWidget = new aside();
            asideWidget.map = map; //this is added so the map can be accessed in the widget
            $('#main').append($(asideWidget.domNode));

            asideWidget.startup();
        },
        simpleMenuWidget: function (menuConfig, widgetContainer, map) {
            // In case of simple menu we only create a link without dropdown
            var menu = $('<li/>', {
                class: 'nav-item',
                html: '<a class="nav-link" href="#">' + menuConfig.icon + menuConfig.title + '</a>'

            }).appendTo('ul#menuList');
            this.createWidget(map, menuConfig, menu);

        },
        dropdownMenuWidget: function (menuConfig, widgetContainer, map) {

            // In case of dropdown menu we need to create a list and add links to widgets 
            var dropdown = $('<li/>', {
                class: 'nav-item dropdown',
                html: '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + menuConfig.icon + menuConfig.title + '</a>'

            }).appendTo('ul#menuList');

            var dropdownMenu = $('<div/>', {
                class: 'dropdown-menu',
                "aria-labelledby": "navbarDropdown",

            }).appendTo(dropdown);

            //loop throw submenus and create widgets            
            menuConfig.submenus.forEach((submenu) => {
                var menu = $('<a/>', {
                    class: 'dropdown-item',
                    href: "#",
                    html: submenu.icon + submenu.title

                }).appendTo(dropdownMenu);

                this.createWidget(map, submenu.widget, menu);
            });

        },
     

        createWidget(mapView, config, menu) {
            config.widgetLoadFn(Widget => {
                //create an instance of widgetcontainer for each widget and append the widget in it
                let widgetContainerCons = new widgetContainer();

                $(widgetContainerCons.domNode).find('.widgetTitle .widgetIcon')[0].innerHTML = config.icon;
                $(widgetContainerCons.domNode).find('.widgetTitle .widgetText')[0].innerHTML = config.title;

                let widgetCons = new Widget();
                let widgetNode = $(widgetCons.domNode);

                $(widgetContainerCons.domNode).find('.widgetBody').append(widgetNode);

                $('#main').append($(widgetContainerCons.domNode));

                // attach a click event on the menu to display the widget
                this.setMenuClick(menu, widgetContainerCons);

                widgetCons.mapView = mapView; //this is added so the mapView can be accessed in the widget
                widgetCons.startup();
                widgetContainerCons.startup();
            });
        },
        setMenuClick(menu, widgetContainerCons) {
            menu.click(function (e) {
                e.preventDefault();
                $(widgetContainerCons.domNode).show();
                if (widgetContainerCons.minimizedWidget) {
                    widgetContainerCons.restoreWidget();
                }
                //bring the widget to front clicked on its menu
                $('.widgetContainer').css('display', 'none');
                $(widgetContainerCons.domNode).css('display', 'block');
            });
        }
    }


});