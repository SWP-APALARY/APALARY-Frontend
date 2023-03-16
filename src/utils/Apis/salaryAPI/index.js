import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const salaryAPI = {
	get: async () => {
		const endpoint = '/salary/self/month-and-year?month=2&year=2023';
		//fix params
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};

export default salaryAPI;
