// Fullscreen canvas
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const replayButton = document.getElementById("replay");
const game = {
	score: 0,
	level: 1,
	boxes: [],
	maxBoxes: 10,
	intervalRate: 1000,
	start: function () {
		replayButton.style.display = "none"; // Hide the button when game starts
		this.interval = setInterval(() => {
			if (this.boxes.length < this.maxBoxes) {
				const newBox = new Box();
				this.boxes.push(newBox);
				newBox.timer = setTimeout(() => {
					newBox.color = "red";
				}, 3000);
			} else {
				this.stop();
				alert("Game Over!");
				replayButton.style.display = "block"; // Show the button when game is over
			}
		}, this.intervalRate);
		this.render();
	},
	render: function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// black background
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// white border
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		// Score and level
		ctx.fillStyle = "white";
		ctx.font = "20px Arial";
		ctx.fillText(`Score: ${this.score}`, 20, 30);
		ctx.fillText(`Level: ${this.level}`, 20, 60);

		// Draw each box
		this.boxes.forEach((box) => {
			box.draw();
		});

		requestAnimationFrame(this.render.bind(this));
	},
	stop: function () {
		clearInterval(this.interval);
	},
	reset: function () {
		this.stop();
		this.score = 0;
		this.level = 1;
		this.boxes = [];
		this.intervalRate = 1000;
		this.start();
	},
};
class Box {
	constructor() {
		this.x = Math.floor(Math.random() * (canvas.width - 100 - 50)); // Subtract replay button width + margin
		this.y = Math.floor(Math.random() * (canvas.height - 100 - 50)); // Subtract replay button height + margin
		this.width = 50;
		this.height = 50;
		this.color = "yellow";
		this.timer = null;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

canvas.addEventListener("click", function (e) {
	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	for (let i = game.boxes.length - 1; i >= 0; i--) {
		const box = game.boxes[i];

		if (
			x >= box.x &&
			x <= box.x + box.width &&
			y >= box.y &&
			y <= box.y + box.height
		) {
			clearTimeout(box.timer);
			box.color = "green";
			setTimeout(() => {
				game.boxes.splice(i, 1);
			}, 500);
			game.score++;

			// Increase speed every 10 points
			if (game.score % 10 === 0 && game.intervalRate > 200) {
				game.intervalRate -= 100;
				game.stop();
				game.start();
			}
			break;
		}
	}
});

replayButton.addEventListener("click", function () {
	game.reset();
});

game.start();
