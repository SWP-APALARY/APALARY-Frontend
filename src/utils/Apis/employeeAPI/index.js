import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const employeeAPI = {
	get: async () => {
		const endpoint = '/employee';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getAll: async () => {
		const endpoint = '/employee/all';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};

export default employeeAPI;
