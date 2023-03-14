import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Input, Modal, Row, Skeleton, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import CustomCard from '../../../components/Card';
import employeeAPI from '../../../utils/Apis/employeeAPI';
import { employeeFormConfig, gender } from './config';

const { Title } = Typography;
const EmployeeDetail = () => {
	const params = useParams();
	const [employee, setEmployee] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		employeeAPI
			.getById(params.id)
			.then((res) => {
				setEmployee(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<CustomCard width='700px'>
			<Title style={{ textAlign: 'center' }}>Employee Information</Title>
			{loading ? (
				<Skeleton />
			) : (
				<Form layout='vertical'>
					<Row gutter={20}>
						{employeeFormConfig.map((item) => {
							return (
								<Col key={item.label + 'employee-information'} span={item.col}>
									<Form.Item label={item.label}>
										{item.key == 'gender' ? (
											<Input
												style={{ width: '100%' }}
												value={gender[employee[item.key]]}
												readOnly
											/>
										) : (
											<Input
												style={{ width: '100%' }}
												value={employee[item.key]}
											/>
										)}
									</Form.Item>
								</Col>
							);
						})}
					</Row>
				</Form>
			)}
		</CustomCard>
	);
};

export default EmployeeDetail;
