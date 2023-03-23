import LocalStorageUtils from '../../LocalStorage/utils';
import { post } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
export const authAPI = {
	changePassword: async (oldPassword, newPassword) => {
		const endpoint = '/auth/change-password';
		return await post(endpoint, { oldPassword, newPassword }, { Authorization: token });
	},
};
