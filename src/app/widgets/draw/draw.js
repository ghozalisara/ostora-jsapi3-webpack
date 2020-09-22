define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "../../../app/widgets/draw/draw.html",
 ],
function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    template,
 
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
         editedGraphic: null,

        startup: function () {
            this.inherited(arguments);
        
        }
    });


    
});