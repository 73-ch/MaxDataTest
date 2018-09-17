inlets = 1;
outlets = 5;

var file;
var array = [];

var CDM = [];
var baryon = [];
var photon = [];
var neutrino = [];
var total = [];

var size = 280;


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

function storePowerspec(folder_path) {
	array = [];

	var file;
	for (var i = 0; i <= size; i++) {
		var file_path = folder_path + "power" + "000".slice(0, -i.toString().length) + i.toString() + ".dat";
		// outlet(0, file_path);

		file = new File(file_path);
		file.open();

		if (file.isopen) {
			var str;
			while(file.position < file.eof){
				str = file.readline();
				if (str) {
					var a = str.split(" ");
					// outlet(0, a.length);

					if (a.length !== 6) error('file format error; line does not have 6 properties.');
					Array.prototype.push.apply(array, a);

					// CDM.push(parseFloat(a[1]));
					// baryon.push(parseFloat(a[2]));
					// photon.push(parseFloat(a[3]));
					// neutrino.push(parseFloat(a[4]));
					// total.push(parseFloat(a[5]));

					CDM.push(a[1]);
					baryon.push(a[2]);
					photon.push(a[3]);
					neutrino.push(a[4]);
					total.push(a[5]);
				}
			}
		} else {
			error('could not find the file "' + file_path + '"\n');
		}
	}

	//outlet(0, array.length);
	// outlet(0, CDM);
	// outlet(1, baryon);
	// outlet(2, photon);
	// outlet(3, neutrino);
	// outlet(4, total);
}

function clear() {
	array = [];
}

function getLine(line_num) {
	if (line_num <= size) {
		// outが５の場合
		// outlet(0, CDM[line_num]);
		// outlet(1, baryon[line_num]);
		// outlet(2, photon[line_num]);
		// outlet(3, neutrino[line_num]);
		// outlet(4, total[line_num]);

		// outを[CDM, baryon, photon, neutrino, total]のリストを返す場合
		outlet(0, [CDM[line_num], baryon[line_num], photon[line_num], neutrino[line_num], total[line_num]]);
	} else {
		error('out of range; line num:' + line_num);
	}

}