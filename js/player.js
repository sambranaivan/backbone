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
},
defaults:{

},
initDeck:function(){

},

summon:function(i,j,cid)
{
	// obtengo monstruo del deck por cid
	var _m = this.getMonster(cid)
	// quito al montruo del deck 
	this.get("deck").remove(_m)
	// lo agrego al tablero
	_m.set({position:[i,j]})
	tablero.addMonster(i,j,_m)
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
}




})
