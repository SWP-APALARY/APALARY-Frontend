import { routeKey } from '../components/Layout/ManagerItems';
import Applicants from '../pages/Applicant';
import ApplicantDetails from '../pages/Applicant/Detail';
import ApplyJob from '../pages/ApplyJob';
import CEODashboard from '../pages/CEODashboard';
import Contract from '../pages/Contract/Contract';
import Contracts from '../pages/Contracts';
import EmDashboard from '../pages/EmDashboard';
import Salary from '../pages/EmSalary/Salary';
import ErrorPage from '../pages/Errors';
import Feedback from '../pages/Feedback/Feedback.jsx';
import Home from '../pages/Home';
import Homepage from '../pages/Homepage';
import JobOfferingDetail from '../pages/Homepage/job-offering';
import JobOffering from '../pages/JobOffering';
import PostCreation from '../pages/JobOffering/CreatePages';
import PostDetail from '../pages/JobOffering/Detail';
import ListEmployee from '../pages/ListEmployee';
import EmployeeDetail from '../pages/ListEmployee/Detail';
import FormDisabledDemo from '../pages/Profile/Profile';
import Login from '../pages/login';

export const roles = {
	HR_MANAGER: 'HR_MANAGER',
	CEO: 'HEAD_MANAGER',
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
		path: routeKey.dashBoard,
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
		path: routeKey.employeesContracts,
		Element: <Contracts />,
	},
	{
		path: '/feedback',
		Element: <Feedback />,
	},
	{
		path: '/profile',
		Element: <FormDisabledDemo />,
	},
	{
		path: '/contract',
		Element: <Contract />,
	},
	{
		path: '/salary',
		Element: <Salary />,
	},
];
export const employeeRoutes = [
	{
		path: routeKey.dashBoard,
		Element: <EmDashboard />,
	},
];

export const ceoRoutes = [
	{
		path: routeKey.dashBoard,
		Element: <CEODashboard />,
	},
	{
		path: routeKey.posts,
		Element: <JobOffering />,
	},
	{
		path: routeKey.employeesAll,
		Element: <ListEmployee />,
	},
	{
		path: routeKey.employeesSpecific,
		Element: <EmployeeDetail />,
	},
	{
		path: routeKey.postsSpecific,
		Element: <PostDetail />,
	},
	{
		path: routeKey.applicantsSpecific,
		Element: <ApplicantDetails />,
	},
	{
		path: routeKey.applicants,
		Element: <Applicants />,
	},
];
