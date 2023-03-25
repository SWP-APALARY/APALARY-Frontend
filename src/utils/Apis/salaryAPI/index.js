import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const salaryAPI = {
	getMonth: async (month) => {
		const endpoint = `/salary/self/month-and-year?month=${month}&year=2023`;
		//fix params
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getByMonth: async (month, year) => {
		const endPoint = `/salary/month-and-year`;
		return await get(endPoint, {}, { Authorization: token }, { month, year });
	},
	getOneByMonth: async (salaryId, month, year) => {
		const endPoint = `/salary/employee`;
		return await get(endPoint, {}, { Authorization: token }, { salaryId });
	},
	get: async () => {
		const endpoint = '/salary/self';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getTotal: async () => {
		const endpoint = `/salary/detail?year=2023`;
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};
export default salaryAPI;
