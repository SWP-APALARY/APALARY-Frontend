import { get, post, put } from '../caller';

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
	post: async (data, token) => {
		const endpoint = '/application';
		return await post(endpoint, data, {
			Authorization: 'Bearer ' + token,
		});
	},
	getSalaryIncreasing: async (status, token) => {
		const endpoint = '/application/salary-increase/' + status;
		return await get(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
	getDayLeaves: async (status, token) => {
		const endpoint = '/application/day-leave/' + status;
		return await get(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
	getRecruitment: async (status, token) => {
		const endpoint = '/application/recruitment/' + status;
		return await get(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
	approveOne: async (id, token) => {
		const endpoint = `/application/approve/${id}`;
		return await put(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
	disapproveOne: async (id, token) => {
		const endpoint = `/application/disapprove/${id}`;
		return await put(
			endpoint,
			{},
			{
				Authorization: 'Bearer ' + token,
			}
		);
	},
};

export default applicationAPI;
