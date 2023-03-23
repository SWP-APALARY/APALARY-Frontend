import LocalStorageUtils from '../../LocalStorage/utils';
import { get, post, put } from '../caller';

const token = 'Bearer ' + LocalStorageUtils.getItem('token');

const applicantAPI = {
	getProcessing: async () => {
		const endpoint = '/applicant/processing';
		return await get(endpoint, {}, { Authorization: token });
	},
	getAccepted: async () => {
		const endpoint = '/applicant/accepted';
		return await get(endpoint, {}, { Authorization: token });
	},
	getApproved: async () => {
		const endpoint = '/applicant/approved';
		return await get(endpoint, {}, { Authorization: token });
	},
	getRejected: async () => {
		const endpoint = '/applicant/rejected';
		return await get(endpoint, {}, { Authorization: token });
	},
	getOne: async (id) => {
		const endpoint = `/applicant/${id}`;
		return await get(
			endpoint,
			{},
			{
				Authorization: token,
			}
		);
	},
	accept: async (id, isAccepted) => {
		const endpoint = `/applicant/accept?applicantId=${id}&isAccepted=${isAccepted}`;
		return await put(endpoint, {}, { Authorization: token });
	},
	approve: async (id, isApproved) => {
		const endpoint = `/applicant/approve?applicantId=${id}&isApproved=${isApproved}`;
		return await put(endpoint, {}, { Authorization: token });
	},
	reject: async (id, reason) => {
		const endpoint = `/applicant/reject?applicantId=${id}`;
		return await put(endpoint, { reason }, { Authorization: token });
	},
	createApplicant: async (body) => {
		const endpoint = `/applicant`;
		try {
			return await post(endpoint, body);
		} catch (error) {
			console.log(error);
			return false;
		}
	},
};

export default applicantAPI;
