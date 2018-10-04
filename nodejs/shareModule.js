const Spline = require('cubic-spline');
const FS = require('fs');

exports.createArrayFromDatFile = (text_data) => {
	const return_array = [];

	const rows = text_data.split("\n");
	let tmp_row = [];
	for (let r of rows) {
		tmp_row = r.split(" ");


		tmp_row = tmp_row.map(a => parseFloat(a));
		// parseFloatForEach(tmp_row);

		return_array.push(tmp_row);
	}

	return return_array;
};

exports.getIndex = (sample, array, rev) => {
	let i = 0;

	while (array[i] * rev < sample * rev) {
		i++;
	}

	return i;
};

exports.fetchFile = (path) => {
	return new Promise(resolve => {
		FS.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.error(err);
			}
			resolve(data);
		});
	});
};

exports.transpose2DArray = (arr) => {
	return arr[0].map((col, i) => arr.map(row => row[i]));
};