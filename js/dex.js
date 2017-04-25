var TOP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;
var TOPLEFT = 5;
var TOPRIGHT = 6;
var DOWNLEFT = 7;
var DOWNRIGHT = 8;



var dex = {
	"master":
	{
		nivel:0,
		atk:0,
		def:0,
		hp:5,
		dir:[TOP,DOWN,LEFT,RIGHT,TOPLEFT,TOPRIGHT,DOWNLEFT,DOWNRIGHT],
		canMove:false,
		name:"White Master",
		sprite:"pics/master.png"
	},
	"enemymaster":
	{
		nivel:0,
		atk:0,
		def:0,
		hp:5,
		dir:[TOP,DOWN,LEFT,RIGHT,TOPLEFT,TOPRIGHT,DOWNLEFT,DOWNRIGHT],
		canMove:false,
		name:"Dark Master",
		sprite:"pics/master.png"
	},
	"pikachu":
	{
		nivel:1,
		atk:10,
		def:15,
		dir:[TOP,DOWN,LEFT,RIGHT],
		hp:5,
		name:"Pikachu",
		sprite:"trozei/025.png"

	},
	"raichu":
	{
		nivel:2,
		atk:15,
		def:15,
		dir:[TOP,LEFT,RIGHT],
		hp:7,
		name:"Raichu",
		sprite:"trozei/026.png"
	},
	"pichu":
	{
		nivel:1,
		atk:5,
		def:10,
		hp:3,
		dir:[TOPLEFT,TOPRIGHT,DOWNLEFT,DOWNRIGHT],
		name:"Pichu",
		sprite:"trozei/172.png"
	},
	"jirachi":
	{
		nivel:3,
		atk:5,
		def:10,
		hp:3,
		dir:[TOPLEFT,TOPRIGHT,DOWNLEFT,DOWNRIGHT,TOP,LEFT,RIGHT,DOWN],
		name:"jirachi",
		sprite:"trozei/385.png"
	},
	"raikou":
	{		
		nivel:4,
		atk:9,
		def:8,
		hp:7,
		dir:[TOPLEFT,TOPRIGHT,DOWNLEFT,DOWNRIGHT,TOP,LEFT,RIGHT,DOWN],
		sprite:"trozei/243.png"
	}
}





