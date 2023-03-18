import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import LayoutEveryone from '../components/Layout/LayoutEveryone';
import LayoutManager from '../components/Layout/LayoutManager';
import { roles } from '../components/Layout/ManagerItems';
import ErrorPage from '../pages/ErrorPage';
import Homepage from '../pages/Homepage';
import usePersistedState from '../utils/LocalStorage/usePersistedState';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import {
	ceoRoutes,
	employeeRoutes,
	hrEmployeeRoutes,
	hrManagerRoutes,
	managerRoutes,
	publicRoutes,
	residentRoutes,
} from './routersByRole';

const AppRoutes = () => {
	const [role, setRole] = usePersistedState('role');
	const MainPage =
		role && role !== '' ? <Navigate to='/dashboard' /> : <Navigate to='/homepage' />;
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route exact path='/' element={<Navigate to={'/dashboard'} />} /> */}

				<Route exact path='/' element={MainPage} />
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
							hrManagerRoutes.map((route, index) => (
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
							hrEmployeeRoutes.map((route, index) => (
								<Route key={index} element={route.Element} path={route.path} />
							))}
					</Route>
				</Route>
				<Route path={''} element={<PrivateRoute />}>
					<Route element={<LayoutManager />}>
						{[roles.EMPLOYEE, roles.MANAGER].includes(role) &&
							managerRoutes.map((route, index) => (
								<Route key={index} element={route.Element} path={route.path} />
							))}
					</Route>
				</Route>
				<Route path={''} element={<PrivateRoute />}>
					<Route element={<LayoutManager />}>
						{role === roles.RESIDENT &&
							residentRoutes.map((route, index) => (
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
				<Route path={'*'} element={<LayoutEveryone />}>
					<Route path='*' key='error' element={<ErrorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
