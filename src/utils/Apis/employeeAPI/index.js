import LocalStorageUtils from '../../LocalStorage/utils';
import { get, put, del, post } from '../caller';

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
	getById: async (id) => {
		const endpoint = `/employee/${id}`;
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getAll: async () => {
		const endpoint = '/employee/all';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getAllActive: async () => {
		const endpoint = '/employee/all/active';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getAllInactive: async () => {
		const endpoint = '/employee/all/inactive';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	deleteById: async (id) => {
		const endpoint = `/employee/${id}`;
		return await del(endpoint, {}, { Authorization: token }, {});
	},
	recoverById: async (id) => {
		const endpoint = `/employee/recover/${id}`;
		return await put(endpoint, {}, { Authorization: token }, {});
	},
	createOne: async (body) => {
		const endpoint = '/auth/create/employee';
		return await post(endpoint, body, { Authorization: token }, {});
	},
};

export default employeeAPI;
