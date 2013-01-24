var aineet = [];
var ka, ka2, p1, p2;
var hoverColor1 = "rgb(228,242,251)";

$(document).ready(function(){

	//
	// Initialize
	//

	$("#help-img").click(function(){
		$("#help").toggle("blind", 500);
	});

	$("#s1").click(function(){
		$("#sivu1").hide();
		$("#sivu2").show();
	});
	
	$("#s2").click(function(){
		$("#sivu2").hide();
		$("#sivu1").show();
	});

	p1 = 0;
	p2 = 0;
	
	$(".input").each(function(){
		$(this).val("");
	});
	
	$(".input2").each(function(){
		$(this).val("");
	});
	
	$("input").attr('checked', false);
	
	$('input[name=tk]')[0].checked="checked";
	
	$(".input3").each(function(index){
		$(this).val("0");
	});
	
	$(".input3").focusin(function(){
		$(this).val("");
	});
	
	$(".input3").focusout(function(){
		if($(this).val() == ""){
			$(this).val("0");
		}
	});

	for(var j=1; j<6; j++){
		if(j == 1){
			$("#pyht"+j).html("3");
		}else if(j == 2){
			$("#pyht"+j).html("1");
		}else{
			$("#pyht"+j).html("0");
		}
	}
	
	//
	// Clicked on a field handler
	//
	
	$("#table1").on("focusout", ".input", function(event) {
		ka = 0;
		ka2 = 0;
		var inputId = $(this).attr("id");
		var inputClass = $(this).attr("class");
		var inputValue = $(this).val();
		
		if(inputId.slice(inputId.length - 2, inputId.length -1 ) == "_") {
			
			var prefix = inputId.slice(0, inputId.length -1 );
			var fieldnum = +inputId.slice(inputId.length - 1, inputId.length);
			
			if( inputValue > 3 && inputValue < 11 ) {
				if( aineet[inputId] === undefined  ){
					aineet[inputId] = true;
					$("#jakaja").text(parseInt($("#jakaja").text())+1);
					
					var table = $('#table1')[0];
					var rowNum = $(this).parent().parent()[0].sectionRowIndex;
					var fieldnumNext = fieldnum + 1;
					
					var oldRow = table.rows[rowNum];
					
					var c1old = oldRow.cells[0];
					var c2old = oldRow.cells[1];
					
					var newRow = table.insertRow(rowNum+1);
					
					var c1 = newRow.insertCell(0);
					
					var oldlabel = $("#" + prefix + 1).parents("tr")[0].cells[0].textContent;
					c1.textContent = oldlabel.slice(0, oldlabel.length - 1) + ", " + fieldnumNext + ". numero";
					
					var c2 = newRow.insertCell(1);
					var inputField = document.createElement("input");
					inputField.setAttribute("id", prefix + fieldnumNext);
					inputField.setAttribute("type", "text");
					inputField.setAttribute("class", c2old.firstChild.getAttribute("class"));
					inputField.setAttribute("maxlength", "2");
					
					c2.appendChild(inputField);
				}
					
			} else {
				
				if(inputValue == ''){
					$(this).css("color","black");
					
					var x = 0;
					while( $("#" + prefix + (fieldnum+x+1)).length > 0) {
						x++;
					}
					
					if(x > 0) {
						var table = $('#table1')[0];
						var rowNum = $(this).parent().parent()[0].sectionRowIndex;
						
						var num;
						
						for(var i = rowNum+1; i < rowNum+x+1; i++) {
							var row = table.rows[i];
							num = +row.cells[1].firstChild.getAttribute("id").slice(prefix.length, prefix.length+1)-1;
							
							var oldlabel = $("#" + prefix + "1").parent().parent()[0].cells[0].textContent;
							
							if(num == 1) {
								row.cells[0].textContent = oldlabel
							} else {
								row.cells[0].textContent = oldlabel.slice(0, oldlabel.length - 1) + ", " + num + ". numero";
							}
							
							$(row.cells[1].firstChild)[0].setAttribute("id", prefix + num);
						}
						
					if(aineet[prefix  + num] !== undefined){
						aineet[prefix  + num] = undefined;
						$("#jakaja").text(parseInt($("#jakaja").text())-1);
					}	
						table.deleteRow(rowNum);
					}
					
				}else{
					$(this).val("0");
					$(this).css("color","red");
					
					if(aineet[inputId] !== undefined){
						aineet[inputId] = undefined;
						$("#jakaja").text(parseInt($("#jakaja").text())-1);
					}
				}
			}
			
			//////////
			/////  orptjhprtohjrtophjpohrthjrtpohjtrpohj
			///////////
			var sum = 0;
			var count = 0;
			$(".input").each(function() {
				if($(this).attr('class').slice(0,12) == 'input painot' && $(this).attr("id").slice(0, inputId.length -1 ) == prefix) {
					var val = parseInt($(this).val())
					if(val > 0) {
						sum += parseInt(val);
						count++;
					}
				}
			});
			var kap = sum/count;
			$(".tdinput2." +inputClass.slice(6,13)).text(Math.round(parseFloat(kap)*100)/100);
		
		} else {
			if(inputValue > 3 && inputValue < 11){
				$(this).css("color","black");
				
				if(aineet[inputId] === undefined){
					aineet[inputId] = true;
					$("#jakaja").text(parseInt($("#jakaja").text())+1);
				}
				
				//if(inputClass.slice(0,12) == 'input painot'){
				//	$(".tdinput2." +inputClass.slice(6,13)).text(inputValue);
				//}
			
			
			}else {
				if(aineet[inputId] !== undefined){
					aineet[inputId] = undefined;
					$("#jakaja").text(parseInt($("#jakaja").text())-1);
				}

				if(inputValue == ''){
					$(this).css("color","black");
				}else{
					$(this).val("0");
					$(this).css("color","red");
				}
			}
		}
		
		
		//
		// Calculate the average
		//
		
		ka = 0;
		ka2 = 0;
		
		$(".input").each(function(){
				var val = $(this).val();
				
				if(parseFloat(val) > 0){
					ka += parseInt(val);
				}
			});
			
			var painotetut = new Array();
			$(".tdinput2:not(#yhteensa2):not(#keskiarvo2)").each(function(){
				var val2 = parseFloat($(this).text());	
				if(val2 != '' && val2 > 0){
					painotetut.push(val2);
				}
			});
			painotetut.sort(sortNumber);
			for(var i=0; i<3; i++){
				if(painotetut[i] > 0)
				ka2 += parseFloat(painotetut[i]);
			}
			
			var jakaja = 1;
			if(painotetut.length < 3) {
				jakaja = painotetut.length;
			} else {
				jakaja = 3;
			}
			
			//
			// Print the results
			//
			
			if(ka2 != 0){
				$("#yhteensa2").text(Math.round(parseFloat(ka2)*100)/100);
				ka2 = Math.round((ka2 / jakaja)*100)/100;
				$("#keskiarvo2").text(ka2);
			}else{
				$("#yhteensa2").text("0");
				$("#keskiarvo2").text("0.00");
			}
			
			if(ka != 0){
				$("#yhteensa").text(Math.round(parseFloat(ka)*100)/100);
				ka = Math.round((ka / parseInt($("#jakaja").text()))*100)/100;
				$("#keskiarvo").text(ka);
			}else{
				$("#yhteensa").text("0");
				$("#keskiarvo").text("0.00");
			}
			
			$("#table2").find("tr").css("background-color","white");
			$("#table4").find("tr").css("background-color","white");
			p1 = 0;
			p2 = 0;
			
			if(ka >= 5.50 && ka <= 5.75){
				$("#ka1").css("background-color",hoverColor1);
				p1 = 4;
			}else if(ka >= 5.75 && ka <= 5.99){
				$("#ka2").css("background-color",hoverColor1);
				p1 = 5;
			}else if(ka >= 6.00 && ka <= 6.24){
				$("#ka3").css("background-color",hoverColor1);
				p1 = 6;
			}else if(ka >= 6.25 && ka <= 6.49){
				$("#ka4").css("background-color",hoverColor1);
				p1 = 7;
			}else if(ka >= 6.50 && ka <= 6.74){
				$("#ka5").css("background-color",hoverColor1);
				p1 = 8;
			}else if(ka >= 6.75 && ka <= 6.99){
				$("#ka6").css("background-color",hoverColor1);
				p1 = 9;
			}else if(ka >= 7.00 && ka <= 7.24){
				$("#ka7").css("background-color",hoverColor1);
				p1 = 10;
			}else if(ka >= 7.25 && ka <= 7.49){
				$("#ka8").css("background-color",hoverColor1);
				p1 = 11;
			}else if(ka >= 7.50 && ka <= 7.74){
				$("#ka9").css("background-color",hoverColor1);
				p1 = 12;
			}else if(ka >= 7.75 && ka <= 7.99){
				$("#ka10").css("background-color",hoverColor1);
				p1 = 13;
			}else if(ka >= 8.00 && ka <= 8.24){
				$("#ka11").css("background-color",hoverColor1);
				p1 = 14;
			}else if(ka >= 8.25 && ka <= 8.49){
				$("#ka12").css("background-color",hoverColor1);
				p1 = 15;
			}else if(ka >= 8.50 && ka <= 10.00){
				$("#ka13").css("background-color",hoverColor1);
				p1 = 16;
			}
			
			if(ka2 >= 5.50 && ka2 <= 5.99){
				$("#pka1").css("background-color",hoverColor1);
				p2 = 2;
			}else if(ka2 >= 6.00 && ka2 <= 6.49){
				$("#pka2").css("background-color",hoverColor1);
				p2 = 3;
			}else if(ka2 >= 6.50 && ka2 <= 6.99){
				$("#pka3").css("background-color",hoverColor1);
				p2 = 4;
			}else if(ka2 >= 7.00 && ka2 <= 7.49){
				$("#pka4").css("background-color",hoverColor1);
				p2 = 5;
			}else if(ka2 >= 7.50 && ka2 <= 7.99){
				$("#pka5").css("background-color",hoverColor1);
				p2 = 6;
			}else if(ka2 >= 8.00 && ka2 <= 8.49){
				$("#pka6").css("background-color",hoverColor1);
				p2 = 7;
			}else if(ka2 >= 8.50 && ka2 <= 10.00){
				$("#pka7").css("background-color",hoverColor1);
				p2 = 8;
			}
			pisteetYhteensa();
		
	});
	
	$('input[name=tk]').change(function(){pisteetYhteensa();});
	$('.checkboxi').change(function(){pisteetYhteensa();});
	$('.input3').change(function(){pisteetYhteensa();});

});

//
// Print final results on second page
//

function pisteetYhteensa(){
	var pisteet = parseInt(p1 + p2);
	var pp = 0;
	pisteet += parseInt($('input:radio[name=tk]:checked').val());
	
	if($("#psh").attr('checked') == 'checked'){
		pisteet += 3;
	}
	
	for(var i=1; i<6; i++){
		pp = 0;
		if($("#sukup"+i).attr('checked') == 'checked'){
			pp += 2;
		}
		
		pp += parseInt($("#pkp"+i).val());
		if(i == 1){
			pp += 3;
		}else if(i == 2){
			pp +=1;
		}
		$("#pyht"+i).html(parseInt(pisteet + pp));
	}
}

function sortNumber(a, b){
	return b - a;
}