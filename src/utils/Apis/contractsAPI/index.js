import { get, post, put, del } from '../caller';

const contractsAPI = {
	getProcessing: async (token) => {
		const endpoint = '/contract/all';
		return await get(endpoint, {}, { Authorization: 'Bearer ' + token });
	},

	getOne: async (id, token) => {
		const endpoint = `/contract/${id}`;
		return await get(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
	post: async (data, token) => {
		const endpoint = '/contract';
		return await post(endpoint, data, {
			Authorization: 'Bearer ' + token,
		});
	},
	// put: async (data, token) => {
	// 	const endpoint = '/job-offering';
	// 	return await put(endpoint, data, {
	// 		Authorization: 'Bearer ' + token,
	// 	});
	// },
	delete: async (id, token) => {
		const endpoint = '/contract/' + id;
		return await del(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
};
export default contractsAPI;
