import { useEffect, useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import LayoutEveryone from '../components/Layout/LayoutEveryone';
import LayoutManager from '../components/Layout/LayoutManager';
import { routeKey } from '../components/Layout/ManagerItems';
import Applicants from '../pages/Applicant/indes';
import ApplyJob from '../pages/ApplyJob';
import ErrorPage from '../pages/Errors';
import Feedback from '../pages/Feedback/Feedback.jsx';
import Home from '../pages/Home';
import Homepage from '../pages/Homepage';
import JobOfferingDetail from '../pages/Homepage/job-offering';
import JobOffering from '../pages/JobOffering';
import PostCreation from '../pages/JobOffering/CreatePages';
import PostDetail from '../pages/JobOffering/Detail';
import FormDisabledDemo from '../pages/Profile/Profile';
import Login from '../pages/login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { managerRoutes, publicRoutes, roles } from './roles';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={''} element={<PrivateRoute role={roles.HR_MANAGER} />}>
				{managerRoutes.map((route, index) => (
					<Route key={index} element={route.Element} path={route.path} />
				))}
			</Route>
			<Route path={''} element={<PublicRoute />}>
				{publicRoutes.map((route, index) => (
					<Route key={index} element={route.Element} path={route.path} />
				))}
			</Route>
			<Route path={'/error/:statusCode'} element={<ErrorPage />} />
			<Route path={'*'} element={<Navigate to='/error/404' />} />
		</Routes>
	);
};

export default AppRoutes;
