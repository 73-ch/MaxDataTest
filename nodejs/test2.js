const Max = require('max-api');
const FS = require('fs');

let store_data = [];

Max.addHandler("text", (...args) => {
	console.log("hello");

	Max.outlet(...args);
});

Max.addHandler("storeData", (...args) => {
	const url = args[0];

	FS.readFile(url, 'utf8', (err, data) => {
		try {
			store_data = createArrayFromDatFile(data);
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

const createArrayFromDatFile = (text_data) => {
	const return_array = [];

	const rows = text_data.split("\n");
	let tmp_row = [];
	for (let r of rows) {
		tmp_row = r.split(" ");
		return_array.push(tmp_row);
	}

	return return_array;
}
