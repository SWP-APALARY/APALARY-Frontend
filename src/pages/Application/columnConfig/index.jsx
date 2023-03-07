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
