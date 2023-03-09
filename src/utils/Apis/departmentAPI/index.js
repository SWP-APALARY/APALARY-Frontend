import LocalStorageUtils from '../../LocalStorage/utils';
import { get } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');

export const departmentAPI = {
	getAll: () => {
		const endpoint = '/department';
		return get(
			endpoint,
			{},
			{
				Authorization: `Bearer ${token}`,
			}
		);
	},
};
