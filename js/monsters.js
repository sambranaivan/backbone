var Monster = Backbone.Model.extend({
	initialize: function(){
		this.on("change:position",function(){
			console.log(this.get("name")+" Positon change to"+this.get("position"))
		})
	},
	defaults:{
		atk:0,def:0,hp:0,dir:[],owner:null,position:[0,0]
	},
	setOwner:function(ow)
	{
		this.set({owner:ow})
	},
	getOwner:function()
	{
		return this.get("owner")
	},
	render:function(){
		var view = new MonsterView({model:this})
		return (view.el)
	},
	canMove:true,
	
	afectedZones:function()
	{
		var ret =  new Array();
		var dir = this.get("dir")
		var x = this.get("position")[0]
		var y = this.get("position")[1]
		for (var i = 0; i < dir.length; i++) {
			switch (dir[i])
			{
					case (TOP):
					if (x>0) {ret.push([x-1,y])}
					break;
					case (DOWN):
					if (x<8) {ret.push([x+1,y])}
					break;
					case (LEFT):
					if (y>0) {ret.push([x,y-1])}
					break;
					case (RIGHT):
					if (y<8) {ret.push([x,y+1])}
					break;
					case (TOPLEFT):
					if (x>0&&y>0) {ret.push([x-1,y-1])}
					break;
					case (TOPRIGHT):
					if (x>0&&y<8) {ret.push([x-1,y+1])}
					break;
					case (DOWNLEFT):
					if (x<8&&y>0) {ret.push([x+1,y-1])}
					break;
					case (DOWNRIGHT):
					if (x<8&&y<8) {ret.push([x+1,y+1])}
					break;
				case (TOP2):
					if (x>1) {ret.push([x-2,y])}
					break;
			}
		}
		// console.log("afectedZones")
		console.log(ret)
		return ret
	}

})


var MonsterView = Backbone.View.extend({
	tagName:"div",	
	className:"monster",
	initialize:function(){
		this.template= _.template($("#token").html()),
		this.render();
	},
	render:function(){
		this.$el.html(this.template(this.model.attributes));
		this.$el.css("background-image", "url("+this.model.get("sprite")+")");  
		this.$el.attr("cid",this.model.cid)
		// return this.$el;
	},
	events:{click:"click"},
	click:function()//click on monster token
	{
			if (this.model.get("owner") == player1) //solo si es ficha del p1
			{

					switch(game.state)
					{
						case game.main://click on monster en el tablero

						if (player1.hasActionPoints()) 
						{

						console.log("set: "+this.model.get("name")+": as selected Monster")
						game.selected = this.model //asignar el montruo seleccionado
						game.state = game.move // cambio fase del juego
						tablero.reDraw();//dibujo el tablero again	
						}
						else
						{
							alert("Dont Have Action Points")
						}


						break
						case game.summon://click on monster in deck
						player1.summon(game.summonPosition,this.model)//
						game.state = game.main//cambio la fase del juego
						modal.dialog("close")//cierro menu de invocacion
						tablero.reDraw();//dibujo el trablero again
						break
					}
			}
	}


})


