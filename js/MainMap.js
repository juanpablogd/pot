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
				layer.bindPopup(popupContent).bindLabel(popupContent);
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
			layer.bindPopup(popupContent).bindLabel(popupContent);
			layer.on({
		        click:	function (e) {
		        	//console.log(e.latlng.toString());
		        	//console.log("Click:" + layer.feature.id);		.bindLabel('Erghhhhh..')
				},
		   });

			
};

function onEachHidrografia(feature, layer) {
	var LabelHidro;
	if(feature.properties.nombre != null){
		LabelHidro = feature.properties.nombre;
	}else{
		LabelHidro = feature.properties.tipo;	
	};
	
	layer.bindLabel(LabelHidro);
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
		                        	"EEP"+
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
				layer.bindPopup(popupContent).bindLabel(popupContent);
}

/************************************ CONFIGURAR DATOS ************************************/
var getpredial=function(data){		//console.log("GetPredial");
	var load=1;
  	if(mymap.hasLayer(layerPredial)){		//console.log("remueve layer");
            mymap.removeLayer(layerPredial);
            ControlLayers.removeLayer(layerPredial);
            load=1;
    }
    if(data===undefined){
    	layerPredial = layerPredialAll;
    }else{
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
	}
	if (layerPredialAll===undefined){
		layerPredialAll = layerPredial;
	};	

	if(load==1){
		load=0;
		ControlLayers.removeLayer(layerPredial);
		if (filtradoPredial!=undefined) {
				mymap.addLayer(layerPredial);
				mymap.fitBounds(layerPredial.getBounds());
		}	
	}	//console.log(filtradoPredial);
	var html = 'Predial <button type="button"  onclick="ActivarFiltros(\'FilPREDIAL\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button> ';
	if(filtradoPredial==1) html = html + '<button type="button"  onclick="filtradoPredial=0;cargarCapaPredial()" id="btnLimpiarPred" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
	html = html + '<br><img src="img/Leyenda/Predial.png" style="position: relative;left: 15px;top: 4px;" height="24px"/>'; 								
	ControlLayers.addOverlay(layerPredial,html);
};

var getnodos=function(data){
	console.log("Funcion Nodos!!!");
	var load=1;	
  	if(mymap.hasLayer(layerEep)){
            mymap.removeLayer(layerEep);
            ControlLayers.removeLayer(layerEep);
            load=1;
    }
    if(data===undefined){
    	layerEep = layerEepAll;
    }else{
		layerEep = L.geoJson(data,{
			onEachFeature: onEachFeature,
			style: function(feature) {
				if (feature.properties.usos == "CLASES AGROLOGICAS I,II Y III" ) {
			    	return {color: "#a8a800"};
			    }else if (feature.properties.usos == "DMI" ) {
			    	return {color: "#38a800"};
			    }else if (feature.properties.usos == "RESERVA FORESTAL PRTOECTORA" ) {
			    	return {color: "#4c7300"};
			    }else if (feature.properties.usos == "RONDA" || feature.properties.usos == "RONDA EMBALSE" ) {
			    	return {color: "#97dbf2"};
			    }else if (feature.properties.usos == "SUELO URBANO" ) {
			    	return {color: "#636363"};
			    }else {
			    	return {color: "#a1d99b"};
			    }
		  	}
		});
	}
	if (layerEepAll===undefined){
		layerEepAll = layerEep;
	};	
	if(load==1){
		load=0;
		ControlLayers.removeLayer(layerEep);
		if (filtradoEep!=undefined){
			mymap.addLayer(layerEep); 
			mymap.fitBounds(layerEep.getBounds());
		}
	}	//console.log("filtradoEep: " + filtradoEep);
	
	var html = 'Estructura Ecológica Ppal. (EEP)  <button type="button"  onclick="ActivarFiltros(\'FilEEP\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>';
	if(filtradoEep==1) html = html + '<button type="button"  onclick="filtradoEep=0;cargarCapaEep()" id="btnLimpiarEep" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
						html = html + '<br><img src="img/Leyenda/leyendaEEP.png" style="position: relative;left: 15px;top: 4px;" height="60px"/>';
	ControlLayers.addOverlay(layerEep,html);

};
var getMot=function(data){		//console.log(data);
	var load=1;					//console.log("Está cargado? " + mymap.hasLayer(layerMot));
  	if(mymap.hasLayer(layerMot)){
            mymap.removeLayer(layerMot);
            ControlLayers.removeLayer(layerMot);
            load=1;
    }
    if(data===undefined){
    	layerMot = layerMotAll;
    }else{
		layerMot = L.geoJson(data,{
			onEachFeature: onEachMot,
			style: function(feature) {
				if (feature.properties.usos == "AGROPECUARIO TRADICIONAL" ) {
					return {color: "#ffebaf"};
				}else if (feature.properties.usos == "AREA DE EXPANSION" ) {
			    	return {color: "#ffd4e8"};
				}else if (feature.properties.usos == "CLASES AGROLOGICAS I,II Y III" ) {
			    	return {color: "#a8a800"};
				}else if (feature.properties.usos == "COLAS DEL MUÑA") {
			    	return {color: "#004da8"};
				}else if (feature.properties.usos == "CONSERVACION PRIORITARIA DE AGUA") {
			    	return {color: "#17a8e8"};
				}else if (feature.properties.usos == "CORREDOR ECOTURISTICO") {
			    	return {color: "#a3ff73"};
				}else if (feature.properties.usos == "CORREDOR INDUSTRIAL SUBURBANO") {
			    	return {color: "#c500ff"};
				}else if (feature.properties.usos == "CORREDOR SUBURBANO") {
			    	return {color: "#e69800"};
				}else if (feature.properties.usos == "CPR") {
			    	return {color: "#b2b2b2"};
				}else if (feature.properties.usos == "CULTIVOS BAJO INVERNADERO") {
			    	return {color: "#732600"};
				}else if (feature.properties.usos == "DMI") {
			    	return {color: "#38a800"};
				}else if (feature.properties.usos == "PARQUE ECOLOGICO" || feature.properties.usos == "RESERVA FORESTAL PRTOECTORA"  || feature.properties.usos == "RESERVA FORESTAL PROTECTORA") {
			    	return {color: "#4c7300"};
				}else if (feature.properties.usos == "RESIDENCIAL SUBURBANO" ) {
			    	return {color: "#ffff00"};
				}else if (feature.properties.usos == "RESTAURACION MORFOLOGICA" ) {
			    	return {color: "#ffa77f"};
				}else if (feature.properties.usos == "Suelo_Industria" || feature.properties.usos == "SUELO RURAL INDUSTRIAL") {
			    	return {color: "#df73ff"};
				}else if (feature.properties.usos == "URBANO" || feature.properties.usos == "SUELO URBANO") {
			    	return {color: "#525252"};
			    }else if (feature.properties.usos == "PROTECCIÓN" || feature.properties.usos == "PRTECCIÓN" || feature.properties.usos == "SUELO PROTECCION" || feature.properties.usos == "RFPP RIO BOGOTA") {
			    	return {color: "#a1d99b"};
			    }
		  	}
		});	//console.log("layerMot: " + layerMotAll);	//layerPredialAll,layerEepAll,layerMotAll
    }

	if (layerMotAll===undefined){
		layerMotAll = layerMot;
	};	//console.log("layerMot: " + layerMotAll);
	
	if(load==1){
		load=0;
		ControlLayers.removeLayer(layerMot);
		if (filtradoMot!=undefined){
			mymap.addLayer(layerMot);
			mymap.fitBounds(layerMot.getBounds());
		}
	}	//console.log("Load: " + load);
	var html = 'Modelo de Ordenamiento del Territorio. (MOT) <button type="button"  onclick="ActivarFiltros(\'FilMOT\')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>';
	if(filtradoMot==1) html = html + '<button type="button"  onclick="filtradoMot=0;cargarMot()" id="btnLimpiarMot" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
						html = html + '<br><img src="img/Leyenda/leyendaMOT.png" style="position: relative;left: 20px;top: 4px;" height="150px"/>';
	ControlLayers.addOverlay(layerMot,html);
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
		onEachFeature: onEachHidrografia,
		Style: StyleHidrografia
	});
	//console.log("Load: " + load);
	if(load==1){
		load=0;	
	}
	//console.log("Load: " + load);

	ControlLayers.addOverlay(layerHidrografia,'<img src="img/Leyenda/Hidro.png" height="24px" width="24px" /> Hidrografía');

};
var getLimiteMpio=function(data){
	var load=1;
  	if(mymap.hasLayer(layerLimiteMpio)){
            mymap.removeLayer(layerLimiteMpio);
            ControlLayers.removeLayer(layerLimiteMpio);
            load=1;
    }
	layerLimiteMpio = L.geoJson(data,{
	    style: StyleLimiteMpio
	});		//console.log("Load: " + load);
	if(load==1){
		mymap.addLayer(layerLimiteMpio);
		mymap.fitBounds(layerLimiteMpio.getBounds());
		load=0;	
	}
	ControlLayers.addOverlay(layerLimiteMpio,'<img src="img/Leyenda/LimMpio.png" height="24px" width="24px" /> Límite Municipal ');

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

	ControlLayers.addOverlay(layerVeredal,'<img src="img/Leyenda/LimVere.png" height="24px" width="24px" /> Límite Veredal');

};
var cargarCapaPredial=function(condicional){	//console.log(condicional); //&maxFeatures=50
	if(filtradoPredial==0 && layerPredialAll!==undefined){
		getpredial();
	}else{
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
	}
};
var cargarMot=function(condicional){	//console.log(condicional); //&maxFeatures=10
	if(filtradoMot==0 && layerMotAll!==undefined){
		getMot();
	}else{
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
	}
};

var cargarHidrografia=function(condicional){	//console.log(condicional); //&maxFeatures=50
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

var cargarLimiteMpio=function(condicional){		//console.log(condicional); //&maxFeatures=50
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
   
 var cargarCapaEep=function(condicional){	//console.log(condicional); //&maxFeatures=50
	if(filtradoEep==0 && layerEepAll!==undefined){
		getnodos();
	}else{
	    $.ajax({
          	url: "http://sofytek.com.co:8080/geoserver/pot/ows?"+
      		  "service=WFS&version=1.0.0&request=GetFeature"+
      		  "&typeName=pot:g_eep&outputFormat=text/javascript"+
      		  "&format_options=callback:getnodos",
      		  data:{
      		  	srsName:'EPSG:4326',
      		  	CQL_FILTER:condicional
      		  },
	          dataType: "jsonp",
	          jsonpCallback:'getnodos'
	     });
	}
};

cargarLimiteMpio();  
cargarLimiteVeredal();
cargarHidrografia();
cargarCapaPredial();
cargarMot();
cargarCapaEep();

var overlayMaps = { };

var ControlLayers=L.control.layers(baseMaps,overlayMaps).addTo(mymap);