const moneyConverter = (value) => {
	if (value === undefined) return 0;
	let count = 0;
	let result = '';
	while (value > 1000) {
		let num = value % 1000;
		result = '.' + num + result;
		value = Math.floor(value / 1000);
		count++;
	}
	result = value + result;
	return result;
};
export default moneyConverter;
