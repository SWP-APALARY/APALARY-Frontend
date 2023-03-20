import { useEffect, useState } from 'react';

import { Table } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomTable from '../../../components/Table';
import { paginationConfig } from '../../../config/ColumnConfig';
import { tabConfigWithAPIStatus } from '../../../config/TabsConfig';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import useSearch from '../../../utils/hooks/useSearch';
import ApplicationModal from '../Modal';
import { sentColumnConfig } from '../columnConfig';

const { Column } = Table;
const ApplicationSent = () => {
	const [token, setToken] = usePersistedState('token');
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [id, setId] = useState(1);
	const [loading, setLoading] = useState(false);
	const [search, searchRef, setSearchChange] = useSearch();
	const [openModal, setOpenModal] = useState(false);
	const [activeKey, setActiveKey] = useState(tabConfigWithAPIStatus[0].key);

	const onView = (id) => {
		setOpenModal(true);
		setId(id);
	};

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(
				applicationAPI,
				'getSent',
				'',
				setLoading,
				activeKey,
				token
			);
			setData(res || []);
			setFilteredData(res || []);
		};
		fetch();
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) => item.title.toLowerCase().includes(search?.toLowerCase()));
		setFilteredData(tmp);
	}, [search]);

	return (
		<CustomCard width='800px'>
			<CustomTable
				loading={loading}
				dataSource={filteredData}
				onSearch={setSearchChange}
				rowKey={(record) => record.id + '-application-sent'}
				pagination={{ ...paginationConfig }}
			>
				{sentColumnConfig.map((column, index) => (
					<Column
						key={index + '-application-sent'}
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
			<ApplicationModal
				id={id}
				open={openModal}
				setOpen={setOpenModal}
				activeKey={activeKey}
			/>
		</CustomCard>
	);
};

export default ApplicationSent;
