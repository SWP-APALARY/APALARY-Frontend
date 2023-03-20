import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const contractAPI = {
	get: async () => {
		const endpoint = '/contract';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getById: async (id) => {
		const endpoint = `/contract`;
		return await get(endpoint, {}, { Authorization: token }, {});
	},
	getUnassigned: async () => {
		const endpoint = '/contract/unassigned';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};
export default contractAPI;
