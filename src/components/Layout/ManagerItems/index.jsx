import {
	AppstoreOutlined,
	AuditOutlined,
	ContainerOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	SendOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from '@ant-design/icons';

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

export const routeKey = {
	homepage: '/homepage',
	dashBoard: '/dashboard',
	employees: '/employees',
	employeesSpecific: '/employees/:id',
	employeesAll: '/employees/all',
	employeesContracts: '/contracts',
	contractsSpecific: '/contracts/:id',
	contractsCreate: '/contracts/create',
	contract: '/contract',
	salary: '/salary',
	employeesSalaries: '/employees/salaries',
	employeesSalariesDetail: '/employees/salaries/:id',
	applications: '/application',
	applicationSalaryIncreasing: '/application/salary-increasing',
	applicationCreating: '/application/create',
	applicationDayLeave: '/application/day-leave',
	applicationRecruitment: '/application/recruitment',
	applicationSent: '/application/sent',
	reports: '/reports',
	posts: '/posts',
	postsCreate: '/posts/create',
	postsEdit: '/posts/:id/edit',
	postsSpecific: '/posts/:id',
	applicants: '/applicants',
	applicantsSpecific: '/applicants/:id',
	profile: '/profile',
	feedBack: '/feedback',
	reDashboard: '/reDashboard',
	reProfile: '/reProfile',
};

const roleManger = Object.values(roles).filter(
	(role) => role === roles.HR_MANAGER || role === roles.MANAGER || role === roles.CEO
);
const roleHrManager = Object.values(roles).filter(
	(role) => role === roles.HR_EMPLOYEE || role === roles.HR_MANAGER
);
const roleMangerCEO = [...roleHrManager, roles.CEO];
const roleEmployee = Object.values(roles).filter(
	(role) => role === roles.EMPLOYEE || role === roles.MANAGER
);
const general = Object.values(roles);

export const getMenuItem = (label, key, icon, children, roles) => {
	return {
		label,
		key,
		icon,
		children,
		roles,
	};
};
const applicationItems = [
	getMenuItem('Salary increasing', routeKey.applicationSalaryIncreasing),
	getMenuItem('Day leave', routeKey.applicationDayLeave),
	getMenuItem('Recruitment', routeKey.applicationRecruitment),
	getMenuItem('Create', routeKey.applicationCreating),
	getMenuItem('Sent', routeKey.applicationSent),
];
const applicationItemsForEmployee = applicationItems.filter(
	(item) => item.key === routeKey.applicationSent || item.key === routeKey.applicationCreating
);
export const managerHrItems = [
	getMenuItem('Dashboard', routeKey.dashBoard, <PieChartOutlined />, null, general),
	getMenuItem(
		'Employees',
		routeKey.employees,
		<UserOutlined />,
		[
			getMenuItem('All', routeKey.employeesAll),
			getMenuItem('Contracts', routeKey.employeesContracts),
			getMenuItem('Salaries', routeKey.employeesSalaries),
		],
		roleMangerCEO
	),
	getMenuItem('Applications', routeKey.applicationSalaryIncreasing, <MenuFoldOutlined />, null, [
		roles.CEO,
	]),
	getMenuItem(
		'Applications',
		routeKey.applicationSalaryIncreasing,
		<MenuFoldOutlined />,
		applicationItems,
		roleHrManager
	),
	getMenuItem(
		'Applications',
		routeKey.applications,
		<MenuFoldOutlined />,
		applicationItemsForEmployee,
		roleEmployee
	),
	getMenuItem('Posts', routeKey.posts, <SendOutlined />, null, [
		...roleHrManager,
		roles.MANAGER,
		roles.CEO,
	]),
	getMenuItem('Reports', routeKey.reports, <AuditOutlined />, null, roleManger),

	getMenuItem('Applicants', routeKey.applicants, <UsergroupAddOutlined />, null, roleHrManager),
	getMenuItem('Feedbacks', routeKey.feedBack, <ContainerOutlined />, null, [
		...roleEmployee,
		...roleHrManager,
	]),
	getMenuItem('Profile', routeKey.profile, <AppstoreOutlined />, null, general),
];

export const roleMenuItems = {};
