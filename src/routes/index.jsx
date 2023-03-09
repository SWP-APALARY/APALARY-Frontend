import { useEffect, useState } from 'react';

import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import LayoutEveryone from '../components/Layout/LayoutEveryone';
import LayoutManager from '../components/Layout/LayoutManager';
import ErrorPage from '../pages/Errors';
import usePersistedState from '../utils/LocalStorage/usePersistedState';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ceoRoutes, employeeRoutes, managerRoutes, publicRoutes, roles } from './roles';

const AppRoutes = () => {
	const [role, setRole] = usePersistedState('role');
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<Navigate to={'/dashboard'} />} />
				<Route path={''} element={<PrivateRoute />}>
					<Route element={<LayoutManager />}>
						{role === roles.CEO &&
							ceoRoutes.map((route, index) => (
								<Route
									key={index + route.path + 'ceo'}
									element={route.Element}
									path={route.path}
								/>
							))}
					</Route>
				</Route>
				<Route path={''} element={<PrivateRoute />}>
					<Route element={<LayoutManager />}>
						{role === roles.HR_MANAGER &&
							managerRoutes.map((route, index) => (
								<Route
									key={index + route.path + 'manager'}
									element={route.Element}
									path={route.path}
								/>
							))}
					</Route>
				</Route>
				<Route path={''} element={<PrivateRoute />}>
					<Route element={<LayoutManager />}>
						{role === roles.HR_EMPLOYEE &&
							employeeRoutes.map((route, index) => (
								<Route key={index} element={route.Element} path={route.path} />
							))}
					</Route>
				</Route>
				<Route path={''} element={<PublicRoute />}>
					<Route element={<LayoutEveryone />}>
						{publicRoutes.map((route, index) => (
							<Route
								key={index + route.path + 'public'}
								element={route.Element}
								path={route.path}
							/>
						))}
					</Route>
				</Route>
				<Route path={'/error/:statusCode'} element={<ErrorPage />} />
				<Route path={'*'} element={<Navigate to='/error/404' />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
