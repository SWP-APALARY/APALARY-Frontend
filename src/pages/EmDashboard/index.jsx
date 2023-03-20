import { useEffect, useState } from 'react';

import { Layout, Card, Image, Row, Col, Rate, Form, Button } from 'antd';
import { FaMoneyBillWave } from 'react-icons/fa';
import { VscFeedback } from 'react-icons/vsc';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import employeeAPI from '../../utils/Apis/employeeAPI/index.js';
import feedbackApi from '../../utils/Apis/feedbackAPI/index.js';
import apiHandler from '../../utils/Apis/handler';
import salaryAPI from '../../utils/Apis/salaryAPI/index.js';
import LocalStorageUtils from '../../utils/LocalStorage/utils.js';
import EmSalary from '../EmSalary/Salary';
import data from '../EmSalary/data.js';
import FeedBacks from '../Feedback/data.js';

// import ProData from '../Profile/data.js';
import { FileTextFilled, IdcardFilled, ProfileFilled, MailFilled } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

const { Header, Content, Footer } = Layout;

const EmDashboard = () => {
	const month = new Date();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
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
		},
	]);

	const sumStar = () => {
		let sum = 0;
		textFeedback.forEach((todo) => (sum = sum + todo.star));
		return sum / textFeedback.length;
	};

	const SalaryChart = () => {
		const config = {
			data: textSalary,
			xField: 'month',
			yField: 'total',
			label: {
				position: 'middle',

				style: {
					fill: '#FFFFFF',
					opacity: 0.6,
				},
			},
			xAxis: {
				label: {
					autoHide: true,
					autoRotate: false,
				},
			},
			meta: {
				type: {
					alias: 'Month',
				},
				total: {
					alias: 'Total',
				},
			},
		};
		return <Column {...config} />;
	};
	// const { name, phone, number, username, password, gender, date } = ProData[0];

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(
				feedbackApi,
				'get',
				'',
				setLoading,
				month.getMonth(),
				null
			);
			setTextFeedback(res || []);

			const resEm = await apiHandler(employeeAPI, 'get', '', setLoading, null);
			setTextEmployee(resEm || []);

			const resSa = await apiHandler(salaryAPI, 'get', '', setLoading, null);
			setTextSalary(resSa || []);
			// console.log(textSalary);
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
		<Box direction='vertical'>
			<Content
				style={{
					background: '#F0F0F0',
					maxWidth: 1200,
				}}
			>
				<Image
					width='100%'
					height={250}
					src='https://www.umassalumni.com/s/1640/images/gid2/editor/alumni_association/campus_partners/architecture/dbexterior.jpg'
				></Image>
			</Content>
			<Footer
				style={{
					background: '#F0F0F0',
					width: '100%',
				}}
			>
				<Layout style={{ background: '#F0F0F0', margin: '10px 0px' }}>
					<Content>
						<Card>
							<h3>Salary</h3>
							<SalaryChart />
							<Button style={{ margin: '10px 0px' }}>
								<NavLink to='/salary'>More</NavLink>
							</Button>
						</Card>
					</Content>
				</Layout>
				<Row gutter={18}>
					<Col span={12}>
						<Row>
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
					</Col>
					<Col span={12}>
						<Card bordered={false}>
							<Card
								title='Personal Information'
								bordered={false}
								style={{
									border: '2px solid black',
									height: 303,
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
			</Footer>
		</Box>
	);
};
export default EmDashboard;
