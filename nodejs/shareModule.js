const Spline = require('cubic-spline');
const FS = require('fs');

exports.createArrayFromDatFile = (text_data) => {
	const return_array = [];

	const rows = text_data.split("\n");
	let tmp_row = [];
	for (let r of rows) {
		tmp_row = r.split(" ");

		parseFloatForEach(tmp_row);

		return_array.push(tmp_row);
	}

	return return_array;
}

exports.getIndex = (sample, array) => {
	let i = 0;

	while (array[i] < sample) {
		i++;
	}

	return i;
}

exports.fetchFile = (path) => {
	return new Promise(resolve => {
		FS.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.error(err);
			}
			resolve(data);
		});
	});
}

const parseFloatForEach = (arr) => {
	for (let i =0, len = arr.length; i < len; ++i) arr[i] = parseFloat(arr[i]);
}