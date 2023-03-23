import LocalStorageUtils from '../../LocalStorage/utils';
import { post } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const authApi = {
	login: async (body) => {
		const endpoint = '/auth/login';
		return await post(endpoint, body);
	},
	changePassword: async (oldPassword, newPassword) => {
		const endpoint = '/auth/change-password';
		return await post(endpoint, { oldPassword, newPassword }, { Authorization: token });
	},
};

export default authApi;
