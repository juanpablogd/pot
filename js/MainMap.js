/**
 * @author jpgarzon
 *
 */

/**************************************
control de manejo de capas
*******************************************/
function onEachFeaturePredial(feature, layer) {
			var popupContent = '<div class="panel panel-primary">' +
								'<div class="panel-heading">'+
		                        	"Predial"+
		                        '</div>' +
		                            '<div class="panel-footer">' +
										'<small>Código Predial:</small> <b> ' +feature.properties.pre_cod + '<br></b>' +
										'<small>Área:</small> <b> ' +feature.properties.shape_area.toFixed(2)  + ' Mts2<br></b>' +
		                                '<small>Clasificación:</small>  <b>' + feature.properties.clasificac+ '<br></b>' +
		                            '</div>' +
		                        '</div>' +
		                    '</div>';

				if (feature.properties && feature.properties.popupContent) {
					popupContent += feature.properties.popupContent;
				}
			
				layer.on({
			        click:	function () {
			        	console.log("Click:" + layer.feature.id);
					}
			    });
				layer.bindPopup(popupContent);
}
function onEachFeature(feature, layer) {
		
		//console.log(layer.feature.id);
		//console.log(layer.feature.properties.usos);
		
			var popupContent = '<div class="panel panel-primary">' +
								'<div class="panel-heading">'+
		                        	"Estructura Ecológica Principal"+
		                        '</div>' +
		                            '<div class="panel-footer">' +
										'<small>Uso:</small> <b> ' +feature.properties.usos + '<br></b>' +
		                                '<small>Clasificación:</small>  <b>' + feature.properties.clasificac+ '<br></b>' +
		                            '</div>' +
		                        '</div>' +
		                    '</div>';

				if (feature.properties && feature.properties.popupContent) {
					popupContent += feature.properties.popupContent;
				}
			
				layer.on({
			        click:	function () {
			        	console.log("Click:" + layer.feature.id);
					}
			    });
				layer.bindPopup(popupContent);
}

var getpredial=function(data){
	//console.log(data);
	
	var loadp=1;
	console.log("Está cargado? " + mymap.hasLayer(layerPredial));
  	if(mymap.hasLayer(layerPredial)){
            mymap.removeLayer(layerPredial);
            ControlLayers.removeLayer(layerPredial);
            loadp=1;
    }
	layerPredial = L.geoJson(data,{
		onEachFeature: onEachFeaturePredial
	});
	console.log("Load: " + loadp);
	if(loadp==1){
		mymap.addLayer(layerPredial);
		mymap.fitBounds(layerPredial.getBounds());
		loadp=0;	
	}
	//console.log("Load: " + loadp);

	ControlLayers.addOverlay(layerPredial,'Predial  <button type="button"  onclick="ActivarFiltros(\'FilPREDIAL\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>');

};

var getnodos=function(data){
	//console.log(data);
	
	var load=1;
	console.log("Está cargado? " + mymap.hasLayer(layerEep));
  	if(mymap.hasLayer(layerEep)){
            mymap.removeLayer(layerEep);
            ControlLayers.removeLayer(layerEep);
            load=1;
    }
	layerEep = L.geoJson(data,{
		onEachFeature: onEachFeature
	});
	console.log("Load: " + load);
	if(load==1){
		//mymap.addLayer(layerEep);
		//mymap.fitBounds(layerEep.getBounds());
		load=0;	
	}
	console.log("Load: " + load);

	ControlLayers.addOverlay(layerEep,'Estructura Ecológica Ppal. (EEP)  <button type="button"  onclick="ActivarFiltros(\'FilEEP\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>');

};

 var cargarCapaPredial=function(condicional){
 		//console.log(condicional);
	    $.ajax({
          	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
      		  "service=WFS&version=1.0.0&request=GetFeature"+
      		  "&typeName=pot:g_predial&outputFormat=text/javascript"+
      		  "&format_options=callback:getpredial",
      		  data:{
      		  	srsName:'EPSG:4326',
      		  	CQL_FILTER:condicional
      		  },
	          dataType: "jsonp",
	          jsonpCallback:'getpredial'
	     });
  };
   
 var cargarCapaEep=function(condicional){
 		//console.log(condicional);
	    $.ajax({
          	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
      		  "service=WFS&version=1.0.0&request=GetFeature"+
      		  "&typeName=pot:g_eep&maxFeatures=500&outputFormat=text/javascript"+
      		  "&format_options=callback:getnodos",
      		  data:{
      		  	srsName:'EPSG:4326',
      		  	CQL_FILTER:condicional
      		  },
	          dataType: "jsonp",
	          jsonpCallback:'getnodos'
	     });
  };

cargarCapaPredial();  
cargarCapaEep();



var overlayMaps = { };

var ControlLayers=L.control.layers(baseMaps,overlayMaps).addTo(mymap);