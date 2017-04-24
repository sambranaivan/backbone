_BOARD_SIZE = 9;
var game = {state:1,main:1,move:2,summon:3,effect:4,attack:5}
game.state = game.main
game.selected = null
game.target = null

function emptyTablero(){

	return [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
	]
}


var Board = Backbone.Model.extend({
	initialize: function()
	{
		// this.on("change:tablero_monster",this.reDraw)
	},
	defaults:
	{
		tablero_level: new emptyTablero(),
		tablero_monster: new emptyTablero(),
		tablero_move:new emptyTablero()
	},

	addMonster:function(i,j,monster)
	{
		console.log("add Monster: "+monster.get("name"))
		monster.set({position:[i,j]})//decirle al mosnter donde esta en el tablero
		var _tab = this.get("tablero_monster")
		_tab[i][j] = monster;
		this.set("tablero_monster",_tab);
		this.reDraw();
	},
	update:function(){
		
		var t = this.get("tablero_monster");
		for (var i = 0; i < t.length; i++) 
		{
			for (var j = 0; j < t[i].length; j++) 
			{

				var monster = t[i][j];
				if (typeof(monster) == "object") 
				{
					
					if (monster.get("side") == 1) 
					{
						if (monster.get("dir").indexOf(TOP) != -1 && i>0) {this.zoneLevel((i-1),j)}
						if (monster.get("dir").indexOf(DOWN) != -1 && i<8) {this.zoneLevel((i+1),j)}
						if (monster.get("dir").indexOf(LEFT) != -1 && j>0) {this.zoneLevel(i,(j-1))}
						if (monster.get("dir").indexOf(RIGHT) != -1 && j<8) {this.zoneLevel(i,(j+1))}
						if (monster.get("dir").indexOf(TOPLEFT) != -1 && i>0 && j>0) {this.zoneLevel((i-1),(j-1))}
						if (monster.get("dir").indexOf(TOPRIGHT) != -1 && i>0 && j<8) {this.zoneLevel((i-1),(j+1))}
						if (monster.get("dir").indexOf(DOWNLEFT) != -1 && i<8 && j>0) {this.zoneLevel((i+1),(j-1))}
						if (monster.get("dir").indexOf(DOWNRIGHT) != -1 && i<8 && j<8) {this.zoneLevel((i+1),(j+1))}
					}
					else
					{
						if (monster.get("dir").indexOf(DOWN) != -1 && i>0) {this.zoneLevel((i-1),j)}
						if (monster.get("dir").indexOf(TOP) != -1 && i<8) {this.zoneLevel((i+1),j)}
						if (monster.get("dir").indexOf(RIGHT) != -1 && j>0) {this.zoneLevel(i,(j-1))}
						if (monster.get("dir").indexOf(LEFT) != -1 && j<8) {this.zoneLevel(i,(j+1))}
						if (monster.get("dir").indexOf(DOWNRIGHT) != -1 && i>0 && j>0) {this.zoneLevel((i-1),(j-1))}
						if (monster.get("dir").indexOf(DOWNLEFT) != -1 && i>0 && j<8) {this.zoneLevel((i-1),(j+1))}
						if (monster.get("dir").indexOf(TOPRIGHT) != -1 && i<8 && j>0) {this.zoneLevel((i+1),(j-1))}
						if (monster.get("dir").indexOf(TOPLEFT) != -1 && i<8 && j<8) {this.zoneLevel((i+1),(j+1))}	
					}
				}
			}
		}
		// callback();
	},
	zoneLevel:function(i,j)
	{
		var t = this.get("tablero_level");
		
			t[i][j]++;
			this.set("tablero_level",t);
		
	},
	zoneMove:function()
	{
		var t = this.get("tablero_move");
		if (game.selected instanceof Monster) 
		{
			afectedZones = game.selected.afectedZones()
			for (var i = t.length - 1; i >= 0; i--) {
				for (var j = t[i].length - 1; j >= 0; j--) {
					
					for (var k = afectedZones.length - 1; k >= 0; k--){
						if (_.isEqual(afectedZones[k],[i,j])) 
						{t[i][j] = true}

					}

				}
			}
		}
		
		this.set("tablero_move",t);
	},
	draw:function(){
		this.zoneMove();//update zonemove by game.selecteed monster
		var tablero_level = this.get("tablero_level");
		var tablero_move = this.get("tablero_move");
		var tablero_monster = this.get("tablero_monster");
		var tablero_document = $("#tablero").html("");//clean html
		var flag=false;
			for (var i = 0; i < tablero_level.length; i++) //por cada fila
					{for (var j = 0; j < tablero_level[i].length; j++) // por cada columna
						{
							var level = tablero_level[i][j];//nivel de la zona
							var monster = tablero_monster[i][j];//monstruo en la zona
							var move = tablero_move[i][j];
							
							//creo instancia html dela zona
							var zone = $("<div></div>").addClass("zone").attr("row",i).attr("col",j);


							//cargo la zone
							if (monster instanceof Monster) //if is a monster in the zone
							{
									zone.first().html(monster.render())
							
							}
							else
							{
								switch(game.state)
								{
									case game.main:
										zone.addClass("nivel_"+level).attr("level",level)
										if (level>0) 
										{
											zone.first().html('<div class="in_zone">'+level+'</div>')
											zone.addClass("summon")
											// if (flag) {zone.addClass("move")}
										}
										// test dibujar zona
									break
									case game.move:
										if (move) {zone.addClass("move")}
									break
								}		
									
								
							}
							//colores blanco y negro intercalado
							if (((i+j)%2) == 0){zone.addClass("odd")}else{zone.addClass("even")}
							// render
							tablero_document.append(zone);
						}
					}
	
		

		
	},
	move:function(from,to)
	{
		console.log("Move monster: ["+from[0]+","+from[1]+"]->["+to[0]+","+to[1]+"]")
		var _tab = (this.get("tablero_monster"))

		// check
		if (_tab[to[0]][to[1]] instanceof Monster) //si esta ocupado
		{
			alert("Tablero ocupado")
		}
		else
		{
		
		_tab[from[0]][from[1]].set({position:[to[0],to[1]]})
		_tab[to[0]][to[1]] = _tab[from[0]][from[1]]
		_tab[from[0]][from[1]] = 0;

		this.set("tablero_monster",_tab);
		game.state = game.main
		this.reDraw();			
		}


	},
	cleanlevels: function()
	{
		this.set("tablero_level",new emptyTablero())
		this.set("tablero_move",new emptyTablero())
	},
	reDraw:function(){
		console.log("reDraw()")
		this.cleanlevels()
		this.update()
		this.draw()
		this.applyEvents()
	},
	applyEvents:function(){

						var _self = this//super this
			$(".summon").click(function(){
						//obtener coordenadas del tablero
						var t = $(this)//shorthand
						var i = t.attr("row")
						var j = t.attr("col")
						var nivel = parseInt(t.attr("level"))
							//Mostrar lista de invocaciones posibles
						// console.log("summon list level:"+nivel)
						// console.log(Player.deck.where({nivel:nivel}))
						var summon_collection = player1.getLevel(nivel)

						var modal = $("#deck").html("")

						// Abrir Menu de Invocacion
						modal.dialog(
							{
								title:"select to summon level "+nivel,
								height: 400,
								width: 350,
								modal: true,
							})	



						_.each(summon_collection,function(model,index){
							var item = $("<div></div>").addClass("decktoken")


							item.first().html(model.render())

							$("#deck").append(item.click(function(){
								modal.dialog("close")
								var cid = model.cid
								console.log("addMonster "+model.cid+" to ["+i+","+j+"]")
								// _self.addMonster(i,j,player1.deck.get({cid:cid}))
								player1.summon(i,j,cid)



							}))
						})
			})

			$(".move").click(function(){
				x = parseInt($(this).attr("row"))
				y = parseInt($(this).attr("col"))
				from = game.selected.get("position")
				tablero.move(from,[x,y])

			})


			// $(".monster").click(function(){
			// 	// /MOVER A VIEW MONSTER
			// 	// quien sos
			// 	cid = $(this).attr("cid");
			// 	//donde estas?
			// 	parent = $(this).parent();
			// 	x = parent.attr("row")
			// 	y = parent.attr("col")
			// 	// 
			// 	console.log([x,y])
			// 	target = _self.get("tablero_monster")[x][y]//get monster
			// 	// console.log(target)
			// 	// 
			// 	// 
			// 	// 
			// 	console.log("click on "+target.get("name"))
			// 	target.move(TOP);


			// })


			
	}
})




