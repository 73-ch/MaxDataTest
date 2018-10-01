inlets = 1;
outlets = 1;

var data = [];

function readFile(file_path) {
	file = new File(file_path);
	file.open();
	if (file.isopen) {
		outlet(0, file.name);
		var str;

		var array = [];
		while(file.position < file.eof) {
			str = file.readline();
			if (str){
				var a = str.split("\n");
				array.push(parseFloat(a));
			}
		}

		outlet(0, array.length);

		storeData(array);
	} else {
		error('could not find the file "' + file_path + '"\n');
	}

}

function storeData(array) {
	for (var i  = 0; i < 128; i++) {
		var x = [];
		for (var j = 0; j < 128; j++) {
			var y = [];
			for (var k = 0; k < 128; k++) {
				y.push(array[i*16,384+j*128+k]);
			}
			x.push(y);
		}
		data.push(x);
	}

	outlet(0, data.length);
}



function clear() {
	data = [];
}

function x(val) {
	outlet(0, data[val]);
}

function xy(v1, v2) {
	outlet(0, data[v1][v2]);
}

function xyz(v1,v2,v3) {
	outlet(0, data[v1][v2][v3]);
}