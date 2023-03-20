import { Navigate, Outlet } from 'react-router';

import usePersistedState from '../utils/LocalStorage/usePersistedState';

const PublicRoute = () => {
	const [token, setToken] = usePersistedState('token');
	if (!token) {
		return <Outlet />;
	}
	return <Navigate to='/dashboard' />;
};

export default PublicRoute;
