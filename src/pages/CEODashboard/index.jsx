import React from 'react';

import { Button, Card, Col, List, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import CustomCard from '../../components/Card/index.jsx';
import { tabConfigWithAPIStatus } from '../../config/TabsConfig/index.js';
import applicationAPI from '../../utils/Apis/applicationAPI/index.js';
import employeeAPI from '../../utils/Apis/employeeAPI/index.js';
import jobOfferingApi from '../../utils/Apis/jobOffering/index.js';
import { getValueFromBlock } from '../../utils/DraftjsHelper/index.js';
import LocalStorageUtils from '../../utils/LocalStorage/utils.js';
import ApplicationModal from '../Application/Modal/index.jsx';
import { DashboardComponent } from './styles';

export default function CEODashboard() {
	const navigate = useNavigate();
	const [name, setName] = React.useState();
	const [isLoading, setIsLoading] = React.useState(false);
	const [listApplication, setListApplication] = React.useState([]);
	const [listPost, setListPost] = React.useState([]);
	const [id, setId] = React.useState(1);
	const [openModal, setOpenModal] = React.useState(false);

	const logout = () => {
		LocalStorageUtils.clear();
		navigate(0);
	};

	const onView = (id) => {
		setOpenModal(true);
		setId(id);
	};

	React.useEffect(() => {
		let ok = 0;
		setIsLoading(true);
		employeeAPI
			.get()
			.then((res) => setName(res.data.name))
			.catch(() => logout());
		applicationAPI
			.getAll()
			.then((res) => {
				setListApplication(res.data);
				if (ok === 1) setIsLoading(false);
				else ok++;
			})
			.catch(() => logout());
		jobOfferingApi
			.getJobOffering()
			.then((res) => {
				setListPost(res.data);
				if (ok === 1) setIsLoading(false);
				else ok++;
			})
			.catch(() => logout());
	}, []);

	return (
		<DashboardComponent>
			<Row gutter={[16, 16]}>
				<Col className='col-left' span={16}>
					<CustomCard width='100%'>
						<p className='title'>APPLICATIONS</p>
						<List
							itemLayout='vertical'
							size='large'
							loading={isLoading}
							pagination={{
								pageSize: 3,
							}}
							dataSource={listApplication}
							footer={false}
							renderItem={(item) => (
								<List.Item
									key={item.title}
									onClick={() => onView(item.id)}
									style={{ cursor: 'pointer' }}
								>
									<List.Item.Meta
										title={<p>{item.title}</p>}
										description={item.employeeName}
									/>
									<p className='content-item'>
										{getValueFromBlock(JSON.parse(item.description))}
									</p>
								</List.Item>
							)}
						/>
					</CustomCard>
				</Col>
				<Col className='col-right' span={8}>
					<Card style={{ marginBottom: '1rem' }}>
						<p className='title'>{`HELLO ${name} ;)`}</p>
					</Card>
					<Card>
						<p className='title' style={{ marginBottom: '1.5rem' }}>
							POSTS
						</p>
						<List
							itemLayout='vertical'
							size='large'
							pagination={{
								pageSize: 5,
							}}
							loading={isLoading}
							dataSource={listPost}
							footer={false}
							renderItem={(item) => (
								<List.Item
									key={item.id}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<List.Item.Meta
										title={<p>{item.title}</p>}
										description={
											<div>
												<p className='content'>{`Salary: ${item.baseSalary}$`}</p>
												<p className='content'>{`Department: ${item.departmentName}`}</p>
											</div>
										}
									/>
									<Button onClick={() => navigate(`/posts/${item.id}`)}>
										Detail
									</Button>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
			</Row>
			<ApplicationModal id={id} open={openModal} setOpen={setOpenModal} status='active' />
		</DashboardComponent>
	);
}
