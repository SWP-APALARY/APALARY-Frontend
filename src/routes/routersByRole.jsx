import { routeKey } from '../components/Layout/ManagerItems';
import Applicants from '../pages/Applicant';
import ApplicantDetails from '../pages/Applicant/Detail';
import CreateApplication from '../pages/Application/Creating';
import ApplicationDayLeave from '../pages/Application/DayLeave';
import ApplicationRecruitment from '../pages/Application/Recruitment';
import ApplicationSalary from '../pages/Application/SalaryIncreasing';
import ApplyJob from '../pages/ApplyJob';
import CEODashboard from '../pages/CEODashboard';
import Contract from '../pages/Contract/Contract';
import Contracts from '../pages/Contracts';
import ContractCreation from '../pages/Contracts/Create';
import ContractDetails from '../pages/Contracts/detail';
import EmDashboard from '../pages/EmDashboard';
import Salary from '../pages/EmSalary/Salary';
import Feedback from '../pages/Feedback/Feedback.jsx';
import Home from '../pages/Home';
import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Homepage/dashboard';
import JobOfferingDetail from '../pages/Homepage/job-offering';
import JobOffering from '../pages/JobOffering';
import PostCreation from '../pages/JobOffering/CreatePages';
import PostDetail from '../pages/JobOffering/Detail';
import ListEmployee from '../pages/ListEmployee';
import EmployeeDetail from '../pages/ListEmployee/Detail';
import FormDisabledDemo from '../pages/Profile/Profile';
import Login from '../pages/login';

// public routes here
export const publicRoutes = [
	{
		path: '/homepage',
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

export const generalRoutes = [
	{
		path: '/dashboard',
		Element: <EmDashboard />,
	},
	{
		path: routeKey.profile,
		Element: <FormDisabledDemo />,
	},
];
// private routes here
export const hrManagerRoutes = [
	...generalRoutes,
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
		path: routeKey.feedBack,
		Element: <Feedback />,
	},

	{
		path: routeKey.contract,
		Element: <Contract />,
	},
	{
		path: routeKey.salary,
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
	{
		path: routeKey.employeesAll,
		Element: <ListEmployee />,
	},
	{
		path: routeKey.employees,
		Element: <ListEmployee />,
	},
	{
		path: routeKey.employeesSpecific,
		Element: <EmployeeDetail />,
	},
];
export const hrEmployeeRoutes = [...hrManagerRoutes];

export const employeeRoutes = [
	...generalRoutes,
	{
		path: routeKey.applicationCreating,
		Element: <CreateApplication />,
	},
	{
		path: routeKey.feedBack,
		Element: <Feedback />,
	},
];

export const managerRoutes = [
	...generalRoutes,
	{
		path: routeKey.applicationCreating,
		Element: <CreateApplication />,
	},
	{
		path: routeKey.feedBack,
		Element: <Feedback />,
	},
];

export const residentRoutes = [...generalRoutes];
export const ceoRoutes = [
	{
		path: routeKey.dashBoard,
		Element: <CEODashboard />,
	},
	{
		path: routeKey.profile,
		Element: <FormDisabledDemo />,
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
		path: routeKey.employees,
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
	{
		path: routeKey.applicationDayLeave,
		Element: <ApplicationDayLeave />,
	},
	{
		path: routeKey.applicationRecruitment,
		Element: <ApplicationRecruitment />,
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
];
