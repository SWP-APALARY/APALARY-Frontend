import { Typography } from 'antd';

import { getValueFromBlock } from '../../../utils/DraftjsHelper';

const { Text } = Typography;
export const salaryColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'employeeName',
		key: 'employeeName',
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'name',
		width: 200,
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

export const dayLeaveColumnConfig = [
	{
		title: 'Full name',
		dataIndex: 'name',
		key: 'name',
		width: 200,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		ellipse: true,
		// TODO: using draftjs
	},
	{
		title: 'Department',
		dataIndex: 'department',
		key: 'department',
	},
	{
		title: 'Leave on day',
		dataIndex: 'absentDay',
		key: 'absentDay',
	},
	{
		title: 'Created at',
		dataIndex: 'createdAt',
	},
];
