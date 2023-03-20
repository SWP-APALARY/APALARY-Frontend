import LocalStorageUtils from '../../LocalStorage/utils';
import { get, put, del, post } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const residentAPI = {
	get: async () => {
		const endpoint = '/resident';
		return await get(endpoint, {}, { Authorization: token }, {});
	},

	updateProfile: async (body) => {
		const endpoint = '/resident';
		return await put(endpoint, body, { Authorization: token }, {});
	},
};

export default residentAPI;
