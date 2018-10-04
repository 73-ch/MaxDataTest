const Max = require('max-api');
const FS = require('fs');
const myModule = require('./shareModule.js');
const Spline = require('cubic-spline');

let times = [];
let waves = [];

let powerspec_name = "CDM";

let powerspecs = [];

// dataのパスの指定
const file_paths = {
	"waves": "../data/scales/waves.dat",
	"times": "../data/scales/times.dat",
	"powerspecs": {
		"CDM": "../data/powerspecs/CDM.dat",
		"baryon": "../data/powerspecs/baryon.dat",
		"neutrino": "../data/powerspecs/neutrino.dat",
		"photon": "../data/powerspecs/photon.dat",
		"total": "../data/powerspecs/total.dat"
	}
}

let time_mode = 2;

const time_modes = {
	"index": 0,
	"redshift": 1,
	"cosmictime": 2
};

Max.addHandler("init", () => {
	times = [];
	waves = [];
	powerspec_name = null;
	powerspecs = [];
});

Max.addHandler("loadFiles", () => {
	if (powerspec_name) loadPowerspecFile();
	loadTimeFile();
	loadWaveFile();
});

Max.addHandler("time", (input) => {
	let time;

	if (time_mode === time_modes["redshift"] || time_mode === time_modes["cosmictime"]) {
		time = input === 0 ? 0.00000 : Math.log(input);
	} else {
		time = input;
	}

	const rev = time_mode === 1 ? -1.0: 1.0;

	const index = myModule.getIndex(time, times, rev);

	const ret_array = getPowerspec(time, index);

	Max.outlet(ret_array);
});

const getPowerspec = (time, index) => {
	const length = times.length;
	const tmp_times = times.slice(Math.max(index-2,0),Math.min(index+2, length));
	return powerspecs.map((a, i) => Spline(time, tmp_times, powerspecs[i].slice(Math.max(index-2,0),Math.min(index+2, length))));
	// return powerspecs.map((a, i) => powerspecs[i][index]);
}


Max.addHandler("redshift", (redshift) => {

});

// Max.addHandler([MESSAGE_TYPES.NUMBER], (time) => {
// 	Max.output(Spline(time,times,powerspecs[0]))
// });

Max.addHandler("setMaterial", (_powerspec_name) => {
	if (file_paths["powerspecs"][_powerspec_name]) {
		powerspec_name = _powerspec_name;
		powerspecs = [];

		console.log(powerspec_name);
		loadPowerspecFile();

		// console.log(powerspecs[0].length);
	}
});

const outputData = () => {

}

const loadPowerspecFile = async () => {
	// console.log(file_paths["powerspecs"][powerspec_name]);
	const powerspec_data_text = await myModule.fetchFile(file_paths["powerspecs"][powerspec_name]);

	powerspecs = myModule.createArrayFromDatFile(powerspec_data_text);

	// row:time, column:wave => row:wave, column:time
	powerspecs = myModule.transpose2DArray(powerspecs);

	return true;
};

const loadTimeFile = async () => {
	const time_data_text = await myModule.fetchFile(file_paths["times"]);
	let time_data = myModule.createArrayFromDatFile(time_data_text);

	times = setTimeData(time_data);

	return true;
}

const setTimeData = (times_array) => {
	// row:times column:[index,redshift,cosmictime] =>  row:[index,redshift,cosmictime], column :times
	const time_data = myModule.transpose2DArray(times_array);

	if (time_data[time_mode] === "index") {
		return time_data[time_mode];
	} else {
		return time_data[time_mode].map(a => a === 0 ? 0 : Math.log(a));
	}
}


const loadWaveFile = async () => {
	return true;
}
