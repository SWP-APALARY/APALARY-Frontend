import { get } from '../caller';

export const departmentAPI = {
	getAll: (token) => {
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
