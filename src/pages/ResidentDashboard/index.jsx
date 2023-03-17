import { useEffect, useState } from 'react';

import { Layout, Card, Image, Row, Col, Rate, Form } from 'antd';
import { FaMoneyBillWave } from 'react-icons/fa';
import { VscFeedback } from 'react-icons/vsc';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import apiHandler from '../../utils/Apis/handler';
import residentAPI from '../../utils/Apis/residentAPI/index.js';

// import ProData from '../Profile/data.js';
import { FileTextFilled, IdcardFilled, ProfileFilled, MailFilled } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

const { Header, Content, Footer } = Layout;

const EmDashboard = () => {
	const [loading, setLoading] = useState(false);

	const [resident, setResident] = useState({
		phone: '',
		name: '',
		identifyNumber: '',
		username: '',
		password: '',
		dateOfBirth: '',
		gender: '',
		email: '',
	});
	console.log(resident);
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(residentAPI, 'get', '', setLoading, null);
			setResident(res || []);
		};
		fetch();
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
				<Row gutter={18}>
					<Col span={12}>
						<Row>
							<Col span={8}>
								<NavLink to='/application'>
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
								<Form.Item label='Full Name'>{resident.name}</Form.Item>
								<Form.Item label='I.N'>{resident.identifyNumber}</Form.Item>
								<Form.Item label='UserName'>{resident.username}</Form.Item>

								<button>
									<NavLink to='/profile'>More</NavLink>
								</button>
							</Card>
						</Card>
					</Col>
				</Row>
			</Footer>
		</Box>
	);
};
export default EmDashboard;
