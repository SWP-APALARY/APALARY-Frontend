import { get } from '../caller';

const applicationAPI = {
	getAll: async (token) => {
		const endpoint = '/application';
		return await get(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
};

export default applicationAPI;
