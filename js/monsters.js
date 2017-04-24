var Monster = Backbone.Model.extend({
	initialize: function(){},
	defaults:{
		atk:0,def:0,hp:0,dir:[],owner:null,position:[0,0]
	},
	setOwner:function(ow)
	{
		this.set({owner:ow})
	},
	render:function(){
		var view = new MonsterView({model:this})
		return (view.el)
	},
	canMove:true,
	move:function(dir)
	{
		from = this.get("position")
		switch(dir)
		{
			case TOP:
			to = [from[0]-1,from[1]]
			tablero.move(from,to)
			break;
			case LEFT:
			break;
			case RIGHT:
			break;
			case DOWN:
			break;
		}
	},
	afectedZones:function()
	{
		var ret =  new Array();
		dir = this.get("dir")
		x = this.get("position")[0]
		y = this.get("position")[1]
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
			}
		}

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
	click:function()
	{
		console.log("set: "+this.model.get("name")+": as selected Monster")
		game.selected = this.model
		game.state = game.move
		tablero.reDraw();
	}


})

