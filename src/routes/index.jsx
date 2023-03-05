import { useEffect, useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import ErrorPage from '../pages/Errors';
import usePersistedState from '../utils/LocalStorage/usePersistedState';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { employeeRoutes, managerRoutes, publicRoutes, roles } from './roles';

const AppRoutes = () => {
	const [role, setRole] = usePersistedState('role');
	return (
		<Routes>
			<Route path={''} element={<PrivateRoute role={roles.HR_MANAGER} />}>
				{role === roles.HR_MANAGER &&
					managerRoutes.map((route, index) => (
						<Route
							key={index + route.path + 'manager'}
							element={route.Element}
							path={route.path}
						/>
					))}
			</Route>
			<Route path={''} element={<PrivateRoute role={roles.HR_EMPLOYEE} />}>
				{role === roles.HR_EMPLOYEE &&
					employeeRoutes.map((route, index) => (
						<Route key={index} element={route.Element} path={route.path} />
					))}
			</Route>
			<Route path={''} element={<PublicRoute />}>
				{publicRoutes.map((route, index) => (
					<Route
						key={index + route.path + 'public'}
						element={route.Element}
						path={route.path}
					/>
				))}
			</Route>
			<Route path={'/error/:statusCode'} element={<ErrorPage />} />
			<Route path={'*'} element={<Navigate to='/error/404' />} />
		</Routes>
	);
};

export default AppRoutes;
