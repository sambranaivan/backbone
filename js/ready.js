var tablero = new Board()
var player1 = new Player({name:"player1"})
var enemy1 = new Player({name:"Enemigo"})
var deck_array = ['pikachu','pichu','raichu','jirachi','raikou']
var pikachu = new Monster(dex.pikachu)
var jirachi = new Monster(dex.jirachi)

$(document).ready(function(){


	
		// console.log(tablero)
player1.set({deck: new Deck()})
player1.set({deck_string:deck_array})
enemy1.set({deck: new Deck()})
enemy1.set({deck_string:deck_array})
pikachu.setOwner(player1)
jirachi.setOwner(enemy1)
tablero.addMonster(0,4,jirachi)
tablero.addMonster(8,4,pikachu)

player1.render();


		
})