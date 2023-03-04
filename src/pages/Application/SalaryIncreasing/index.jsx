import { useEffect, useState } from 'react';

import { Table, Typography } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomTable from '../../../components/Table';
import { paginationConfig } from '../../../config/ColumnConfig';
import { tabStatusConfig } from '../../../config/TabsConfig';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import useSearch from '../../../utils/hooks/useSearch';
import ApplicationModal from '../Modal';
import { salaryColumnConfig } from '../columnConfig';

const { Column } = Table;
const initData = [
	{
		name: 'Salary',
		description: 'Salary',
		department: 'Salary',
		baseSalary: 'Salary',
		status: 'Processing',
	},
];
const ApplicationSalary = () => {
	const [token, setToken] = usePersistedState('token');
	const [data, setData] = useState(initData);
	const [filteredData, setFilteredData] = useState(initData);

	const [activeKey, setActiveKey] = useState(tabStatusConfig[0].key);
	const [loading, setLoading] = useState(tabStatusConfig);
	const [search, searchRef, setSearchChange] = useSearch();
	const [openModal, setOpenModal] = useState(false);
	const onTabChange = async (value) => {
		// TODO: call api to get data
		setActiveKey(value);
	};
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicationAPI, 'getAll', '', setLoading, token);
			console.log(res);
			setData(res.data);
		};
		fetch();
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
		setFilteredData(tmp);
	}, [search]);
	useEffect(() => {
		const tmp = data.filter((item) => item.status === activeKey);
		setFilteredData(tmp);
	}, [activeKey]);

	return (
		<CustomCard>
			<CustomTable
				dataSource={filteredData}
				onSearch={setSearchChange}
				activeKey={activeKey}
				rowKey={(record) => record.id + 'application-salary'}
				onTabChange={onTabChange}
				pagination={{ ...paginationConfig }}
			>
				{salaryColumnConfig.map((column, index) => (
					<Column
						key={index + 'application-salary'}
						title={column.title}
						dataIndex={column.dataIndex}
						width={column.width}
						render={column.render}
					/>
				))}
				<Column
					title='Action'
					key='action'
					render={(text, record) => (
						<Box display='flex' key={'action-application-salary'}>
							<Link onClick={() => setOpenModal(true)}>View</Link>
						</Box>
					)}
				/>
			</CustomTable>
			<ApplicationModal open={openModal} setOpen={setOpenModal} />
		</CustomCard>
	);
};

export default ApplicationSalary;
