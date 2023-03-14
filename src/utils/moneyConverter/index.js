const moneyConverter = (value) => {
	if (value === undefined) return 0;
	let result = '';
	while (value > 1000) {
		let num = String(value % 1000);
		while (num.length < 3) {
			num = '0' + num;
		}
		result = '.' + num + result;
		value = Math.floor(value / 1000);
	}
	result = value + result;
	return result;
};
export default moneyConverter;
