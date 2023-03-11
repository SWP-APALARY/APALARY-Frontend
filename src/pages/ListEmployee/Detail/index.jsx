import React, { useEffect, useState } from 'react';

import { Col, Form, Input, Row, Skeleton, Tabs, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import CustomCard from '../../../components/Card';
import PDFReader from '../../../components/PDFReder';
import toast from '../../../components/Toast';
import contractsAPI from '../../../utils/Apis/contractsAPI';
import employeeAPI from '../../../utils/Apis/employeeAPI';
import { employeeFormConfig, gender } from './config';

const { Title } = Typography;
const EmployeeDetail = () => {
	const params = useParams();
	const [employee, setEmployee] = useState({});
	const [contract, setContract] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		employeeAPI
			.getById(params.id)
			.then((res) => {
				setEmployee(res.data);
				contractsAPI
					.getOne(res.data.contractId)
					.then((res) => {
						setContract(res.data.contractImage);
						setLoading(false);
					})
					.catch((err) => toast(err.message, 'error'));
			})
			.catch((err) => toast(err.message, 'error'));
	}, []);

	const items = [
		{
			key: '1',
			label: `Information`,
			children: (
				<div>
					<Title style={{ textAlign: 'center', marginTop: '1rem' }}>
						Employee Information
					</Title>
					{loading ? (
						<Skeleton />
					) : (
						<Form layout='vertical'>
							<Row gutter={20}>
								{employeeFormConfig.map((item) => {
									return (
										<Col
											key={item.label + 'employee-information'}
											span={item.col}
										>
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
				</div>
			),
		},
		{
			key: '2',
			label: `Contract`,
			children: <PDFReader file={contract} isWaiting={false} />,
		},
		{
			key: '3',
			label: `Feedback`,
			children: (
				<div>
					<Title style={{ textAlign: 'center', marginTop: '1rem' }}>Feedbacks</Title>
					List feedbacks over here waiting BE finish
				</div>
			),
		},
	];

	return (
		<CustomCard width='700px'>
			<Tabs defaultActiveKey='1' items={items} />
		</CustomCard>
	);
};

export default EmployeeDetail;
