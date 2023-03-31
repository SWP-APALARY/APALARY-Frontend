import { Image, Typography } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import DefaultImage from '../../assets/default-avatar.jpg';
import { routeKey } from '../../components/Layout/ManagerItems';
import { gender } from '../../pages/Applicant/Detail/config';
import { getValueFromBlock } from '../../utils/DraftjsHelper';
import moneyConverter from '../../utils/moneyConverter';

import customParseFormat from 'dayjs/plugin/customParseFormat';

const { Text } = Typography;
dayjs.extend(customParseFormat);
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
		title: 'Department',
		dataIndex: 'jobOfferingDepartmentName',
		sorter: (a, b) => a.title.localeCompare(b.title),
		sortDirections: ['descend', 'ascend'],
		width: '20%',
	},
	{
		title: 'Interview Date',
		dataIndex: 'interviewDate',
		sorter: true,
		render: (value) => (
			<Text>
				{value ? dayjs(dayjs(value), 'DD/MM/YYYY').format('DD-MM-YYYY') : 'Not set'}
			</Text>
		),
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
		sorter: (a, b) => a.title.localeCompare(b.title),
		sortDirections: ['descend', 'ascend'],
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
		render: (value) => <Text>{value ? `${moneyConverter(value)} VNĐ` : 'Not set'}</Text>,
		sorter: (a, b) => a.baseSalary - b.baseSalary,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Max Employee',
		dataIndex: 'maxEmployee',
	},
];
export const contractColumns = [
	{
		title: 'Name',
		dataIndex: 'nameEmp',
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
		width: '18%',
	},
	{
		title: 'Avatar',
		dataIndex: 'avatar',
		render: (value) => <Image src={value ? value : DefaultImage} width={50} />,
		width: 'auto',
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		ellipsis: true,
		render: (value) => <Text>{Gender[value]}</Text>,
		width: 'auto',
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
		width: '18%',
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
