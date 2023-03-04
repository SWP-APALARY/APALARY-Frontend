import { useEffect, useState } from 'react';

import { Col, Form, Row, Typography } from 'antd';

import CustomCard from '../../../components/Card';
import CustomInput from '../../../components/Input';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import { applicationConfigForm, applicationConfigTypeReport } from './configForm';

const { Title } = Typography;
const CreateApplication = () => {
	const [type, setType] = useState();
	const [currentType, setCurrentType] = useState({
		id: 4,
		type: 'Report',
	});
	const [token, setToken] = usePersistedState('token');
	useEffect(() => {
		const fetchType = async () => {
			const res = await apiHandler(applicationAPI, 'getAllType', '', null, token);
			console.log(res);
			setType(res);
		};
		fetchType();
	}, []);
	return (
		<CustomCard width={'800px'}>
			<Title>Create Application</Title>
			<Form layout='vertical'>
				{applicationConfigForm.map((item) => (
					<Form.Item
						key={item.label + 'create-application'}
						label={item.label}
						name={item.name}
						rules={item.rules}
					>
						<CustomInput type={item.type} option={type} />
					</Form.Item>
				))}
				<Row gutter={4}>
					{currentType.type === 'Report' &&
						applicationConfigTypeReport.map((item) => (
							<Col key={item.label + 'create-application'} span={item.col}>
								<Form.Item label={item.label} name={item.name} rules={item.rules}>
									<CustomInput type={item.type} option={type} />
								</Form.Item>
							</Col>
						))}
				</Row>
			</Form>
		</CustomCard>
	);
};

export default CreateApplication;
