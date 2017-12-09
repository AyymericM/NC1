// INIT

const gameRoot = document.getElementById('root')
const johnny = document.getElementById('johnny')
const sizeY = 23
const sizeX = 15

var playerPosIntId = null
var spawnCancerIntId = null
var spawnObstacleIntId = null

var gameOver = false

var playerPos = {
	X: 280,
	Y: 480,
	dir: 'right'
}

function endGame() {
	gameOver = true
	clearInterval(spawnCancerIntId)
	clearInterval(spawnObstacleIntId)
	clearInterval(playerPosIntId)
}

// DATA FUNCTIONS

var cells = []

for (var i = 0; i < 24; i++) {
	cells[i] = [
		{
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}, {
			touchable: true,
			active: 0
		}
	]
}

// SPAWN CANCER

function spawnCancer(X, Y, touchable) {
	const cancer = document.createElement('div')
	if (touchable === true) {
		cancer.classList.add('cancer')
	} else {
		cancer.classList.add('obstacle')
	}
	cancer.setAttribute('style', `left: ${Y * 40}px;top: ${X * 40}px;`)
	cancer.setAttribute('data-x', X)
	cancer.setAttribute('data-y', Y)
	root.appendChild(cancer)
}

var spawnCancerIntId = setInterval(() => {
	let countX = 0
	let countY = 0
	let randomX = Math.random() * (15 + 1);
	X = randomX - (randomX % 1);
	let randomY = Math.random() * (23 + 1);
	Y = randomY - (randomY % 1);

	cells[Y][X].active = 1;

	for (var i = 0; i < cells[Y].length; i++) {
		if (cells[Y][i].active === 1 && cells[i][Y].touchable === true) {
			countX = countX + 1
		}
	}

	for (var i = 0; i < cells.length; i++) {
		if (cells[i][Y].active === 1 && cells[i][Y].touchable === true) {
			countY = countY + 1
		}
	}
	if (countX === 16 || countY === 25) {
		spawnCancer(X, Y, true)
		endGame()
	} else {
		spawnCancer(X, Y, true)
	}
}, 1500);

var spawnObstacleIntId = setInterval(() => {
	let countX = 0
	let countY = 0
	let randomX = Math.random() * (15 + 1);
	X = randomX - (randomX % 1);
	let randomY = Math.random() * (23 + 1);
	Y = randomY - (randomY % 1);

	cells[Y][X].active = 1;
	cells[Y][X].touchable = false;

	spawnCancer(X, Y, false)
}, 5000);

// EVENT LISTENER

document.addEventListener('keydown', (e) => {
	if (e.keyCode === 39) {
		playerPos.dir = 'right'
	} else if (e.keyCode === 37) {
		playerPos.dir = 'left'
	} else if (e.keyCode === 38) {
		playerPos.dir = 'top'
	} else if (e.keyCode === 40) {
		playerPos.dir = 'bottom'
	}
})

// TIMER

var playerPosInterval = setInterval(() => {
	if (gameOver === false) {
		if (playerPos.dir === 'left') {
			if (playerPos.Y - 40 < 0) {
				endGame()
			} else {
				playerPos.Y = playerPos.Y - 40
			}
		} else if (playerPos.dir === 'right') {
			if (playerPos.Y + 40 >= 1000) {
				endGame()
			} else {
				playerPos.Y = playerPos.Y + 40
			}
		} else if (playerPos.dir === 'top') {
			if (playerPos.X - 40 < 0) {
				endGame()
			} else {
				playerPos.X = playerPos.X - 40
			}
		} else if (playerPos.dir === 'bottom') {
			if (playerPos.X + 40 >= 640) {
				endGame()
			} else {
				playerPos.X = playerPos.X + 40
			}
		}
	}

	if ((cells[playerPos.Y / 40][playerPos.X / 40].active === 1)) {
		if (cells[playerPos.Y / 40][playerPos.X / 40].touchable === true) {
			let el = document.querySelector(`[data-x="${playerPos.X / 40}"][data-y="${playerPos.Y / 40}"]`)
			el.remove()
			cells[playerPos.Y / 40][playerPos.X / 40].active = 0
		} else {
			endGame()
		}
	}

	johnny.style.left = (playerPos.Y + 'px');
	johnny.style.top = (playerPos.X + 'px');
}, 200)
