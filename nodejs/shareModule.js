const Spline = require('cubic-spline');

exports.createArrayFromDatFile = (text_data) => {
	const return_array = [];

	const rows = text_data.split("\n");
	let tmp_row = [];
	for (let r of rows) {
		tmp_row = r.split(" ");
		return_array.push(parseFloat(tmp_row));
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

exportt.fetchFile = async (path) => {
	FS.readFile(path, 'utf8', (err, data) => {
		if (data) {
			return data;
		}
	});
}
