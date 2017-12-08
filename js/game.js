// INIT

function searchData(data) {
	return data.posX === this.posX && data.posY === this.posY;
}

var cellsdata = [];

// CREATE CELLS

(() => {
	for (var i = 0; i < 50; i++) {
		var tr = document.createElement('tr')
		for (var j = 0; j < 70; j++) {
			var td = document.createElement('td');
			td.className = 'cell';
			td.setAttribute('data-x', i);
			td.setAttribute('data-y', j);
			tr.append(td);
		}
		document.getElementById('root').append(tr);
	}
})()

var cell = document.querySelectorAll('.cell')

// DATA FUNCTIONS

function handleData(data) {
	var index2 = cellsdata.findIndex(searchData, data);
	if (index2 !== -1) {
		if (data.color === "white") {
			cellsdata.splice(index2, 1);
		} else {
			cellsdata[index2] = data;
		}
	} else {
		cellsdata.push(data);
	}
}

// EVENT LISTENER

for (var i = 0; i < cell.length; i++) {
	cell[i].addEventListener('click', function(e) {
		// Log dataX + dataY
		console.log(`dataX: ${this.getAttribute("data-x")} dataY: ${this.getAttribute("data-y")}`);
		handleData({
			posX: parseInt(this.getAttribute('data-x'), 10),
			posY: parseInt(this.getAttribute('data-y'), 10)
		});
		this.className = "cell";
	});
}
