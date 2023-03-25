import LocalStorageUtils from '../../LocalStorage/utils';
import { get, post, put, del } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');
const contractsAPI = {
	getProcessing: async () => {
		const endpoint = '/contract/all';
		return await get(endpoint, {}, { Authorization: token });
	},
	getAccepted: async () => {
		const endpoint = '/contract/all/inactive';
		return await get(endpoint, {}, { Authorization: token });
	},
	getContractType: async () => {
		const endpoint = '/contract/contract-type';
		return await get(endpoint, {}, { Authorization: token });
	},
	getOne: async (id) => {
		const endpoint = `/contract/${id}`;
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	post: async (data) => {
		const endpoint = '/contract';
		return await post(
			endpoint,
			data,
			{
				Authorization: token,
			},
			{}
		);
	},
	// put: async (data) => {
	// 	const endpoint = '/job-offering';
	// 	return await put(endpoint, data, {
	// 		Authorization: token,
	// 	});
	// },
	delete: async (id) => {
		const endpoint = '/contract/' + id;
		return await del(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	resign: async ({ employeeId, ...body }) => {
		const endpoint = `/contract/resign?employeeId=${employeeId}`;
		return await post(endpoint, body, { Authorization: token }, {});
	},
};
export default contractsAPI;
