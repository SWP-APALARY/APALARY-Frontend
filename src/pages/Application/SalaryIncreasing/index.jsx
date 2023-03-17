import { useEffect, useState } from 'react';

import { Table, Typography } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import { roles } from '../../../components/Layout/ManagerItems';
import CustomTable from '../../../components/Table';
import { paginationConfig } from '../../../config/ColumnConfig';
import { tabConfigWithAPIStatus, tabStatusConfig } from '../../../config/TabsConfig';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import useSearch from '../../../utils/hooks/useSearch';
import ApplicationModal from '../Modal';
import { salaryColumnConfig } from '../columnConfig';

const { Column } = Table;
const ApplicationSalary = () => {
	const [token, setToken] = usePersistedState('token');
	const [role, setRole] = usePersistedState('role');
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [id, setId] = useState(1);
	const [loading, setLoading] = useState(tabStatusConfig);
	const [search, searchRef, setSearchChange] = useSearch();
	const [openModal, setOpenModal] = useState(false);
	const [activeKey, setActiveKey] = useState(tabConfigWithAPIStatus[0].key);
	const onTabChange = async (value) => {
		setActiveKey(value);
	};
	const onView = (id) => {
		setOpenModal(true);
		setId(id);
	};
	useEffect(() => {
		const fetch = async () => {
			let activeKeyTmp = activeKey;
			// if (role === roles.CEO && activeKey === tabConfigWithAPIStatus[0].key) {
			// 	activeKeyTmp = 'processing-r2';
			// }
			const res = await apiHandler(
				applicationAPI,
				'getSalaryIncreasing',
				'',
				setLoading,
				activeKeyTmp,
				token
			);
			setData(res || []);
			setFilteredData(res || []);
		};
		fetch();
	}, [activeKey, openModal]);
	useEffect(() => {
		const tmp = data.filter((item) =>
			item.employeeName.toLowerCase().includes(search?.toLowerCase())
		);
		setFilteredData(tmp);
	}, [search]);

	return (
		<CustomCard width='800px'>
			<CustomTable
				dataSource={filteredData}
				onSearch={setSearchChange}
				activeKey={activeKey}
				tabConfig={tabConfigWithAPIStatus}
				rowKey={(record) => record.id + '-application-salary'}
				onTabChange={onTabChange}
				pagination={{ ...paginationConfig }}
			>
				{salaryColumnConfig.map((column, index) => (
					<Column
						key={index + '-application-salary'}
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
						<Box display='flex' key={'action-application-salary'}>
							<Link onClick={() => onView(record.id)}>View</Link>
						</Box>
					)}
				/>
			</CustomTable>
			<ApplicationModal id={id} open={openModal} setOpen={setOpenModal} status={activeKey} />
		</CustomCard>
	);
};

export default ApplicationSalary;
