import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = LocalStorageUtils.getItem('token');
const applicationAPI = {
	getAll: async () => {
		const endpoint = '/application';
		return await get(endpoint, {}, { Authorization: 'Bearer ' + token });
	},
};

export default applicationAPI;
