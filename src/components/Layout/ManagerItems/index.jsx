import {
	AppstoreOutlined,
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
	employeesContracts: '/employees/contracts',
	contractsSpecific: '/employees/contracts/:id',
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
	posts: '/posts',
	postsCreate: '/posts/create',
	postsEdit: '/posts/:id/edit',
	postsSpecific: '/posts/:id',
	applicants: '/applicants',
	applicantsSpecific: '/applicants/:id',
	profile: '/profile',
	feedBack: '/feedback',
};

const roleHrManager = Object.values(roles).filter(
	(role) => role === roles.HR_EMPLOYEE || role === roles.HR_MANAGER || role === roles.CEO
);
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

export const generalItems = [
	getMenuItem('Dashboard', routeKey.dashBoard, <PieChartOutlined />),
	getMenuItem('Profile', routeKey.profile, <AppstoreOutlined />),
];

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
		roleHrManager
	),
	getMenuItem(
		'Applications',
		routeKey.applications,
		<MenuFoldOutlined />,
		[
			getMenuItem('Salary increasing', routeKey.applicationSalaryIncreasing),
			getMenuItem('Day leave', routeKey.applicationDayLeave),
			getMenuItem('Recruitment', routeKey.applicationRecruitment),
			getMenuItem('Create Application', routeKey.applicationCreating),
		],
		roleHrManager
	),
	getMenuItem(
		'Create Application',
		routeKey.applicationCreating,
		<MenuFoldOutlined />,
		null,
		roleEmployee
	),
	getMenuItem('Posts', routeKey.posts, <SendOutlined />, null, roleHrManager),
	getMenuItem('Applicants', routeKey.applicants, <UsergroupAddOutlined />, null, roleHrManager),
	getMenuItem('Feedback', routeKey.feedBack, <ContainerOutlined />, null, [
		...roleEmployee,
		...roleHrManager,
	]),
	getMenuItem('Profile', routeKey.profile, <AppstoreOutlined />, null, general),
];

export const normalRoleItem = [
	getMenuItem('Dashboard', routeKey.dashBoard, <PieChartOutlined />),
	getMenuItem('Profile', routeKey.profile, <AppstoreOutlined />),
	getMenuItem('Create Application', routeKey.applicationCreating, <MenuFoldOutlined />),
	getMenuItem('Feedback', routeKey.feedBack, <ContainerOutlined />),
];
export const residentItem = [
	getMenuItem('Dashboard', routeKey.dashBoard, <PieChartOutlined />),
	getMenuItem('Profile', routeKey.profile, <AppstoreOutlined />),
];

export const roleMenuItems = {};
