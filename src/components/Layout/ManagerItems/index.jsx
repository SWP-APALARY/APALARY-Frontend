import {
	AppstoreOutlined,
	ContainerOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	SendOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from '@ant-design/icons';

export const routeKey = {
	homepage: '/homepage',
	dashBoard: '/dashboard',
	employees: '/employees',
	employeesAll: '/employees/all',
	employeesContracts: '/employees/contracts',
	employeesSalaries: '/employees/salaries',
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
};

export const getMenuItem = (label, key, icon, children, type) => {
	return {
		label,
		key,
		icon,
		children,
		type,
	};
};
export const managerItems = [
	getMenuItem('Dashboard', routeKey.dashBoard, <PieChartOutlined />),
	getMenuItem('Employees', routeKey.employees, <UserOutlined />, [
		getMenuItem('All', routeKey.employeesAll),
		getMenuItem('Contracts', routeKey.employeesContracts),
		getMenuItem('Salaries', routeKey.employeesSalaries),
	]),
	getMenuItem('Applications', routeKey.applications, <MenuFoldOutlined />, [
		getMenuItem('Salary increasing', routeKey.applicationSalaryIncreasing),
		getMenuItem('Day leave', routeKey.applicationDayLeave),
		getMenuItem('Recruitment', routeKey.applicationRecruitment),
		getMenuItem('Create', routeKey.applicationCreating),
	]),
	getMenuItem('Posts', routeKey.posts, <SendOutlined />),
	getMenuItem('Applicants', routeKey.applicants, <UsergroupAddOutlined />),
];
