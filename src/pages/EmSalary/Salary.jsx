import React, { useState, useEffect } from 'react';

import { Card, Col, Row, Layout, Collapse } from 'antd';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import contractAPI from '../../utils/Apis/contractAPI/index.js';
import employeeAPI from '../../utils/Apis/employeeAPI/index.js';
import apiHandler from '../../utils/Apis/handler.jsx';
import salaryAPI from '../../utils/Apis/salaryAPI/index.js';
import Profile from '../Profile/data.js';
import data from './data.js';

import { MoneyCollectOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';

const { Content, Header, Footer } = Layout;

export const SalaryChart = () => {
	const config = {
		data,
		xField: 'month',
		yField: 'sales',
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
			sales: {
				alias: 'Sale',
			},
		},
	};
	return <Column {...config} />;
};

const emSalary = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const date = new Date();
	const month = date.getMonth();

	const [textContract, setTextContract] = useState({
		contractId: '',
		base: '',
	});
	const [textSalary, setTextSalary] = useState({
		total: '',
		net: '',
	});
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(contractAPI, 'get', '', setLoading, null);
			setTextContract(res || []);

			const res1 = await apiHandler(salaryAPI, 'get', '', setLoading, month, null);
			setTextSalary(res1 || []);
		};
		fetch();
	}, []);

	return (
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
									<h1>{textContract.base}đ</h1>
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
									<h1>{textSalary.total}</h1>
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
	);
};
export default emSalary;
