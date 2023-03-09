import { routeKey } from '../components/Layout/ManagerItems';
import Applicants from '../pages/Applicant';
import ApplicantDetails from '../pages/Applicant/Detail';
import CreateApplication from '../pages/Application/Creating';
import ApplicationDayLeave from '../pages/Application/DayLeave';
import ApplicationRecruitment from '../pages/Application/Recruitment';
import ApplicationSalary from '../pages/Application/SalaryIncreasing';
import Contract from '../pages/Contract/Contract';
import Contracts from '../pages/Contracts';
import ContractCreation from '../pages/Contracts/Create';
import ContractDetails from '../pages/Contracts/detail';
import EmDashboard from '../pages/EmDashboard';
import Salary from '../pages/EmSalary/Salary';
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
		path: routeKey.applications,
		Element: <ApplicationSalary />,
	},
	{
		path: routeKey.applicationSalaryIncreasing,
		Element: <ApplicationSalary />,
	},
	{
		path: routeKey.applicationCreating,
		Element: <CreateApplication />,
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
		path: routeKey.posts,
		Element: <JobOffering />,
	},
	{
		path: routeKey.employeesContracts,
		Element: <Contracts />,
	},
	{
		path: routeKey.contractsSpecific,
		Element: <ContractDetails />,
	},
	{
		path: routeKey.contractsCreate,
		Element: <ContractCreation />,
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
	{
		path: routeKey.applicationDayLeave,
		Element: <ApplicationDayLeave />,
	},
	{
		path: routeKey.applicationRecruitment,
		Element: <ApplicationRecruitment />,
	},
];
export const employeeRoutes = [
	{
		path: routeKey.dashBoard,
		Element: <EmDashboard />,
	},
];
