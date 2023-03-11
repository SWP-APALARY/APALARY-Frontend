import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import { routeKey } from '../../components/Layout/ManagerItems';
import { gender } from '../../pages/Applicant/Detail/config';
import { getValueFromBlock } from '../../utils/DraftjsHelper';

const { Text } = Typography;

export const applicantColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: true,
		render: (value, record) => <Link to={`${routeKey.applicants}/${record.id}`}>{value}</Link>,
	},
	{
		title: 'Email',
		dataIndex: 'email',
		sorter: true,
	},
	{
		title: 'Phone',
		dataIndex: 'phone',
		sorter: true,
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		sorter: true,
		render: (value, record) => <Text>{gender[value]}</Text>,
	},
];

export const postColumns = [
	{
		title: 'Job title',
		dataIndex: 'title',
		sorter: true,
		render: (value, record) => <Link to={`${routeKey.posts}/${record.id}`}>{value}</Link>,
		width: '20%',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		ellipsis: true,
		render: (value) => <Text>{getValueFromBlock(JSON.parse(value))}</Text>,
	},
	{
		title: 'Salary',
		dataIndex: 'baseSalary',
	},
	{
		title: 'Max Employee',
		dataIndex: 'maxEmployee',
	},
	{
		title: 'Status',
		dataIndex: 'status',
	},
];
export const contractColumns = [
	{
		title: 'Name',
		dataIndex: 'nameOfEmployee',
		sorter: true,
		width: '20%',
	},
	{
		title: 'SignedDate',
		dataIndex: 'signedDate',
		sorter: true,
		width: '20%',
	},
	{
		title: 'StartDate',
		dataIndex: 'startDate',
		sorter: true,
		width: '20%',
	},
	{
		title: 'EndDate',
		dataIndex: 'endDate',
		sorter: true,
		width: '20%',
	},
];

const Gender = ['Male', 'Female', 'Other'];
export const employeeColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: true,
		render: (value, record) => <Link to={`/employees/${record.id}`}>{value}</Link>,
		width: '20%',
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		ellipsis: true,
		render: (value) => <Text>{Gender[value]}</Text>,
		width: '10%',
	},
	{
		title: 'Date of birth',
		dataIndex: 'dateOfBirth',
		width: '12%',
	},
	{
		title: 'Phone',
		dataIndex: 'phone',
		width: '14%',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		width: '20%',
	},
	{
		title: 'Role',
		dataIndex: 'role',
		width: '15%',
	},
];

export const paginationConfig = {
	showSizeChanger: true,
	showQuickJumper: true,
};
