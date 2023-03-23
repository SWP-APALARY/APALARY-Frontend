import { Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { routeKey } from '../../ManagerItems';

const { Text } = Typography;

const items = [
	{
		key: '/change-password',
		isLogin: false,
		label: (
			<Link to={routeKey.changePassword}>
				<Space style={{ width: '120px' }}>
					<Text>Change Password</Text>
				</Space>
			</Link>
		),
	},
	{
		key: '/logout',
		isLogin: false,
		label: (
			<Space style={{ width: '120px' }}>
				<Text>Logout</Text>
			</Space>
		),
		onClick: () => {},
	},
];

export default items;
