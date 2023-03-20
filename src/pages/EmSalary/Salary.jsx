import React, { useState, useEffect } from 'react';

import { Card, Col, Row, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import contractAPI from '../../utils/Apis/contractAPI/index.js';
import salaryAPI from '../../utils/Apis/salaryAPI/index.js';
import data from './data.js';

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
	const navigate = useNavigate();
	const [text, setText] = useState({
		contractId: '',
		base: '',
		net: '',
	});
	useEffect(() => {
		salaryAPI
			.get()
			.then((res) => {
				contractAPI
					.get(res.data.contractId)
					.then((rest) => setText({ ...rest.data, ...res.data }));
				// .catch(() => navigate('/'));
			})
			.catch(() => navigate('/'));
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
	);
};
export default emSalary;
