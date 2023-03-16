import LocalStorageUtils from '../../LocalStorage/utils';
import { get, post, put, del } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const feedbackAPI = {
	get: async (month) => {
		const endpoint = `/feedback?month=${month}&year=2023`;
		return await get(endpoint, {}, { Authorization: token }, {});
	},
};
export default feedbackAPI;
