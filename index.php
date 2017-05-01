<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/start/jquery-ui.css">
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="sprites.css">
	
	<!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script> -->

	<script src="http://underscorejs.org/underscore-min.js"></script>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	
	<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
	<script src="http://backbonejs.org/backbone-min.js"></script>
	<script src="js/dex.js"></script>
	<script src="js/monsters.js"></script>
	<script type="text/javascript" src="js/player.js"></script>
	<script src="js/tablero.js"></script>
	<!-- <script src="js/templates.js"></script> -->
	<script src="js/ready.js"></script>
	
</head>
<body>
<div id="hud">
	
</div>
	<div id="tablero">
			<!-- Contenedor del Tablero -->
	</div>
	<button>Draw</button>
	<div id="deck">
			<!-- Contenedor del dialog del Deck -->
	</div>
</body>
	<!-- TEMPLATES -->
	<!-- Template del Token -->
	<script id="token" type="text/template">
			<div class="lifepoints"><%
			
				for (var i = hp; i > 0; i--) {
					print('<div class="corazon"><img src="pics/corazon.png"></div>');
				}
			
			%></div>
			<div class="inset"></div>
			<div class="stats">
				<div class="atk">A:<%= atk%></div>
				<div class="def">D:<%= def%></div>
			</div>
	</script>

	<script id="playerHud" type="text/template">
	
	</script>

	<!-- //TEMPLATE -->
</html>