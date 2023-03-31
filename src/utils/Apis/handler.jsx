import React, { useState } from 'react';

import { notification } from 'antd';
import { HttpStatusCode } from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

import toast from '../../components/Toast';
import usePersistedState from '../LocalStorage/usePersistedState';
import LocalStorageUtils from '../LocalStorage/utils';

// Whenever you use strict mode, it will render twice. So, the notification will show twice. But, it will not show twice in production mode. So, don't worry about it.
const apiHandler = async (api, action, successMessage, setLoading, ...rest) => {
	if (setLoading) {
		setLoading(true);
	}
	const result = await api[action](...rest)
		.then((response) => {
			if (response.status === 404) {
				throw new Error('API not found');
			}
			if (response.status === 403) {
				throw new Error('Forbidden');
			}
			if (response.status === 400) {
				throw new Error('Bad request');
			}
			if (successMessage && successMessage !== '') {
				toast(successMessage, 'success');
			}
			return response.data;
		})
		.catch((error) => {
			const status = error.response.status;
			toast(error.response.data ? error.response.data : error.message, 'error');
			if (status === 401 || status === 403 || status === 500) {
				LocalStorageUtils.clear();
				return window.reload();
			}
			if (status === 400) {
				throw new Error('400');
			}
			return null;
		})
		.finally(() => {
			if (setLoading) {
				setLoading(false);
			}
		});
	return result;
};

export default apiHandler;
