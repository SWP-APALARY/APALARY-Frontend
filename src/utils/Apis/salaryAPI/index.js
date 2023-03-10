import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const salaryAPI = {
	get: async () => {
		const endpoint = '/salary/self';
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};

export default salaryAPI;
