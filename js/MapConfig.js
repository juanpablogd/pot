/**
 * @author jpgarzon
 */
var zoomDiplay=12;//Zoom inical del mapa


/***********************************
 // CONFIGURACION DE MAPA
 ***********************************/
var southWest = L.latLng(-15, -90),
    northEast = L.latLng(15, -60),
    bounds = L.latLngBounds(southWest, northEast);
    
var mymap = L.map('map', {
    center: [4.50, -74.26],
    zoom: zoomDiplay
});
/***********************************/

var BMStreets=  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: ''
}).addTo(mymap);

var BMTopo=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: ''
});
var BMImagery=  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: ''
});
var MapQuest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
	attribution: '',
	subdomains: '1234'
});

var ggHybrid = new L.Google('HYBRID');
var ggStreets = new L.Google('ROADMAP');

var lyrbase=BMStreets;

var baseMaps = {
    "Calles": BMStreets,
    "Topografico": BMTopo,
    "Satelital": BMImagery,
    "OSM": MapQuest,
    "Google Calles":ggStreets,
    "Google Satelite":ggHybrid
};