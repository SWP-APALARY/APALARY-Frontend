import React, { useState, useEffect } from 'react';

import { Card, Col, Row, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import CustomCard from '../../components/Card/index.jsx';
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
	const month = date.getMonth();
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
			console.log(resSa);
		};
		fetch();
	}, []);

	return (
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
			</CustomSTable>
		</CustomCard>
	);
};
export default emSalary;
