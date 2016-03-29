
function ActivarFiltros(tipo){
	if(tipo=='FilEEP'){
		BootstrapDialog.show({
	    type:'type-success',
		title: 'Filtrar por Estructura Ecológica Principal',
	    message: '<div class="row col-sm-12"><div class="form-group col-sm-6">'+
				  '<select class="form-control" id="SltBuscar">'+
				   	'<option value="usos">Por Uso</option>'+
					'<option value="clasificac">Por Clasificación</option>'+
				  '</select>'+
				'</div>'+
				 '<div class="form-group col-sm-6">'+
				    '<input type="text" class="form-control" id="InpClave" placeholder="Introduce la palabra Clave">'+
				  '</div></div>',
		    buttons: [{
                label: 'Ejecutar',
                icon: 'glyphicon glyphicon-ok',
                cssClass: 'btn-success',
                hotkey: 13, 
                action: function(dialogRef){
                		var clave = dialogRef.getModalBody().find('input').val(); 		//console.log(clave);
                		var seleccion = dialogRef.getModalBody().find('select').val();	//console.log(seleccion);
	                	if($.trim(clave) == ''||$.trim(seleccion) == '') {
		                    alert('Ingrese alguna palabra Clave!');
		                    return false;
		                }else{
		                	var condicional = seleccion + " ilike '%"+clave.toUpperCase()+"%'";
		                	cargarCapaEep(condicional);
		                 	dialogRef.close();
		                }
	                }
		        },{
		        	icon: 'glyphicon glyphicon-ban-circle',
			   		label: 'Close',
			        action: function(dialog) {dialog.close();}
			    }]
		});
	}
}
//viewparams=p1:v1
function LimpiarFiltros(tipo){
	if(tipo=='FilCuadrante'){
		if(GetParams.getCuadrante!=''){
			GetParams.getCuadrante='';
			cargarCapa('Cuadrante');	
		}		
	}
	else if(tipo=='FilDitra'){
		if(GetParams.getDitra!=''){
			GetParams.getDitra='';
			cargarCapa('Ditra');	
		}		
	}else if(tipo=='FilMetroL'){
		if(GetParams.getMetroL!=''){
			GetParams.getMetroL='';
			cargarCapa('MetroL');	
		}		
	}else if(tipo=='FilFVS'){
		if(GetParams.getFVS!=''){
			GetParams.getFVS='';
			cargarCapa('FVS');	
		}		
	}
}
