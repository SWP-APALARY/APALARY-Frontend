import { Space } from 'antd';
import { Link } from 'react-router-dom';

import { routeKey } from '../../../components/Layout/ManagerItems';
import moneyConverter from '../../../utils/moneyConverter';

export const SalaryListColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'employeeName',
		key: 'employeeName',
		sorter: (a, b) => a.employeeName.localeCompare(b.employeeName),
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Total Amount',
		dataIndex: 'net',
		key: 'net',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.net - b.net,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Bonus',
		dataIndex: 'bonus',
		key: 'bonus',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.bonus - b.bonus,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Penalty',
		dataIndex: 'penalty',
		key: 'penalty',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.penalty - b.penalty,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		render: (text, record) => {
			return (
				<Space size='middle'>
					<Link to={`${routeKey.employeesSalaries}/${record.id}`}>Detail</Link>
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
