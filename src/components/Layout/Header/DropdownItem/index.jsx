import { Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const items = [
	// todo: Create logout function here
	{
		key: '/logout',
		isLogin: false,
		label: (
			<Space style={{ width: '120px' }}>
				<Text>Logout</Text>
			</Space>
		),
	},
];

export default items;
