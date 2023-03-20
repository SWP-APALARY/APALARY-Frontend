import { create } from 'zustand';

import LocalStorageUtils from '../LocalStorage/utils';

const tokenStorage = create((set) => ({
	token: LocalStorageUtils.getItem('token'),
	setToken: (token) => {
		LocalStorageUtils.setItem('token', token);
		set({ token });
	},
}));

export default tokenStorage;
