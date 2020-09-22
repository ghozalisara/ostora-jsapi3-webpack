define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "../../../app/widgets/example/example.html",
 
    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template,
 
    ) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
             
            startup() {
                this.inherited(arguments);

            }

        });
    });