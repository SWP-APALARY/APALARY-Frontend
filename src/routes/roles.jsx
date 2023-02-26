import { routeKey } from '../components/Layout/ManagerItems';
import Applicants from '../pages/Applicant';
import ApplicantDetails from '../pages/Applicant/Detail';
import ApplyJob from '../pages/ApplyJob';
import EmDashboard from '../pages/EmDashboard';
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

export const roles = {
	HR_MANAGER: 'HR_MANAGER',
	HR_EMPLOYEE: 'HR_EMPLOYEE',
	EMPLOYEE: 'EMPLOYEE',
	MANAGER: 'MANAGER',
	ADMIN: 'ADMIN',
	GUEST: 'GUEST',
	RESIDENT: 'RESIDENT',
};
// public routes here
export const publicRoutes = [
	{
		path: routeKey.homepage,
		Element: <Homepage />,
	},
	{
		path: '/login',
		Element: <Login />,
	},
	{
		path: '/job-offering/detail/:id',
		Element: <JobOfferingDetail />,
	},
];

// private routes here
export const managerRoutes = [
	{
		path: routeKey.applicantsSpecific,
		Element: <ApplicantDetails />,
	},
	{
		path: routeKey.applicants,
		Element: <Applicants />,
	},
	{
		path: routeKey.dashBoard,
		Element: <EmDashboard />,
	},
	{
		path: routeKey.postsCreate,
		Element: <PostCreation />,
	},
	{
		path: routeKey.postsEdit,
		Element: <PostCreation />,
	},
	{
		path: routeKey.postsSpecific,
		Element: <PostDetail />,
	},
	{
		path: '/admin',
		Element: <Home />,
	},
	{
		path: routeKey.employeesAll,
		Element: <Home />,
	},

	{
		path: routeKey.posts,
		Element: <JobOffering />,
	},
	{
		path: '/feedback',
		Element: <Feedback />,
	},
	{
		path: '/profile',
		Element: <FormDisabledDemo />,
	},
];
export const employeeRoutes = [
	{
		path: routeKey.dashBoard,
		Element: <EmDashboard />,
	},
];
