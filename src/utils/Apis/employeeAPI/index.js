import LocalStorageUtils from '../../LocalStorage/utils';
import { get, put } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const employeeAPI = {
	get: async () => {
		const endpoint = '/employee';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getOne: async (id) => {
		const endpoint = `/employee/${id}`;
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	updateProfile: async (body) => {
		const endpoint = '/employee';
		return await put(endpoint, body, { Authorization: token }, {});
	},
};

export default employeeAPI;
