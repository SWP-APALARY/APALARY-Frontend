import { Typography } from 'antd';
import dayjs from 'dayjs';

import { getValueFromBlock } from '../../../utils/DraftjsHelper';

const { Text } = Typography;
export const salaryColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'employeeName',
		key: 'employeeName',
		sorter: (a, b) => a.employeeName < b.employeeName,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		sorter: (a, b) => a.title < b.title,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		ellipsis: true,
		render: (text) => <Text>{getValueFromBlock(JSON.parse(text))}</Text>,
		sorter: (a, b) => a.description < b.description,
	},
	{
		title: 'Created at',
		dataIndex: 'createdTime',
		key: 'createdTime',
		render: (text) => (
			<Text>{dayjs(new Date(text).toLocaleDateString()).format('MM/DD/YYYY')}</Text>
		),
		sorter: (a, b) =>
			dayjs(new Date(a.createdTime)).diff(dayjs(new Date(b.createdTime)), 'day'),
	},
];
export const sentColumnConfig = [
	...salaryColumnConfig,
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (text) => (
			<Text>
				{text === 'ACTIVE' ? 'Approved' : text === 'INACTIVE' ? 'Rejected' : 'Pending'}
			</Text>
		),
		sorter: (a, b) => a.status < b.status,
	},
];
export const reportColumnConfig = [
	...salaryColumnConfig,
	{
		title: 'Report for',
		dataIndex: 'destinationEmployeeName',
		key: 'destinationEmployeeName',
		sorter: (a, b) => a.destinationEmployeeName < b.destinationEmployeeName,
	},
];
export const dayLeaveColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'employeeName',
		key: 'employeeName',
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'name',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		ellipsis: true,
		render: (text) => <Text>{getValueFromBlock(JSON.parse(text))}</Text>,
	},
	{
		title: 'Created at',
		dataIndex: 'createdTime',
		key: 'createdTime',
		render: (text) => <Text>{new Date(text).toLocaleDateString()}</Text>,
	},
];
