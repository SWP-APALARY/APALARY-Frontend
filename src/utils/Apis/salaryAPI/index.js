import { get } from '../caller';

const salaryAPI = {
	getByMonth: async (month, year, token) => {
		const endPoint = `/salary/month-and-year`;
		return await get(endPoint, {}, { Authorization: 'Bearer ' + token }, { month, year });
	},
};
export default salaryAPI;
