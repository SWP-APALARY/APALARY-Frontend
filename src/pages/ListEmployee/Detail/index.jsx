import React, { useEffect, useState } from 'react';

import { Card, Col, Form, Input, List, Rate, Row, Select, Skeleton, Tabs, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import CustomCard from '../../../components/Card';
import PDFReader from '../../../components/PDFReder';
import toast from '../../../components/Toast';
import contractsAPI from '../../../utils/Apis/contractsAPI';
import employeeAPI from '../../../utils/Apis/employeeAPI';
import feedbackApi from '../../../utils/Apis/feedbackAPI';
import { employeeFormConfig, gender } from './config';

const { Title } = Typography;
const { Option } = Select;
const EmployeeDetail = () => {
	const params = useParams();
	const [employee, setEmployee] = useState({});
	const [contract, setContract] = useState({});
	const [feedback, setFeedback] = useState();
	const [sortList, setSortList] = useState();
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
		feedbackApi
			.getOfUser(params.id)
			.then((res) => {
				setFeedback(res.data);
				setSortList(res.data);
			})
			.catch((err) => toast(err.message, 'error'));
	}, []);

	const sortFeedback = async (opt) => {
		let result = [...feedback];
		await setLoading(true);
		switch (opt) {
			case 0:
				break;
			case 1:
				result.sort((a, b) => a.star - b.star);
				break;
			case 2:
				result.sort((a, b) => b.star - a.star);
				break;
			case 3:
				result.sort((a, b) => {
					if (a.createdDate > b.createdDate) return 1;
					else if (a.createdDate < b.createdDate) return -1;
					else return 0;
				});
				break;
			case 4:
				result.sort((a, b) => {
					if (a.createdDate < b.createdDate) return 1;
					else if (a.createdDate > b.createdDate) return -1;
					else return 0;
				});
				break;
		}
		await setSortList(result);
		setTimeout(() => setLoading(false), 100);
	};

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
														readOnly
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
					<div style={{ textAlign: 'end', marginBottom: '1rem' }}>
						<span>Sort by:</span>
						<Select
							style={{ marginLeft: '1rem', width: '10rem', textAlign: 'center' }}
							placeholder='Default'
							onChange={(opt) => sortFeedback(opt)}
						>
							<Option value={0}>Default</Option>
							<Option value={1}>Ascending star</Option>
							<Option value={2}>Descending star</Option>
							<Option value={3}>Ascending day</Option>
							<Option value={4}>Descending day</Option>
						</Select>
					</div>
					<Card>
						<List
							itemLayout='vertical'
							size='large'
							loading={loading}
							pagination={{
								pageSize: 3,
							}}
							dataSource={sortList}
							footer={false}
							renderItem={(item) => (
								<List.Item key={item.title}>
									<List.Item.Meta
										title={
											<Row>
												<Col span={12}>
													{/* <Rate
														disabled
														allowHalf
														defaultValue={item.star}
														style={{ fontSize: '15px' }}
													/> */}
												</Col>
												<Col span={12} style={{ textAlign: 'end' }}>
													{item.createdDate}
												</Col>
											</Row>
										}
										style={{ margin: 0 }}
									/>
									<div>
										<b>{item.title}</b>
										<p style={{ margin: 0 }}>{item.description}</p>
									</div>
								</List.Item>
							)}
						/>
					</Card>
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
