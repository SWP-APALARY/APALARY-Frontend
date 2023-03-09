import { Navigate, Outlet } from 'react-router';

import usePersistedState from '../utils/LocalStorage/usePersistedState';

const PrivateRoute = () => {
	const [token, setToken] = usePersistedState('token');
	if (!token || token === '') {
		return <Navigate to='/homepage' />;
	}
	return <Outlet />;
};

export default PrivateRoute;
