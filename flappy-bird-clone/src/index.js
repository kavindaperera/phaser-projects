import Phaser from "phaser";

// npm run build
// npm run dev

const config = {
	// WebGL (Web Graphics Library) JS API for rendering 2D anf 3D graphics
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		// Arcade physics plugin, manages pphysics simulation
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {
			},
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
};

// Loading assets, such as images, music, animations ...
function preload() {
	// 'this' context - scene
	// contains functions and properties we can use

	this.load.image("sky", "./assets/sky.png"); // (key, path)
	this.load.image("bird", "./assets/bird.png");
	this.load.image("pipe", "./assets/pipe.png");
}

const VELOCITY = 200;
const FLAP_VELOCITY = 250;
const INIT_POSITION = {x: config.width * 0.1, y: config.height / 2}

let bird = null;
let upperPipe = null;
let lowerPipe = null;

function create() {

	// (x, y, key of the image)
	this.add.image(0, 0, "sky").setOrigin(0, 0);

	bird = this.physics.add.sprite(INIT_POSITION.x, INIT_POSITION.y, "bird").setOrigin(0, 0);
	bird.body.gravity.y = 200; //pixels per seconds^2
	bird.body.velocity.x = VELOCITY;

	upperPipe = this.physics.add.sprite(400, 100, "pipe").setOrigin(0, 1);		
	lowerPipe = this.physics.add.sprite(400, upperPipe.y + 100, "pipe").setOrigin(0, 0);	
	
	this.input.on('pointerdown', flap);
	this.input.keyboard.on('keydown_SPACE', flap);

}


// if bird y position is small than 0 or greater than height of the canvas -> alert "You have lost!"
// 
function update(time, delta) {
	if(bird.y > (config.height - bird.height) || bird.y < 0) {
		restartPlayerPosition();
	}
}

function restartPlayerPosition() {
	bird.x = INIT_POSITION.x;
	bird.y = INIT_POSITION.y;
	bird.body.velocity.y = 0;
}

function flap() {
	bird.body.velocity.y = -FLAP_VELOCITY;
}

new Phaser.Game(config);
