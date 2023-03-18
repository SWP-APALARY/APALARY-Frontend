import { Typography } from 'antd';

import { getValueFromBlock } from '../../../utils/DraftjsHelper';

const { Text } = Typography;
export const salaryColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'employeeName',
		key: 'employeeName',
		sorter: (a, b) => a.employeeName < b.employeeName,
		sortOrder: ['ascend'],
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		sorter: (a, b) => a < b,
		sortOrder: ['ascend'],
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		ellipsis: true,
		render: (text) => <Text>{getValueFromBlock(JSON.parse(text))}</Text>,
		sorter: (a, b) => a < b,
		sortOrder: ['ascend'],
	},
	{
		title: 'Created at',
		dataIndex: 'createdTime',
		key: 'createdTime',
		render: (text) => <Text>{new Date(text).toLocaleDateString()}</Text>,
		sorter: (a, b) => a < b,
		sortOrder: ['ascend'],
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
		sorter: (a, b) => a < b,
		sortOrder: ['ascend'],
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
