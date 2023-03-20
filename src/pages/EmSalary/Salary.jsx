import React, { useState, useEffect } from 'react';

import { Card, Col, Row, Layout, Collapse } from 'antd';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import CustomCard from '../../components/Card/index.jsx';
import contractAPI from '../../utils/Apis/contractAPI/index.js';
import employeeAPI from '../../utils/Apis/employeeAPI/index.js';
import apiHandler from '../../utils/Apis/handler.jsx';
import salaryAPI from '../../utils/Apis/salaryAPI/index.js';
import CustomTable from '../ListEmployee/Detail/customTable.jsx';
import Profile from '../Profile/data.js';
import CustomSTable from './ColumnConfig/customTable.jsx';
import { SalaryColumnConfig } from './ColumnConfig/index';
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
			const res = await apiHandler(contractAPI, 'get', '', setLoading, null);
			setTextContract(res || []);

			const res1 = await apiHandler(salaryAPI, 'get', '', setLoading, null);
			setTextSalary(res1 || []);
		};
		fetch();
	}, []);

	return (
		<CustomCard>
			<CustomSTable
				rowKey={(record) => record.id + '-salary-list'}
				style={{ minWidth: ' 700px' }}
				loading={loading}
			>
				{SalaryColumnConfig.map((item) => {
					return <Column key={item.key + '-salary-list'} {...item} />;
				})}
			</CustomSTable>
		</CustomCard>
	);
};
export default emSalary;
