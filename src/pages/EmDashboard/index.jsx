import { useEffect, useState } from 'react';

import { Layout, Card, Image, Row, Col, Rate, Form, Button, Space, Typography } from 'antd';
import { FaMoneyBillWave } from 'react-icons/fa';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import employeeAPI from '../../utils/Apis/employeeAPI/index.js';
import feedbackApi from '../../utils/Apis/feedbackAPI/index.js';
import apiHandler from '../../utils/Apis/handler';
import salaryAPI from '../../utils/Apis/salaryAPI/index.js';
import usePersistedState from '../../utils/LocalStorage/usePersistedState.jsx';
import LocalStorageUtils from '../../utils/LocalStorage/utils.js';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FileTextFilled, IdcardFilled, ProfileFilled, MailFilled } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

const { Header, Content, Footer } = Layout;

const EmDashboard = () => {
	const date = new Date();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [monthF, setMothF] = useState(date.getMonth() + 1);
	const [index, setIndex] = useState(0);
	const [text, setText] = useState([
		{
			id: 0,
			title: '',
			description: '',
			star: '',
			createdDate: '',
		},
	]);
	const [role] = usePersistedState('role');
	// const [month, setMonth] = useState();
	const [textEmployee, setTextEmployee] = useState({
		phone: '',
		name: '',
		identifyNumber: '',
		username: '',
		password: '',
		dateOfBirth: '',
		gender: '',
		role: '',
	});
	const [textFeedback, setTextFeedback] = useState([
		{
			star: '',
		},
	]);
	const [textSalary, setTextSalary] = useState([
		{
			month: '',
			total: '',
			totalAssurance: '',
			totalTax: '',
			totalPenalty: '',
			totalBonus: '',
		},
	]);

	const SalaryChart = () => {
		const config = {
			data: textSalary,
			padding: 'auto',
			xField: 'month',
			yField: 'total',
		};
		return <Line {...config} />;
	};
	// const { name, phone, number, username, password, gender, date } = ProData[0];

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(feedbackApi, 'get', '', setLoading, monthF, null);
			setTextFeedback(res || []);

			const resEm = await apiHandler(employeeAPI, 'get', '', setLoading, null);
			setTextEmployee(resEm || []);

			const resSa = await apiHandler(salaryAPI, 'getTotal', '', setLoading, null);
			const newData = resSa.map((todo) => {
				return { ...todo, month: '2023-' + todo.month };
			});
			setTextSalary(newData);
			console.log(newData);
		};
		fetch();
		employeeAPI
			.get()
			.then((res) => setTextEmployee(res.data))
			.catch(() => {
				LocalStorageUtils.clear();
				navigate('/login');
			});
	}, []);

	return (
		<Box direction='vertical' loading={loading}>
			<Content
				style={{
					background: '#F0F0F0',
					maxWidth: 1200,
				}}
			>
				<Image
					width={910}
					height={250}
					src='https://www.umassalumni.com/s/1640/images/gid2/editor/alumni_association/campus_partners/architecture/dbexterior.jpg'
					loading={loading}
				/>
			</Content>
			<Footer
				style={{
					background: '#F0F0F0',
					width: '100%',
				}}
			>
				{role.includes('EMPLOYEE') && (
					<Row gutter={18}>
						<Col span={12}>
							<Row style={{ marginBottom: 10 }}>
								<Col span={8}>
									<NavLink to='/application/create'>
										<Card
											hoverable
											bordered={true}
											style={{
												background: '#F0F0F0',
												width: '99%',
												height: 120,
											}}
										>
											<MailFilled style={{ fontSize: 50, marginLeft: 13 }} />
											Application
										</Card>
									</NavLink>
								</Col>
								<Col span={8}>
									<NavLink to='/contract'>
										<Card
											hoverable
											bordered={true}
											style={{
												background: '#F0F0F0',
												width: '99%',
												height: 120,
											}}
										>
											<div style={{ marginLeft: 10 }}>
												<FileTextFilled
													style={{ fontSize: 50, marginLeft: 4 }}
												/>
												Contract
											</div>
										</Card>
									</NavLink>
								</Col>
								<Col span={8}>
									<NavLink to='/salary'>
										<Card
											hoverable
											style={{
												background: '#F0F0F0',
												width: '99%',
												height: 120,
											}}
										>
											<div style={{ marginLeft: 20 }}>
												<FaMoneyBillWave
													style={{
														fontSize: 50,
														marginLeft: -7,
														marginBottom: -5,
													}}
												/>
												Salary
											</div>
										</Card>
									</NavLink>
								</Col>
							</Row>
							<Row style={{ width: 396 }}>
								<Box direction='vertical' style={{ width: 396 }}>
									<Card>
										<Row justify={'center'}>
											<Card
												size='large'
												title='FeedBack'
												extra={textFeedback[index].createdDate}
												style={{
													width: 300,
													height: 183,
												}}
											>
												<Typography>
													{`${textFeedback[index].description}...`}
												</Typography>
											</Card>
										</Row>
									</Card>
								</Box>
							</Row>
						</Col>

						<Col span={12}>
							<Card bordered={false}>
								<Card
									title='Personal Information'
									bordered={false}
									style={{
										border: '2px solid black',
										height: 314,
										textAlign: 'center',
									}}
								>
									<Form.Item label='Full Name'>{textEmployee.name}</Form.Item>
									<Form.Item label='I.N'>{textEmployee.identifyNumber}</Form.Item>
									<Form.Item label='UserName'>{textEmployee.username}</Form.Item>

									<Button>
										<NavLink to='/profile'>More</NavLink>
									</Button>
								</Card>
							</Card>
						</Col>
					</Row>
				)}
				{role.includes('HR_MANAGER') && (
					<Layout style={{ background: '#F0F0F0', margin: '10px 0px' }} loading={loading}>
						<Content>
							<Card loading={loading}>
								<h3>Salary</h3>
								<SalaryChart />
							</Card>
						</Content>
					</Layout>
				)}
			</Footer>
		</Box>
	);
};
export default EmDashboard;
