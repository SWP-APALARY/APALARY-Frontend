import { Space } from 'antd';
import { Link } from 'react-router-dom';

import { routeKey } from '../../../components/Layout/ManagerItems';

export const SalaryListColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Receive',
		dataIndex: 'receive',
		key: 'receive',
		render: (text, record) => {
			return <span>{text} VND</span>;
		},
	},
	{
		title: 'Bonus',
		dataIndex: 'bonus',
		key: 'bonus',
		render: (text, record) => {
			return <span>{text} VND</span>;
		},
	},
	{
		title: 'Receive Date',
		dataIndex: 'receiveDate',
		key: 'receiveDate',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		render: (text, record) => {
			return (
				<Space size='middle'>
					<Link to={`${routeKey.employeesSalaries}/${record.id}`}>View</Link>
				</Space>
			);
		},
	},
];

export const SalaryDetailForm = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		span: 24,
	},
	{
		title: 'Department',
		dataIndex: 'department',
		key: 'department',
		span: 10,
	},
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		span: 10,
	},
	{
		title: 'Receive Date',
		dataIndex: 'receiveDate',
		key: 'receiveDate',
		type: 'date',
		span: 18,
	},
	{
		title: 'Base Salary',
		dataIndex: 'baseSalary',
		key: 'baseSalary',
		type: 'number',
		span: 24,
	},
	{
		title: 'Assurance',
		dataIndex: 'assurance',
		key: 'assurance',
		type: 'number',
		span: 24,
	},
	{
		title: 'Tax',
		dataIndex: 'tax',
		key: 'tax',
		type: 'number',
		span: 24,
	},
	{
		title: 'Bonus',
		dataIndex: 'bonus',
		key: 'bonus',
		type: 'number',
		span: 24,
		wrapperCol: 20,
		detail: true,
	},
	{
		title: 'Penalty',
		dataIndex: 'penalty',
		key: 'penalty',
		type: 'number',
		span: 24,
		wrapperCol: 20,
		detail: true,
	},
	{
		title: 'Total receive',
		dataIndex: 'total',
		key: 'total',
		type: 'number',
		span: 24,
	},
];
