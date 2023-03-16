import React, { useEffect } from 'react';

import { Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import CustomCard from '../../components/Card';

const { Text } = Typography;
export const ErrorPage = () => {
	const params = useParams();

	return (
		<CustomCard>
			<Text type='danger'>Error 404</Text>
		</CustomCard>
	);
};

export default ErrorPage;
