import { post } from '../caller';

const contactAPI = {
	send: async (body) => {
		const endpoint = '/contact/send';
		return await post(endpoint, body, {});
	},
};

export default contactAPI;
