$(function()
{
	var Dim=0,
		Niv=0;
	var Rango=0;
	$('#Dimension').change(function(){
		Dim = $('#Dimension').val();
		IniSudoku();
	});

	$('#Nivel').change(function(){
		Niv = $('#Nivel').val();
		IniSudoku();
	});

	

	function IniSudoku(){
		
		if(Dim !== 0 && Niv !== 0){
			Rango = Dim*Dim;
			newSudoku = sudokuJS.creaSudoku(Dim,Niv), 
    		sudoku    = newSudoku.sudokujs, 
    		respuesta = newSudoku.respuesta;
		}else{
			Rango=9;
			newSudoku = sudokuJS.creaSudoku(), 
    		sudoku    = newSudoku.sudokujs, 
    		respuesta = newSudoku.respuesta;
		}
		 DibujaSudoku();
	}IniSudoku();
	


    function DibujaSudoku (){

       var tds = `<table>
                    <tbody>`;
    	for (var i = 0; i < sudoku.length; i++) {
    		tds += '<tr>';
    		for (var j = 0; j < sudoku[i].length; j++) {
    				tds += `<td> <table id="MyTable">
                    <tbody>`;
    			for (var c = 0; c < sudoku[i][j].length; c++) {
    				tds += '<tr>';
    				for (var f = 0; f < sudoku[i][j][c].length; f++) {
    					if(sudoku[i][j][c][f]===0){
			            tds += '<td class="td"><input type="number"  id=id_'+i+j+c+f+'></td>'
			          }else{
			            tds += '<td align="center" class="td">'+sudoku[i][j][c][f]+'</td>';
			          }
    				};
    				tds += '</tr>';
    			};
    			tds += `</tbody>
              </table> </td>`;
    		};
    		tds += `</tr>`;
    	};
    		tds += `</tbody>
              </table>`;
			$("#Juego").html(tds);

	$("input").keyup(function() {
          var oID = $(this).attr("id");
          console.log(oID);
          valida(oID);
          validaFinDeJuego();


	});

    }

    function ResolverSudoku(){

       var tds = `<table>
                    <tbody>`;
    	for (var i = 0; i < respuesta.length; i++) {
    		tds += '<tr>';
    		for (var j = 0; j < respuesta[i].length; j++) {
    				tds += `<td> <table id="MyTable">
                    <tbody>`;
    			for (var c = 0; c < respuesta[i][j].length; c++) {
    				tds += '<tr>';
    				for (var f = 0; f < respuesta[i][j][c].length; f++) {
    					if(respuesta[i][j][c][f]===0){
			            tds += '<td class="td"><input type="number" class="form-control input" id=id_'+i+j+c+f+'></td>'
			          }else{
			            tds += '<td align="center" class="td">'+respuesta[i][j][c][f]+'</td>';
			          }
    				};
    				tds += '</tr>';
    			};
    			tds += `</tbody>
              </table> </td>`;
    		};
    		tds += `</tr>`;
    	};
    		tds += `</tbody>
              </table>`;
			$("#Juego").html(tds);
    }

 function valida(id){

 	var SiValidar = isNaN($("#id_00").val()) && $('#'+id).val() <= Rango  ? true  : false;
 	
 	if($('#'+id).val() != ''){
 		if(SiValidar){

 	Valor = parseInt($('#'+id).val())
 	var SoloNum = id.split("_")[1];
 	fila=[],
 		Cuadrante=[],
 		Columnas=[];
 	//console.log(Valor);
 	Cuadrante.push(sudoku[SoloNum.charAt(0)][SoloNum.charAt(1)]);
 	for (var i = 0; i < sudoku[SoloNum.charAt(0)].length; i++) {
 		fila.push(sudoku[SoloNum.charAt(0)][i][SoloNum.charAt(2)]);
 	};

 	for (var i = 0; i < sudoku.length; i++) {
 		for (var j = 0; j < sudoku.length; j++) {
 			Columnas.push(sudoku[i][SoloNum.charAt(1)][j][SoloNum.charAt(3)]);
 		};
 		
 	};
 	
	switch(Casos(ValidaCuadrante(Cuadrante,Valor),ValidaFila(fila,Valor),ValidaColumna(Columnas,Valor))){
		case 0: 
			sudoku[SoloNum.charAt(0)][SoloNum.charAt(1)][SoloNum.charAt(2)][SoloNum.charAt(3)] = Valor;
			$('#'+id).css("background","rgba(0, 255, 10, 0.68)");
			$('#Mensajes').html('');
		break;
		case 1:
			if(sudoku[SoloNum.charAt(0)][SoloNum.charAt(1)][SoloNum.charAt(2)][SoloNum.charAt(3)] === Valor){
				sudoku[SoloNum.charAt(0)][SoloNum.charAt(1)][SoloNum.charAt(2)][SoloNum.charAt(3)] = Valor;
				$('#'+id).css("background","rgba(0, 255, 10, 0.68)");
			}else{
				$('#Mensajes').html("<p class='animated zoomInRight' style='color:red'>El Valor que ingreso se encuentra en la fila, columna y cuadrante</p>");
				$('#'+id).css("background","red");			
			}
			break;
		case 2:
			$('#'+id).css("background","#FF8100");
			$('#Mensajes').html("<p class='animated zoomInRight' style='color:#FF8100'>El Valor que ingreso se encuentra en el cuadrante o en la fila</p>");
		break;
		case 3:
			$('#'+id).css("background","#E4AF36");
			$('#Mensajes').html("<p class='animated zoomInRight' style='color:#E4AF36'>El Valor que ingreso se encuentra en el cuadrante</p>");
		break;
		case 4:
			$('#'+id).css("background","#E2E436");
			$('#Mensajes').html("<p class='animated zoomInRight' style='color:#E2E436'>El Valor que ingreso se encuentra en la fila y en la columna</p>");
		break;
		case 5:
			$('#'+id).css("background","#FBFF00");
			$('#Mensajes').html("<p class='animated zoomInRight' style='color:#FBFF00'>El Valor que ingreso se encuentra en el cuadrante o en la fila</p>");
		break;
		default:
			$('#'+id).css("background","white");
			$('#Mensajes').html('');
		break;
	}
 		//$('#Mensajes').html('');
 	}else{
 		$('#'+id).val('');
 		$('#Mensajes').html("<p class='animated zoomInRight' style='color:red'>Los campos deben estar dentro del rango de 0 a "+Rango+" y ser de tipo numerico</p>");
 	}

//Fin primer IF
 }else{
 	$('#'+id).val('');
 	$('#'+id).css("background","rgba(0, 0, 0, 0.12)");
 }


 	

 }   

function ValidaCuadrante(Cuadran, Valor){
	for (var j = 0; j < Cuadran[0].length; j++) {
 			for (var k = 0; k < Cuadran[0].length; k++) {
 				//console.log(Cuadran[0][j][k]+" = "+Valor);
 				if(Cuadran[0][j][k] === Valor){
 					return true;
 					break;
 				}
 			};
 		};	
 		return false;
}

function ValidaFila(fila, Valor){
	for (var i = 0; i < fila.length; i++) {
		for (var j = 0; j < fila.length; j++) {
			if(fila[i][j] === Valor){
				return true;
 				break;
			}
		};
	};
	return false;
}

function ValidaColumna(Columnas,Valor){
	for (var i = 0; i < Columnas.length; i++) {
		if(Columnas[i] === Valor){
			return true;
		} 
	};
	return false;
}

function Casos(Cuadrante,Fila,Columna){
	return 	Cuadrante && Fila && Columna ? 1 : Cuadrante && Fila && !Columna ? 2 : Cuadrante && !Fila && !Columna ?
			3 : !Cuadrante && Fila && Columna ? 4 : !Cuadrante && !Fila && !Columna ? 0 : 5;


	/*
		Caso 1: Todo es True
		Caso 2: Todo menos Columna es true
		Caso 3: Todo menos Columna y Fila es true
		Caso 4: Todo menos Cudrante es true
		Caso 0: Todo es falso;
		Caso 6: Digito el numero que es, lo borro y lo volvio a escribir;

	*/
}

function validaFinDeJuego(){
	
var cont=0;
for (var i = 0; i < sudoku.length; i++) {
	for (var j = 0; j < sudoku[i].length; j++) {
		for (var k = 0; k < sudoku[i][j].length; k++) {
			for (var c = 0; c < sudoku[i][j][k].length; c++) {
				if(sudoku[i][j][k][c] === respuesta[i][j][k][c]){
					cont++;
				}
			};
		};
	};
	
};

if(cont === (Rango*Rango)){
		DibujaSudoku();
		$('#Mensajes').html("<h2 class='animated zoomInRight' style='color:green'>Ya Ganó, Felicitaciones</h2>");
	}

}




$('#NewSudoku').click(function(){
	IniSudoku();
});

$('#Resolver').click(function(){
	ResolverSudoku();
});




/*

//Intento Creación Sudoku por fuerza Bruta -- > Resultado too much recursion

	SudoKu = [];
	valorCelda = "";

function CrearSudoku(){
	ValorAnterior=0;
	SudoKu = [];

    var i = c = 0;


	for(i = 0; i < 9; i++)
            {
                SudoKu.push([]);
                for(c = 0; c < 9; c++)
                {
                    var MiValor = Math.floor(Math.random() * 9) + 1;
                    var NuevoValor = Math.floor(Math.random() * 9) + 1;
                    valorCelda = VerificaHorizontal(i,c,MiValor);
					//VerificaHorizontal(i,c,MiValor) ? MiValor : VerificaHorizontal(i,c,NuevoValor) ? NuevoValor:alert('No se logro');
					//setTimeout (valorCelda = VerificaHorizontal(i,c,MiValor), 5000);
                    SudoKu[i][c] = valorCelda;
                }
            }
//console.table(SudoKu);
}



function VerificaHorizontal (posHori,posVer,Valor){
//console.log("Posicion posHori: "+posHori+" Posicion posVer: "+posVer);
//	console.log("Valor: "+Valor+" = "+"Valor Anterior "+ValorAnterior);
var continuar = true;

//Validar que todos los valores que ingresan no se repitan
		if(Valor !== ValorAnterior){
		ValorAnterior = Valor;

//Validar que el valor no este en cada Array si lo esta no se hacen todos los otros for
		for(var i=0;i<SudoKu[posHori].length;i++){
				if(SudoKu[posHori][i] === Valor){
						continuar = false;
						break;
				}
		}
console.log("Continuar: "+continuar);
		if(continuar){

		var limite = 9 - posVer;
		var Derecha = false, Izquierda=false, Arriba=false;

		for(var i=0;i<limite;i++){
			if(SudoKu[posHori][i] === Valor){
				Derecha = true;
			}
		}
		

		for(var i=posVer;i >= 0;i--){
			if(SudoKu[posHori][i] === Valor){
				Izquierda = true;
				break;
			}
		}

// Verificar estos dos For
		var limiteDown = 9 - posHori;
		if(!Izquierda){
		for(var i=0;i<SudoKu.length;i++){
		//console.log("Primer For: "+i+" limiteDown: "+limiteDown);
		//console.log("Valor de i: "+i);
			if(SudoKu[i][posVer] === Valor){
				Arriba = true;
				break;
			}
		}
		}


	}//Fin if de si continuar
	else{		
		return Math.floor(Math.random() * 9) + 1;
	}

		
		if(!Arriba){
		for(var i=posHori;i >= 0;i--){
		//console.log("Segundo For: "+i+" posHori "+posHori);
			if(SudoKu[posVer][i] === Valor){
				var Abajo = true;
				break;
			}
		}

		var cont=0;
		cont++;
		console.log("Llamado de funcion: "+cont+" PosVer: "+posVer+" posHori: "+posHori+" limiteDown: "+limiteDown);
		}
		
		//console.log("PosVer: "+posVer+" posHori: "+posHori+" limiteDown: "+limiteDown);
		//console.log("Derecha: "+Derecha+" Izquierda: "+Izquierda+" Arriba: "+Arriba);
		if(Izquierda || Arriba){
			var OtroValor=0;
			setTimeout(OtroValor = VerificaHorizontal(posHori,posVer,Math.floor(Math.random() * 9) + 1),3000);
			return OtroValor;
		}else{
			return Valor;
		}

}else{
		var MiNewValor=0;
	    setTimeout(MiNewValor = VerificaHorizontal(posHori,posVer,Math.floor(Math.random() * 9) + 1),3000);
		return MiNewValor;
}// En If


}


*/


});
