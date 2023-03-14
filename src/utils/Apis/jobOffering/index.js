import LocalStorageUtils from '../../LocalStorage/utils';
import { del, get, post, put } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');

const jobOfferingApi = {
	getJobOffering: async () => {
		const endpoint = '/job-offering';
		return await get(endpoint);
	},
	getOne: async (id) => {
		const endpoint = '/job-offering/' + id;
		return await get(endpoint);
	},
	post: async (data) => {
		const endpoint = '/job-offering';
		return await post(endpoint, data, {
			Authorization: token,
		});
	},
	put: async (data) => {
		const endpoint = '/job-offering';
		return await put(endpoint, data, {
			Authorization: token,
		});
	},
	delete: async (id) => {
		const endpoint = '/job-offering/' + id;
		return await del(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
};

export default jobOfferingApi;
