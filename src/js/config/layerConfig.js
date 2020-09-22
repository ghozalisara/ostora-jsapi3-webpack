define([
     "esri/layers/FeatureLayer",
    'esri/dijit/PopupTemplate'

], function (  FeatureLayer, PopupTemplate) {

    return {
        _layers: [],
        initLayers() {
            this._layers = [
                new FeatureLayer('http://services.arcgis.com/P8Cok4qAP1sTVE59/arcgis/rest/services/ALG_ADMLEVEL2/FeatureServer/0', {
                    title:  'algeria',
                    id:  'algeria',
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    outFields: ["*"],
                    infoTemplate: new PopupTemplate({
                        title: "{FIRST_NAME}",
                        description: "{FIRST_NAME}"
                    })
                })
            ]
            return this._layers;
        },
        getLayers() {
            return this._layers;
        }


    }
});