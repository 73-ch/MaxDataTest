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
	loadWaveFile();
});

Max.addHandler("time", (time) => {
	// console.log(powerspecs[0].length);
	// console.log(times.length);
// console.log(Spline(time,times,powerspecs[0]));

	// Max.outlet(Spline(time,times,powerspecs[0]))
	let index = myModule.getIndex(time, times);
	// console.log(index);


	let ret_array = powerspecs.map((a, i) => Spline(time, times.slice(index-2,index+2), powerspecs[i].slice(index-2,index+2)))

	Max.outlet(ret_array);
});

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

	console.log(powerspecs.length);
	console.log(powerspecs[0].length);

	return true;
};

const loadTimeFile = async () => {
	const time_data_text = await myModule.fetchFile(file_paths["times"]);
	let time_data = myModule.createArrayFromDatFile(time_data_text);
	// console.log(time_data.length);
	// console.log(time_data[0].length);

	time_data = myModule.transpose2DArray(time_data);

	times = time_data[time_mode];

	console.log(times.length);
	// console.log(time_data_text);
	return true;
}

const loadWaveFile = async () => {
	return true;
}
