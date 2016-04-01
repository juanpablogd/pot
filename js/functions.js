function CargarEppUsos (){
	  $("#selEEPvalor option").remove();
	  var flickerAPI = "http://sofytek.com.co/srvcs/pot/srv_eep_usos.php";
	  $.getJSON( flickerAPI, function(result){
	        $.each(result, function(i, field){
	            //console.log(field.usos);
	            $('#selEEPvalor').append('<option value="'+field.usos+'">'+field.usos+'</option>');
	        });
	    });
}
function CargarEppClasificac (){
	  $("#selEEPvalor option").remove();
	  var flickerAPI = "http://sofytek.com.co/srvcs/pot/srv_eep_clasificac.php";
	  $.getJSON( flickerAPI, function(result){
	        $.each(result, function(i, field){
	            $('#selEEPvalor').append('<option value="'+field.clasificacid+'">'+field.clasificac+'</option>');
	        });
	    });
}

function CargarMotUsos (){
	  $("#selMOTvalor option").remove();
	  var flickerAPI = "http://sofytek.com.co/srvcs/pot/srv_mot_usos.php";
	  $.getJSON( flickerAPI, function(result){
	        $.each(result, function(i, field){	//console.log(field.usos);
	            $('#selMOTvalor').append('<option value="'+field.usos+'">'+field.usos+'</option>');
	        });
	    });
}
function CargarMotClasificac (){
	  $("#selMOTvalor option").remove();
	  var flickerAPI = "http://sofytek.com.co/srvcs/pot/srv_mot_clasificac.php";
	  $.getJSON( flickerAPI, function(result){
	        $.each(result, function(i, field){
	            $('#selMOTvalor').append('<option value="'+field.clasificac+'">'+field.clasificac+'</option>');
	        });
	    });
}