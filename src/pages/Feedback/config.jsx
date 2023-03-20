import { Image, Typography } from 'antd';

import DefaultImage from '../../assets/default-avatar.jpg';

const { Text } = Typography;

const Gender = ['Male', 'Female', 'Other'];
export const employeeColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: true,
		width: '25%',
	},
	{
		title: 'Avatar',
		dataIndex: 'avatar',
		render: (value) => <Image src={value ? value : DefaultImage} width={50} />,
		width: '22%',
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		ellipsis: true,
		render: (value) => <Text>{Gender[value]}</Text>,
		width: '22%',
	},
	{
		title: 'Role',
		dataIndex: 'role',
		width: '22%',
	},
];
