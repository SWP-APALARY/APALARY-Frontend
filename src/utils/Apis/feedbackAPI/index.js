import LocalStorageUtils from '../../LocalStorage/utils';
import { get, post } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const feedbackApi = {
	getOfUser: async (employeeId) => {
		const endpoint = `/feedback/${employeeId}`;
		return await get(endpoint, {}, { Authorization: token });
	},
	createOne: async (body) => {
		const endpoint = '/feedback';
		return await post(endpoint, body, { Authorization: token });
	},
};

export default feedbackApi;
