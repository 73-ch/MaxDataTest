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

let time_mode = 0;

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
	// loadWaveFile();
});

Max.addHandler("time", (input) => {
	let time;

	if (time_mode === time_modes["redshift"] || time_mode === time_modes["cosmictime"]) {
		time = input === 0 ? 0.00000 : Math.log(input);
	} else {
		time = input;
	}

	const rev = time_mode === 1 ? true: false;

	const index = myModule.getIndex(time, times, rev);

	const ret_array = getPowerspec(time, index);

	// console.log(ret_array.length);

	Max.outlet(ret_array);
});

Max.addHandler("setMaterial", (_powerspec_name) => {
	if (file_paths["powerspecs"][_powerspec_name]) {
		powerspec_name = _powerspec_name;
		powerspecs = [];

		console.log(powerspec_name);
		loadPowerspecFile();
	}
});

Max.addHandler("setTimeMode", (_mode_name) => {
	if (_mode_name in time_modes) {
		time_mode = time_modes[_mode_name];

		loadTimeFile().then(()=>{
			console.log(`${_mode_name} was loaded.`);
		});
	} else {
		console.error("time mode out of range");
	}
});

const getPowerspec = (time, index) => {
	const length = times.length;
	let tmp_times = times.slice(Math.max(index-2,0),Math.min(index+2, length));

	if (time_mode === time_modes["redshift"]) {
		tmp_times = tmp_times.reverse();
		return powerspecs.map((a, i) => Math.max(0,Spline(time, tmp_times, powerspecs[i].slice(Math.max(index-2,0),Math.min(index+2, length)).reverse())));
	} else {
		return powerspecs.map((a, i) => Math.max(0,Spline(time, tmp_times, powerspecs[i].slice(Math.max(index-2,0),Math.min(index+2, length)))));
	}
}

const loadPowerspecFile = async () => {
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
	if (time_mode === time_modes["index"]) {
		return time_data[time_mode];
	} else {
		return time_data[time_mode].map(a => a === 0 ? 0 : Math.log(a));
	}
}

// const loadWaveFile = async () => {
// 	return true;
// }
