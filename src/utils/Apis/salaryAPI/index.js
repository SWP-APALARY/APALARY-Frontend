import { get } from '../caller';

const salaryAPI = {
	getByMonth: async (month, year, token) => {
		const endPoint = `/salary/month-and-year`;
		return await get(endPoint, {}, { Authorization: 'Bearer ' + token }, { month, year });
	},
	getOneByMonth: async (employeeId, month, year, token) => {
		const endPoint = `/salary/employee`;
		return await get(
			endPoint,
			{},
			{ Authorization: 'Bearer ' + token },
			{ employeeId, month, year }
		);
	},
};
export default salaryAPI;
