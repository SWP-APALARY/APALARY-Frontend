import { useEffect } from 'react';

import { Navigate, Outlet, useLoaderData, useLocation, useRouteLoaderData } from 'react-router';

import usePersistedState from '../utils/LocalStorage/usePersistedState';
import LocalStorageUtils from '../utils/LocalStorage/utils';

const PrivateRoute = (props) => {
	const { role } = props;
	const location = useLocation();
	const [userRole, setUserRole] = usePersistedState('role');
	const [token, setToken] = usePersistedState('token');
	useEffect(() => {
		setUserRole(LocalStorageUtils.getItem('role'));
		setToken(LocalStorageUtils.getItem('token'));
	}, [location.pathname]);
	if (!token || token === '') {
		return <Navigate to='/homepage' />;
	}
	if (userRole !== role) {
		return <Navigate to='/error/403' />;
	}
	return <Outlet />;
};

export default PrivateRoute;
