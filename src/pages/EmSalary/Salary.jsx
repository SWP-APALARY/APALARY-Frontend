import React, { useState, useEffect } from 'react';

import { Card, Col, Row, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import CustomCard from '../../components/Card/index.jsx';
import { routeKey } from '../../components/Layout/ManagerItems/index.jsx';
import contractAPI from '../../utils/Apis/contractAPI/index.js';
import employeeAPI from '../../utils/Apis/employeeAPI/index.js';
import apiHandler from '../../utils/Apis/handler.jsx';
import salaryAPI from '../../utils/Apis/salaryAPI/index.js';
import Profile from '../Profile/data.js';
import { SalaryColumnConfig } from './ColumnConfig/index';
import data from './data.js';
import CustomSTable from './table/customTable';

import { Column } from '@ant-design/plots';

const { Content, Header, Footer } = Layout;

const emSalary = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const date = new Date();
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	const [textContract, setTextContract] = useState({
		contractId: '',
		base: '',
	});
	const [textSalary, setTextSalary] = useState([
		{
			total: '',
			month: '',
			bonus: '',
			tax: '',
			penalty: '',
			net: '',
		},
	]);
	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setTextSalary([]);
		}
	};
	useEffect(() => {
		const fetch = async () => {
			const resCon = await apiHandler(contractAPI, 'get', '', setLoading, null);
			setTextContract(resCon || []);

			const resSa = await apiHandler(salaryAPI, 'get', '', setLoading, null);
			setTextSalary(resSa || []);
		};
		fetch();
	}, []);

	return (
<<<<<<< HEAD
		<Card>
			<Row style={{ marginBottom: 50 }}>
				<Col span={10} offset={1}>
					<NavLink to='/contract'>
						<Card
							type='inner'
							title='Base Salary'
							bordered={false}
							style={{ textAlign: 'center', borderStyle: 'solid' }}
						>
							<Row>
								<Col span={12} offset={6}>
									<h1>{text.base} VND</h1>
								</Col>
							</Row>
						</Card>
					</NavLink>
				</Col>
				<Col span={10} offset={2}>
					<NavLink to=''>
						<Card
							type='inner'
							title='Salary'
							bordered={false}
							style={{ textAlign: 'center', borderStyle: 'solid' }}
						>
							<Row>
								<Col span={12} offset={6}>
									<h1>{text.net}</h1>
								</Col>
							</Row>
						</Card>
					</NavLink>
				</Col>
			</Row>
			<Layout style={{ margin: '0 100px' }}>
				<Content style={{ margin: '0 50px' }}>
					<Card style={{ margin: '0 50px' }}>
						<SalaryChart />
					</Card>
				</Content>
				<Footer></Footer>
			</Layout>
		</Card>
=======
		<CustomCard>
			<CustomSTable
				dataSource={textSalary}
				rowKey={(record) => record.id + '-salary-list'}
				style={{ minWidth: ' 700px' }}
				loading={loading}
			>
				{SalaryColumnConfig.map((item) => {
					return (
						<Column
							key={item.key + '-salary-list'}
							title={item.title}
							dataIndex={item.dataIndex}
							render={item.render}
						/>
					);
				})}
				<Column
					render={(text, record) => (
						<Link to={`${routeKey.salary}/${record.id}`}>Detail</Link>
					)}
				></Column>
			</CustomSTable>
		</CustomCard>
>>>>>>> 902b454bf844134584bc5ab59049b7cf1cfc8961
	);
};
export default emSalary;
