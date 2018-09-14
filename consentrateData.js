inlets = 1;
outlets = 1;

var file;
var array = [];

function readFile(file_path) {
	file = new File(file_path);
	file.open();
	if (file.isopen) {
		outlet(0, file.name);
		var str;
		while(file.position < file.eof) {
			str = file.readline();
			if (str){
				var a = str.split(" ");
				array.push(a);
			}
		}
	} else {
		error('could not find the file "' + file_path + '"\n');
	}

}

function getLine(line_num) {
	if (array[line_num]) {
		outlet(0, array[line_num]);
	} else {
		error('out of range; line num:' + line_num);
	}

}