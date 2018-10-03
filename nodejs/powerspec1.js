const Max = require('max-api');
const FS = require('fs');
const myModule = require('./shareModule.js');

let times = [];
let waves = [];

let powerspec_name = null;

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

Max.addHandler("loadFiles", () => {
	if (powerspec_name) loadPowerspecFile();
	loadTimeFile();
	loadWaveFile();
});

Max.addHandler("time", (time) => {

});

Max.addHandler("redshift", (redshift) => {

});

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
	console.log(file_paths["powerspecs"][powerspec_name]);
	const powerspec_data_text = await myModule.fetchFile(file_paths["powerspecs"][powerspec_name]);

	powerspecs = myModule.createArrayFromDatFile(powerspec_data_text);

	// console.log(powerspecs.length);
	// console.log(powerspecs[280].length);

	return true;
};

const loadTimeFile = async () => {
	const time_data_text = await myModule.fetchFile(file_paths["times"]);
	// console.log(time_data_text);
}

const loadWaveFile = async () => {

}
