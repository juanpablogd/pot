/**
 * @author jpgarzon
 *
 */
var StyleLimiteMpio = {
	"fill":false,
    "color": "#1c9099",
    "weight": 1.5
};
var StyleVeredal = {
	"fill":false,
    "color": "#1c9099",
    "weight": 1
};
var StyleHidrografia = {
	"fill":false,
    "color": "##3182bd",
    "weight": 2
};
/*******************************************
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
function onEachMot(feature, layer) {
		var popupContent = '<div class="panel panel-primary">' +
							'<div class="panel-heading">'+
	                        	"Modelo de Ordenamiento del Territorio"+
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
};

function onEachHidrografia(feature, layer) {
		var popupContent = '<div class="panel panel-primary">' +
							'<div class="panel-heading">'+
	                        	"Modelo de Ordenamiento del Territorio"+
	                        '</div>' +
	                            '<div class="panel-footer">' +
									'<small>Tipo:</small> <b> ' +feature.properties.tipo + '<br></b>' +
	                                '<small>Nombre:</small>  <b>' + feature.properties.nombre+ '<br></b>' +
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

function onEachLimiteMpio(feature, layer) {
		console.log(layer.feature.id);
}

function onEachLimiteVeredal(feature, layer) {
		console.log(layer.feature.id);
}
function onEachFeature(feature, layer) {
		
		//console.log(layer.feature.id);
		//console.log(layer.feature.properties.usos);
		
			var popupContent = '<div class="panel panel-primary">' +
								'<div class="panel-heading">'+
		                        	"Hidrografía"+
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

/************************************ CONFIGURAR DATOS ************************************/
var getpredial=function(data){		//console.log("GetPredial");
	var load=1;
  	if(mymap.hasLayer(layerPredial)){		//console.log("remueve layer");
            mymap.removeLayer(layerPredial);
            ControlLayers.removeLayer(layerPredial);
            load=1;
    }
	layerPredial = L.geoJson(data,{
		onEachFeature: onEachFeaturePredial,
		style: function(feature) {
			if (feature.properties.clasificac == "URBANO" ) {
		    	return {color: "#636363"};
		    }else{
		    	return {color: "#bdbdbd"};
		    }
	  	}
	});
	if(load==1){
		load=0;
		if(filtrado==1){	//console.log("Aplica FILTRO");
			ControlLayers.removeLayer(layerPredial);
			mymap.addLayer(layerPredial);
			mymap.fitBounds(layerPredial.getBounds());
			/*var zoomActual=mymap.getZoom(); 
			mymap.setZomm(18);*/
		}	
	}
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
	//console.log("Load: " + load);
	if(load==1){
		load=0;	
	}
	//console.log("Load: " + load);

	ControlLayers.addOverlay(layerEep,'Estructura Ecológica Ppal. (EEP)  <button type="button"  onclick="ActivarFiltros(\'FilEEP\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>');

};
var getMot=function(data){	//console.log(data);
	var load=1;				//console.log("Está cargado? " + mymap.hasLayer(layerMot));
  	if(mymap.hasLayer(layerMot)){
            mymap.removeLayer(layerMot);
            ControlLayers.removeLayer(layerMot);
            load=1;
    }
	layerMot = L.geoJson(data,{
		onEachFeature: onEachMot,
		style: function(feature) {
			if (feature.properties.clasificac == "URBANO" ) {
		    	return {color: "#525252"};
		    }else if (feature.properties.clasificac == "RURAL" ) {
		    	return {color: "#969696"};
		    }else if (feature.properties.clasificac == "SUBURBANO" ) {
		    	return {color: "#cccccc"};
		    }else if (feature.properties.clasificac == "PROTECCIÓN" || feature.properties.clasificac == "PRTECCIÓN") {
		    	return {color: "#a1d99b"};
		    }
	  	}
	});
	//console.log("Load: " + load);
	if(load==1){
		load=0;
		if(filtrado==1){
			ControlLayers.removeLayer(layerMot);
			mymap.addLayer(layerMot);
			mymap.fitBounds(layerMot.getBounds());
		}
	}	//console.log("Load: " + load);
	ControlLayers.addOverlay(layerMot,'Modelo de Ordenamiento del Territorio. (MOT)  <button type="button"  onclick="ActivarFiltros(\'FilMOT\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>');
};
var getHidrografia=function(data){
	//console.log(data);
	var load=1;
	//console.log("Está cargado? " + mymap.hasLayer(layerMot));
  	if(mymap.hasLayer(layerHidrografia)){
            mymap.removeLayer(layerHidrografia);
            ControlLayers.removeLayer(layerHidrografia);
            load=1;
    }
	layerHidrografia = L.geoJson(data,{
		Style: StyleHidrografia
	});
	//console.log("Load: " + load);
	if(load==1){
		load=0;	
	}
	//console.log("Load: " + load);

	ControlLayers.addOverlay(layerHidrografia,'Hidrografía');

};
var getLimiteMpio=function(data){
	//console.log(data);
	
	var load=1;
  	if(mymap.hasLayer(layerLimiteMpio)){
            mymap.removeLayer(layerLimiteMpio);
            ControlLayers.removeLayer(layerLimiteMpio);
            load=1;
    }
	layerLimiteMpio = L.geoJson(data,{
	    style: StyleLimiteMpio
	});
	//console.log("Load: " + load);
	if(load==1){
		mymap.addLayer(layerLimiteMpio);
		mymap.fitBounds(layerLimiteMpio.getBounds());
		load=0;	
	}
	//console.log("Load: " + load);

	ControlLayers.addOverlay(layerLimiteMpio,'Límite Municipal');

};
var getLimiteVeredal=function(data){
	//console.log(data);
	
	var load=1;
  	if(mymap.hasLayer(layerVeredal)){
            mymap.removeLayer(layerVeredal);
            ControlLayers.removeLayer(layerVeredal);
            load=1;
    }
	layerVeredal = L.geoJson(data,{
		style: StyleVeredal
	});
	//console.log("Load: " + load);
	if(load==1){
		mymap.addLayer(layerVeredal);
		load=0;
	}
	//console.log("Load: " + load);

	ControlLayers.addOverlay(layerVeredal,'Límite Veredal');

};
var getnodos=function(data){
	var load=1;			//console.log("visible " + mymap.hasLayer(layerEep));
  	if(mymap.hasLayer(layerEep)){
            mymap.removeLayer(layerEep);
            ControlLayers.removeLayer(layerEep);
            load=1;
    }
	layerEep = L.geoJson(data,{
								onEachFeature: onEachFeature,
								style: function(feature) {
									if (feature.properties.clasificac != "EMBLASE" && feature.properties.clasificac != "EMBALSE") {
								    	return {color: "#a1d99b"};
								    }
							  	}
							  });
	//console.log("Load: " + load);
	if(load==1){
		load=0;
		if(filtrado==1){
			ControlLayers.removeLayer(layerEep);
			mymap.addLayer(layerEep);
			mymap.fitBounds(layerEep.getBounds());
		}
	}
	ControlLayers.addOverlay(layerEep,'Estructura Ecológica Ppal. (EEP)  <button type="button"  onclick="ActivarFiltros(\'FilEEP\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>');
};

 var cargarCapaPredial=function(condicional){
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
	          jsonpCallback:'getpredial',
		      error: function (xhr, ajaxOptions, thrownError) {
		        console.log(xhr.status);
		        console.log(thrownError);
		      }
	    });
  };
  
var cargarMot=function(condicional){	//console.log(condicional);
	    $.ajax({
          	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
      		  "service=WFS&version=1.0.0&request=GetFeature"+
      		  "&typeName=pot:g_mot&outputFormat=text/javascript"+
      		  "&format_options=callback:getMot",
      		  data:{
      		  	srsName:'EPSG:4326',
      		  	CQL_FILTER:condicional
      		  },
	          dataType: "jsonp",
	          jsonpCallback:'getMot'
	     });
};

var cargarHidrografia=function(condicional){	//console.log(condicional);
	waitingDialog.show('Cargando...');
    $.ajax({
      	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
  		  "service=WFS&version=1.0.0&request=GetFeature"+
  		  "&typeName=pot:g_hidrografia&outputFormat=text/javascript"+
  		  "&format_options=callback:getHidrografia",
  		  data:{
  		  	srsName:'EPSG:4326',
  		  	CQL_FILTER:condicional
  		  },
          dataType: "jsonp",
          jsonpCallback:'getHidrografia',
		      error: function (xhr, ajaxOptions, thrownError) {
		      	waitingDialog.hide();
		        console.log(xhr.status);
		        console.log(thrownError);
		      }
     }).done(function() {
			waitingDialog.hide();
	 });
};

var cargarLimiteMpio=function(condicional){	//console.log(condicional);
	    $.ajax({
          	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
      		  "service=WFS&version=1.0.0&request=GetFeature"+
      		  "&typeName=pot:g_limite_municipal&outputFormat=text/javascript"+
      		  "&format_options=callback:getLimiteMpio",
      		  data:{
      		  	srsName:'EPSG:4326',
      		  	CQL_FILTER:condicional
      		  },
	          dataType: "jsonp",
	          jsonpCallback:'getLimiteMpio'
	     });
};

var cargarLimiteVeredal=function(condicional){	//console.log(condicional);
	    $.ajax({
          	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
      		  "service=WFS&version=1.0.0&request=GetFeature"+
      		  "&typeName=pot:g_limite_veredal&outputFormat=text/javascript"+
      		  "&format_options=callback:getLimiteVeredal",
      		  data:{
      		  	srsName:'EPSG:4326',
      		  	CQL_FILTER:condicional
      		  },
	          dataType: "jsonp",
	          jsonpCallback:'getLimiteVeredal'
	     });
};
   
 var cargarCapaEep=function(condicional){	//console.log(condicional);
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

cargarLimiteMpio();  
cargarLimiteVeredal();
cargarHidrografia();
cargarCapaPredial();
cargarMot();
cargarCapaEep();

var overlayMaps = { };

var ControlLayers=L.control.layers(baseMaps,overlayMaps).addTo(mymap);