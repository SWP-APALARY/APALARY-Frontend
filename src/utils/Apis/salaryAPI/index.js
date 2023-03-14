import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const salaryAPI = {
	getByMonth: async (month, year) => {
		const endPoint = `/salary/month-and-year`;
		return await get(endPoint, {}, { Authorization: token }, { month, year });
	},
	getOneByMonth: async (employeeId, month, year) => {
		const endPoint = `/salary/employee`;
		return await get(endPoint, {}, { Authorization: token }, { employeeId, month, year });
	},
	get: async () => {
		const endpoint = '/salary/self';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};
export default salaryAPI;
