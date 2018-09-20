inlets = 2;
outlets = 1;

var redshifts = [];
var cosmic_ages = [];

var current_redshift = 0;
var current_cosmic_age = 0;

function readTimesFile(file_path) {
	redshifts = [];
	cosmic_ages = [];

	var file = new File(file_path);
	file.open();

	if (file.isopen) {
		var line = file.readline();
		while (file.position < file.eof) {
			line = file.readline();
			if (!line) break;
			var params = line.split(" ");
			redshifts.push(parseFloat(params[1]));
			cosmic_ages.push(parseFloat(params[2]));
		}
	}
}

var msg_float = function(r) {
	switch(this.inlet) {
		case 0:
			current_redshift = r;

			outFileNum(redshifts, r, -1);
			return;

		case 1:
			current_cosmic_age = r;

			outFileNum(cosmic_ages, r, 1);
			break;
	}
}

function outFileNum(array, val, inv) {
	if (array[0]*inv > val *inv) {
		outlet(0, getPath(0));
		return;
	}

	for (var i = 1; i < array.length; i++) {
		if (array[i]*inv > val*inv) {
			outlet(0, getPath(i));
			return;
		}
	}

	outlet(0, getPath(array.length-1));
}

function getPath(i) {
	// return "power" + "000".slice(0, -i.toString().length) + i.toString() + ".dat";
	return i;
}