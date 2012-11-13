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
		id = $(this).attr("id");
		num = id.substr(id.length-2, 2);
		if( 14 < num && num < 20 ) {
		    aineet[id] = [];
		}
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
	
	$(".input").focusout(function(){
		ka = 0;
		ka2 = 0;
		var inputId = $(this).attr("id");
		var inputClass = $(this).attr("class");
		var inputValue = $(this).val();
		if(inputValue > 3 && inputValue < 11){
			$(this).css("color","black");
			if(aineet[inputId] === undefined){
				aineet[inputId] = true;
				$("#jakaja").text(parseInt($("#jakaja").text())+1);
			}
						
			if(inputClass.slice(0,12) == 'input painot'){
				$(".tdinput2." +inputClass.slice(6,13)).text(inputValue);
			}
			
			
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
		
		//
		// Calculate the average
		//
		
		$(".input").each(function(){
				var val = $(this).val();
				
				if(val != ''){
					ka += parseInt(val);
				}
			});
			
			var painotetut = new Array();
			$(".tdinput2:not(#yhteensa2):not(#keskiarvo2)").each(function(){
				var val2 = parseInt($(this).text());	
				if(val2 != '' && val2 > 0){
					painotetut.push(val2);
				}
			});
			painotetut.sort(sortNumber);
			for(var i=0; i<3; i++){
				if(painotetut[i] > 0)
				ka2 += parseInt(painotetut[i]);
			}
			
			//
			// Print the results
			//
			
			if(ka2 != 0){
				$("#yhteensa2").text(ka2);
				ka2 = Math.round((ka2 / 3)*100)/100;
				$("#keskiarvo2").text(ka2);
			}else{
				$("#yhteensa2").text("0");
				$("#keskiarvo2").text("0.00");
			}
			
			if(ka != 0){
				$("#yhteensa").text(ka);
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