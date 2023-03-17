import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Space, Table } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import { routeKey } from '../../components/Layout/ManagerItems';
import SearchBar from '../../components/SearchBar';
import CustomTable from '../../components/Table';
import toast from '../../components/Toast';
import { paginationConfig, postColumns } from '../../config/ColumnConfig';
import apiHandler from '../../utils/Apis/handler';
import jobOfferingApi from '../../utils/Apis/jobOffering';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';

const { Column } = Table;
const JobOffering = () => {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	// const searchRef = useRef('');
	// const [searchText, setSearchText] = useState('');
	const [token] = usePersistedState('token');
	const [searchText, searchRef, onSearchChange] = useSearch();
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};
	const handleDelete = async (id) => {
		const tmpData = data.filter((item) => item.id !== id);
		await apiHandler(
			jobOfferingApi,
			'delete',
			'Success Deleted Post',
			setLoading,
			id,
			token
		).then(() => {
			setData(tmpData);
			setFilteredData(tmpData);
		});
	};
	// Fetching data from jobOfferingApi
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			await jobOfferingApi
				.getJobOffering()
				.then((res) => {
					if (res.data.status === 403) {
						setData([]);
						return;
					}
					setData(res.data);
					setFilteredData(res.data);
				})
				.catch((err) => {
					console.log(err);
					toast('Failed to fetch data', 'error');
				})
				.finally(() => {
					setLoading(false);
				});
		};
		fetch();
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) =>
			item.title.toLowerCase().includes(searchText.toLowerCase())
		);
		setFilteredData(tmp);
	}, [searchText]);
	return (
		<CustomCard width='1200px'>
			<Box direction='vertical'>
				<CustomTable
					rowKey={(record) => record.id + 'job-offering'}
					dataSource={filteredData}
					loading={loading}
					pagination={{
						...paginationConfig,
					}}
					addNewButton={true}
					onSearch={onSearchChange}
					onChange={handleTableChange}
				>
					{postColumns.map((column) => (
						<Column
							title={column.title}
							dataIndex={column.dataIndex}
							key={column.key + 'job-offering'}
							sorter={column.sorter}
							sortOrder={tableParams.columnKey === column.key && tableParams.order}
							ellipsis={column.ellipsis}
							render={column.render}
						/>
					))}
					<Column
						title={'Action'}
						key={'action job-offering'}
						render={(text, record) => (
							<Space size='middle'>
								<Link to={`${routeKey.posts}/${record.id}/edit`}>Edit</Link>
								<Link onClick={() => handleDelete(record.id)}>Delete</Link>
							</Space>
						)}
					/>
				</CustomTable>
			</Box>
		</CustomCard>
	);
};

export default JobOffering;
