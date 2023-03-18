import LocalStorageUtils from '../../LocalStorage/utils';
import { get, post, put } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');

const applicationAPI = {
	getAll: async () => {
		const endpoint = '/application';
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	getOne: async (id) => {
		const endpoint = `/application/${id}`;
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	getAllType: async () => {
		const endpoint = '/application-type';
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	post: async (data) => {
		const endpoint = '/application';
		return await post(endpoint, data, {
			Authorization: token,
		});
	},
	getSalaryIncreasing: async (status) => {
		const endpoint = '/application/salary-increase/' + status;
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	getDayLeaves: async (status) => {
		const endpoint = '/application/day-leave/' + status;
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	getRecruitment: async (status) => {
		const endpoint = '/application/recruitment/' + status;
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	getSent: async () => {
		const endpoint = '/application/employee';
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	approveOne: async (id) => {
		const endpoint = `/application/approve/${id}`;
		return await put(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	disapproveOne: async (id) => {
		const endpoint = `/application/disapprove/${id}`;
		return await put(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	disapproveSalaryR2: async (id) => {
		const endpoint = `/application/disapprove/salary-increase/${id}`;
		return await put(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	approveSalaryR2: async (id) => {
		const endpoint = `/application/approve/salary-increase/${id}`;
		return await put(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
};

export default applicationAPI;
