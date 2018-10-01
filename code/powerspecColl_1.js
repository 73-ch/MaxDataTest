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

		// debug
		// outlet(0, file_path);

		file = new File(file_path);
		file.open();

		if (file.isopen) {
			var str;
			var tmp_CDM = [];
			var tmp_baryon = [];
			var tmp_photon = [];
			var tmp_neutrino = [];
			var tmp_total = [];

			while(file.position < file.eof){
				str = file.readline();

				if (str) {
					var a = str.split(" ");
					// outlet(0, a.length);

					if (a.length !== 6) error('file format error; line does not have 6 properties.');
					Array.prototype.push.apply(array, a);

					// tmp_CDM.push(a[1]);
					// tmp_baryon.push(a[2]);
					// tmp_photon.push(a[3]);
					// tmp_neutrino.push(a[4]);
					// tmp_total.push(a[5]);

					tmp_CDM.push(parseFloat(a[1]));
					tmp_baryon.push(parseFloat(a[2]));
					tmp_photon.push(parseFloat(a[3]));
					tmp_neutrino.push(parseFloat(a[4]));
					tmp_total.push(parseFloat(a[5]));
				}
			}

			CDM.push(tmp_CDM);
			baryon.push(tmp_baryon);
			photon.push(tmp_photon);
			neutrino.push(tmp_neutrino);
			total.push(tmp_total);
		} else {
			error('could not find the file "' + file_path + '"\n');
		}
	}
}

function clear() {
	array = [];
	CDM = [];
	baryon = [];
	photon = [];
	neutrino = [];
	total = [];
}

function getLine(line_num) {
	if (line_num <= size * 300) {
		// outが５の場合
		// outlet(0, CDM[line_num].join(", "));
		// outlet(1, baryon[line_num].join(", "));
		// outlet(2, photon[line_num].join(", "));
		// outlet(3, neutrino[line_num].join(", "));
		// outlet(4, total[line_num].join(", "));

		outlet(0, CDM[line_num]);
		outlet(1, baryon[line_num]);
		outlet(2, photon[line_num]);
		outlet(3, neutrino[line_num]);
		outlet(4, total[line_num]);

		// outを[CDM, baryon, photon, neutrino, total]のリストを返す場合
		// outlet(0, [CDM[line_num], baryon[line_num], photon[line_num], neutrino[line_num], total[line_num]]);
	} else {
		error('out of range; line num:' + line_num);
	}

}