import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const salaryAPI = {
	getAll: async () => {
		const endpoint = `/salary/self`;
		//fix params
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	get: async (month) => {
		const endpoint = `/salary/self/month-and-year?month=${month}&year=2023`;
		//fix params
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};

export default salaryAPI;
