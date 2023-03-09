import LocalStorageUtils from '../../LocalStorage/utils';
import { del, get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const employeeAPI = {
	get: async () => {
		const endpoint = '/employee';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getById: async (id) => {
		const endpoint = `/employee/${id}`;
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getAll: async () => {
		const endpoint = '/employee/all';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	deleteById: async (id) => {
		const endpoint = `/employee/${id}`;
		return await del(endpoint, {}, { Authorization: token }, {});
	},
};

export default employeeAPI;
