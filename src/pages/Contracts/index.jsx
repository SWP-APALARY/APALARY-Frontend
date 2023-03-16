import { useState, useEffect } from 'react';

import { Space, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import { paginationConfig, contractColumns } from '../../config/ColumnConfig';
import { tabContractStatusConfig } from '../../config/TabsConfig';
import contractsAPI from '../../utils/Apis/contractsAPI';
import employeeAPI from '../../utils/Apis/employeeAPI';
import apiHandler from '../../utils/Apis/handler';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import CustomCTable from './Table';

const { Column } = Table;
const Contracts = () => {
	const [loading, setLoading] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [search, searchRef, onSearchChange] = useSearch();
	const [activeKey, setActiveKey] = useState(tabContractStatusConfig[0].key);
	const [token] = usePersistedState('token');
	const onTabChange = async (key) => {
		setActiveKey(key);
		const res = await apiHandler(contractsAPI, 'get' + key, '', setLoading, token);
		setFilteredData(res || []);
	};
	const handleDelete = async (id) => {
		const tmpData = data.filter((item) => item.id !== id);
		await apiHandler(
			contractsAPI,
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

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(contractsAPI, 'get' + activeKey, '', setLoading, token);
			if (res instanceof Error) {
				navigate('/');
			}
			setData(res);
			setFilteredData(res);
		};
		fetch();
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) =>
			item.nameOfEmployee.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredData(tmp);
	}, [search]);

	return (
		<CustomCard>
			<Box direction='vertical'>
				<CustomCTable
					style={{ minWidth: '700px' }}
					onTabChange={onTabChange}
					activeKey={activeKey}
					rowKey={(record) => record.id + 'contracts'}
					onSearch={onSearchChange}
					addNewButton={true}
					loading={loading}
					pagination={{
						...paginationConfig,
					}}
					dataSource={filteredData}
				>
					{contractColumns.map((item) => {
						return (
							<Column
								title={item.title}
								dataIndex={item.dataIndex}
								key={item.key + '-contractColumn'}
								render={item.render}
							/>
						);
					})}
					<Column
						title='Action'
						dataIndex='action'
						key='action-contractColumn'
						render={(text, record) => (
							<Space size='middle'>
								<Link to={`/employees/contracts/${record.id}`}>View</Link>
								<Link onClick={() => handleDelete(record.id)}>Delete</Link>
							</Space>
						)}
					/>
				</CustomCTable>
			</Box>
		</CustomCard>
	);
};

export default Contracts;
