import { useEffect, useState } from 'react';

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
import { reportColumnConfig, salaryColumnConfig } from '../columnConfig';

const { Column } = Table;
const Reports = () => {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [id, setId] = useState(1);
	const [loading, setLoading] = useState(false);
	const [search, searchRef, setSearchChange] = useSearch();
	const [openModal, setOpenModal] = useState(false);

	const onView = (id) => {
		setOpenModal(true);
		setId(id);
	};
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicationAPI, 'getReports', '', setLoading);
			setData(res || []);
			setFilteredData(res || []);
		};
		fetch();
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) =>
			item.employeeName.toLowerCase().includes(search?.toLowerCase())
		);
		setFilteredData(tmp);
	}, [search]);

	return (
		<CustomCard width='800px'>
			<CustomTable
				loading={loading}
				dataSource={filteredData}
				onSearch={setSearchChange}
				rowKey={(record) => record.id + '-application-report'}
				pagination={{ ...paginationConfig }}
			>
				{reportColumnConfig.map((column, index) => (
					<Column
						key={index + '-application-salary'}
						title={column.title}
						dataIndex={column.dataIndex}
						width={column.width}
						sorter={column.sorter}
						ellipsis={column.ellipsis}
						render={column.render}
					/>
				))}
				<Column
					title='Action'
					key='action'
					render={(text, record) => (
						<Box display='flex' key={'action-application-report'}>
							<Link onClick={() => onView(record.id)}>View</Link>
						</Box>
					)}
				/>
			</CustomTable>
			<ApplicationModal
				id={id}
				report
				open={openModal}
				setOpen={setOpenModal}
				activeKey={'active'}
			/>
		</CustomCard>
	);
};

export default Reports;
