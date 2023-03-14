import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const feedbackApi = {
	getOfUser: async (employeeId) => {
		const endpoint = `/feedback/${employeeId}`;
		return await get(endpoint, {}, { Authorization: token });
	},
};

export default feedbackApi;
