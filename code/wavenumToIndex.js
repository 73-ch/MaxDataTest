inlets = 1;
outlets = 1;

var wave_nums = [];

function readFile(file_path) {
	wave_nums = [];

	file = new File(file_path);
	file.open();
	if (file.isopen) {
		// outlet(0, file.name);
		var str;
		while(file.position < file.eof) {
			str = file.readline();
			if (str){
				var a = str.split(" ");
				wave_nums.push(parseFloat(a[0]));
			}
		}
		outlet(0, wave_nums);
	} else {
		error('could not find the file "' + file_path + '"\n');
	}
}

function clear() {
	wave_nums = [];
}

var msg_float = function(r) {
	for (var i = 0; i < wave_nums.length; i++) {
		if (wave_nums[i] > r) {
			outlet(0, i);
			return;
		}
	}

	outlet(0, wave_nums.length);
}
