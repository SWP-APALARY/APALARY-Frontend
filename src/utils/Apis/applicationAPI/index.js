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
	getOne: async (id, token) => {
		const endpoint = `/application/${id}`;
		return await get(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
	getAllType: async (token) => {
		const endpoint = '/application-type';
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
