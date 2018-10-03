const Max = require('max-api');
const FS = require('fs');
const myModule = require('./shareModule.js');

let store_data = [];

let times = [];
let waves = [];

let powerspec_name = null;

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


});

Max.addHandler("time", (time) => {

});

Max.addHandler("redshift", (redshift) => {

});

Max.addHandler("setMaterial", (_powerspec_name) => {
	if (file_paths[powerspecs][_powerspec_name]) {
		powerspec_name = _powerspec_name;
		loadPowerspecFile();
	}
});



const outputData = () => {

}

const loadPowerspecFile = async () => {
	const powerspec_data = await myModule.fetchFile(file_paths["powerspecs"][powerspec_name]);

};

const loadTimeFile = async () => {

}

const loadWaveFile = async () => {

}
