import Phaser from "phaser";

const config = {
	// WebGL (Web Graphics Library) JS API for rendering 2D anf 3D graphics
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		// Arcade physics plugin, manages pphysics simulation
		default: "arcade",
		arcade: {
			gravity: {
				y: 200,
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
}

let bird = null;
let timeLapse = 0;

function create() {
	// (x, y, key of the image)
	this.add.image(0, 0, "sky").setOrigin(0, 0);
	bird = this.physics.add
		.sprite(config.width * 0.1, config.height / 2, "bird")
		.setOrigin(0, 0);
	// bird.body.gravity.y = 200; //pixels per seconds^2
}

// velocity
// t0 = 0px/s
// t1 = 200px/s
// t2 = 400px/s

// 60 fps - 60 times per second
// 60 * 16ms = 960ms
function update(time, delta) {
	timeLapse += delta;

	if (timeLapse >= 1000) {
		console.log(bird.body.velocity.y);
		timeLapse = 0;
	}
}

new Phaser.Game(config);
