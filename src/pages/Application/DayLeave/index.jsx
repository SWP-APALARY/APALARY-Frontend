import React, { useEffect, useState } from 'react';

import { Table } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomTable from '../../../components/Table';
import { paginationConfig } from '../../../config/ColumnConfig';
import { tabConfigWithAPIStatus, tabStatusConfig } from '../../../config/TabsConfig';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import useSearch from '../../../utils/hooks/useSearch';
import ApplicationModal from '../Modal';
import { dayLeaveColumnConfig, salaryColumnConfig } from '../columnConfig';

const { Column } = Table;
const initData = [
	{
		name: 'Salary',
		description: 'Salary',
		department: 'Salary',
		absentDay: new Date().toLocaleDateString(),
		status: 'Processing',
	},
];
const ApplicationDayLeave = () => {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [activeKey, setActiveKey] = useState(tabConfigWithAPIStatus[0].key);
	const [id, setId] = useState(2);
	const [token, setToken] = usePersistedState('token');
	const [loading, setLoading] = useState(false);
	const [search, searchRef, setSearchChange] = useSearch();
	const [openModal, setOpenModal] = useState(false);
	const onTabChange = async (value) => {
		setActiveKey(value);
	};
	useEffect(() => {
		const tmp = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
		setFilteredData(tmp);
	}, [search]);
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(
				applicationAPI,
				'getDayLeaves',
				'',
				setLoading,
				activeKey,
				token
			);
			setData(res || []);
			setFilteredData(res || []);
		};
		fetch();
	}, [activeKey]);

	return (
		<CustomCard>
			<CustomTable
				dataSource={filteredData}
				onSearch={setSearchChange}
				activeKey={activeKey}
				tabConfig={tabConfigWithAPIStatus}
				rowKey={(record) => record.id + 'application-day-leave'}
				onTabChange={onTabChange}
				pagination={{ ...paginationConfig }}
			>
				{dayLeaveColumnConfig.map((column, index) => (
					<Column
						key={index + 'application-day-leaves'}
						title={column.title}
						dataIndex={column.dataIndex}
						width={column.width}
						ellipsis={column.ellipsis}
						render={column.render}
					/>
				))}
				<Column
					title='Action'
					key='action'
					render={(text, record) => (
						<Box display='flex' key={'action-application-day-leave'}>
							<Link onClick={() => setOpenModal(true)}>View</Link>
						</Box>
					)}
				/>
			</CustomTable>
			<ApplicationModal id={id} open={openModal} setOpen={setOpenModal} />
		</CustomCard>
	);
};

export default ApplicationDayLeave;
