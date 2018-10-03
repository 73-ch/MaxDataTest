const Max = require('max-api');
const FS = require('fs');
const myModule = require('./shareModule.js');

let store_data = [];

Max.addHandler("text", (...args) => {
	console.log("hello");

	Max.outlet(...args);
});

Max.addHandler("storeData", (...args) => {
	const url = args[0];

	FS.readFile(url, 'utf8', (err, data) => {
		try {
			store_data = myModule.createArrayFromDatFile(data);
			console.log(store_data.length);
			console.log(store_data[0].length);
		} catch (e) {
			console.error(e);
		}
	});
});

Max.addHandler("get", (...args) => {
	Max.outlet(store_data[args[0]]);
});
