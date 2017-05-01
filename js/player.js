var Deck = Backbone.Collection.extend({model:Monster})

var Player = Backbone.Model.extend({
initialize:function() {
this.deck = new Deck()
this.on("change:deck_string",function(){
	console.log("init___instanciando deck")
	var _self = this
	for (var i = 0; i < this.get("deck_string").length; i++) {
		var temp_monster = this.get("deck_string")[i]//obtengo el string 
		 temp_monster = new Monster(dex[temp_monster])//obtengo el json e instancio
		 temp_monster.setOwner(_self)
		this.get("deck").add(temp_monster)//agrego al deck

	}
})
// this.render()

 this.listenTo(this, 'change', this.render);
},
defaults:{
actionPoints:6,
},
initDeck:function(){

},

summon:function(pos,model)
{
	// obtengo monstruo del deck por cid
	// var _m = this.getMonster(cid)

	// quito al montruo del deck 
	this.get("deck").remove(model)
	// lo agrego al tablero
	// this.useActionPoint(1);
	tablero.addMonster(pos[0],pos[1],model)
	// no return
	// trigger
},
getLevel:function(level)
{
	// filtro el deck por nivel y regreso una coleccion
	return this.get("deck").where({nivel:level})
	// return : collection:monster
},
getMonster:function(cid)
{
	return this.get("deck").get({cid:cid})
	// return: model:monster
},
useActionPoint:function(c){
	ap = this.get("actionPoints")
	ap = ap-c
	this.set({actionPoints:ap})
},
hasActionPoints:function()
{
	if (this.get("actionPoints")>0) 
	{
		return true
	}
	else
	{
		return false
	}
},
render:function()
{
	console.log("RENDER")
	var view = new PlayerView({model:this})
	$("#hud").html(view.el)
}




})

var PlayerView = Backbone.View.extend({
tagName:"div",className:"playerhud",
initialize:function(){
	this.template = _.template($("#playerHud").html())
	this.render();
},
render:function()
{
	this.$el.html(this.template(this.model.attributes));
}

})
