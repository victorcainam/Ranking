
$(function(){
	var itens = "";
	var URL = "assets/data/fazenda.json";
	var posicao = [];

	$.ajax({
		
		url: URL,
		cache: false,
		dataType: "json",
		error: function(){
			$("body").html("Houve um erro inesperado com os dados").css("background", "#fff");
		},
		success: function(retorno){
			
			for (var i = 0; i < retorno.data.length; i++) {

				//Resgatando os votos positivos e negativos e somando os dois valores
				var positivo = parseFloat(retorno.data[i].positive);
				var negativo = parseFloat(retorno.data[i].negative);
				var total = positivo + negativo;

				//Efetuando o cálculo para saber quantos votos teve para positivos e negativos
				positivo = (positivo / total) * 100;
				negativo = (negativo / total) * 100;

				//Fazendo o arredondamento
				positivo = Math.round(positivo);
				negativo = Math.round(negativo);

				//Verificando caso algum voto existe ou é nulo e armazenando o resultado final nas variáveis
				if (!$.isNumeric(retorno.data[i].positive)) {
					positivo = "0";
					negativo = "0";
				} else {
					positivo = positivo;
					negativo = negativo;
				}			

				//Ordenando quem esta com mais votos positivo
				posicao.push(positivo);
				posicao.sort();
				posicao.reverse();

				itens += "<li class=\"clearfix\" id=\"" + positivo + "\">";
				itens += "	<img src=\"" + retorno.data[i].picture + "\" alt=\"" + retorno.data[i].name + "\" />";
				itens += "	<span>" + posicao.length + "</span>";
				itens += "	<h2>" + retorno.data[i].name + "</h2>";
				itens += "	<p>" + retorno.data[i].description + "</p>";

				itens += "	<div class=\"enquete\">";
				itens += "		<span></span>";
				itens += "		<ul>";	
				itens += "			<li>";
				itens += "				<strong>GOSTAM</strong>";
				itens += "				<span>" + positivo + "%</span>";
				itens += "			</li>";
				itens += "			<li>";
				itens += "				<strong>NÃO GOSTAM</strong>";
				itens += "				<span>" + negativo + "%</span>";
				itens += "			</li>";				
				itens += "		</ul>";
				itens += "	</div>";
				itens += "</li> ";
			};

			$(".participantes").html(itens);


		}
	});
});