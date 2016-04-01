//'<input type="text" class="form-control" id="InpClave" placeholder="Introduce la palabra Clave">'+
function ActivarFiltros(tipo){
	if(tipo=='FilEEP'){
		dialogInstance = BootstrapDialog.show({
	    type:'type-primary',
		title: 'Filtrar por Estructura Ecológica Principal',
	    message: '<div class="row col-sm-12"><div class="form-group col-sm-6">'+
				  '<select class="form-control" id="seleepfil">'+
				   	'<option value="usos">Por Uso</option>'+
					'<option value="clasificacid">Por Clasificación</option>'+
				  '</select>'+
				'</div>'+
				 '<div class="form-group col-sm-6">'+
				    	'<select class="form-control" id="selEEPvalor"></select>'+
				  '</div></div>',
		    buttons: [{
                label: 'Ejecutar',
                icon: 'glyphicon glyphicon-ok',
                cssClass: 'btn-primary',
                hotkey: 13, 
                action: function(dialogRef){
                		var clave = $('#seleepfil').val(); 			console.log(clave);
                		var seleccion = $('#selEEPvalor').val();	console.log(seleccion);
	                	if($.trim(seleccion) == '') {
		                    alert('Seleccione por favor!');
		                    return false;
		                }else{
							filtrado = 1;
		                	var condicional = clave + " ilike '%"+seleccion.toUpperCase()+"%'";
		                	cargarCapaEep(condicional);
		                 	dialogRef.close();
		                }
	                }
		        },{
		        	icon: 'glyphicon glyphicon-ban-circle',
			   		label: 'Close',
			        action: function(dialog) {dialog.close();}
			    }],
				onshown: function(dialogRef){
					CargarEppUsos ();
					if(!mymap.hasLayer(layerEep)){
						mymap.addLayer(layerEep);
					}
				 	$('#seleepfil').on('change', function (e) { 	//var optionSelected = $("option:selected", this);
					    var valueSelected = this.value;
					    if(valueSelected == 'usos'){
							CargarEppUsos ();
					    }else if(valueSelected == 'clasificacid'){
					    	CargarEppClasificac ();
					    }
					});
				}
		});
	}
	if(tipo=='FilPREDIAL'){
		dialogInstance = BootstrapDialog.show({
	    type:'type-primary',
		title: 'Filtrar por Predio',
	    message: '<div class="row col-sm-12"><div class="form-group col-sm-6">'+
				  '<select class="form-control" id="selpredfil">'+
				   	'<option value="pre_cod">Código catastral</option>'+
				  '</select>'+
				'</div>'+
				 '<div class="form-group col-sm-6">'+
				 		'<input type="text" class="form-control" id="selPREDvalor" placeholder="Introduce la palabra Clave">'+
				  '</div></div>',
		    buttons: [{
                label: 'Ejecutar',
                icon: 'glyphicon glyphicon-ok',
                cssClass: 'btn-primary',
                hotkey: 13, 
                action: function(dialogRef){
                		var clave = $('#selpredfil').val(); 		console.log(clave);
                		var seleccion = $('#selPREDvalor').val();	console.log(seleccion);
	                	if($.trim(seleccion) == '') {
		                    alert('Digite el Código Predial');
		                    return false;
		                }else{
							filtrado = 1;
		                	var condicional = clave + " ilike '%"+seleccion.toUpperCase()+"%'";
		                	cargarCapaPredial(condicional);
		                 	dialogRef.close();
		                }
	                }
		        },{
		        	icon: 'glyphicon glyphicon-ban-circle',
			   		label: 'Close',
			        action: function(dialog) {dialog.close();}
			    }],
				onshown: function(dialogRef){
					//cargarCapaPredial ();
					if(!mymap.hasLayer(layerPredial)){
						mymap.addLayer(layerPredial);
					}
				}
		});
	}
	if(tipo=='FilMOT'){
			dialogInstance = BootstrapDialog.show({
		    type:'type-primary',
			title: 'Filtrar por Modelo de Ordenamiento del Territorio (MOT)',
		    message: '<div class="row col-sm-12"><div class="form-group col-sm-6">'+
					  '<select class="form-control" id="selmotfil">'+
					   	'<option value="usos">Por Uso</option>'+
						'<option value="clasificac">Por Clasificación</option>'+
					  '</select>'+
					'</div>'+
					 '<div class="form-group col-sm-6">'+
					    	'<select class="form-control" id="selMOTvalor"></select>'+
					  '</div></div>',
			    buttons: [{
	                label: 'Ejecutar',
	                icon: 'glyphicon glyphicon-ok',
	                cssClass: 'btn-primary',
	                hotkey: 13, 
	                action: function(dialogRef){
	                		var clave = $('#selmotfil').val(); 			console.log(clave);
	                		var seleccion = $('#selMOTvalor').val();	console.log(seleccion);
		                	if($.trim(seleccion) == '') {
			                    alert('Seleccione por favor!');
			                    return false;
			                }else{
								filtrado = 1;
			                	var condicional = clave + " ilike '%"+seleccion.toUpperCase()+"%'";
			                	cargarMot(condicional);
			                 	dialogRef.close();
			                }
		                }
			        },{
			        	icon: 'glyphicon glyphicon-ban-circle',
				   		label: 'Close',
				        action: function(dialog) {dialog.close();}
				    }],
					onshown: function(dialogRef){
						CargarMotUsos ();
						if(!mymap.hasLayer(layerMot)){
							mymap.addLayer(layerMot);
						}
					 	$('#selmotfil').on('change', function (e) { 	//var optionSelected = $("option:selected", this);
						    var valueSelected = this.value;
						    if(valueSelected == 'usos'){
								CargarMotUsos ();
						    }else if(valueSelected == 'clasificac'){
						    	CargarMotClasificac();
						    }
						});
					}
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
