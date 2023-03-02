import { useState, useEffect } from 'react';

import { Space, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import { routeKey } from '../../components/Layout/ManagerItems';
import CustomTable from '../../components/Table';
import { applicantColumns, paginationConfig } from '../../config/ColumnConfig';
import { tabStatusConfig } from '../../config/TabsConfig';
import applicantAPI from '../../utils/Apis/applicantAPI';
import apiHandler from '../../utils/Apis/handler';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import { fakeData } from './dummy.data';

const { Column } = Table;
const Applicants = () => {
	const [loading, setLoading] = useState(false);
	const [filteredData, setFilteredData] = useState(fakeData);
	const navigate = useNavigate();
	const [data, setData] = useState(fakeData);
	const [search, searchRef, onSearchChange] = useSearch();
	const [activeKey, setActiveKey] = useState(tabStatusConfig[0].key);
	const [token] = usePersistedState('token');
	const onTabChange = async (key) => {
		setActiveKey(key);
		const res = await apiHandler(applicantAPI, 'get' + key, '', setLoading, token);
		setFilteredData(res || []);
	};
	const onAcceptApplicant = async (id, isAccepted) => {
		await apiHandler(applicantAPI, 'accept', 'Success', setLoading, id, isAccepted, token).then(
			() => {
				onTabChange(activeKey);
			}
		);
	};
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicantAPI, 'get' + activeKey, '', setLoading, token);
			if (res instanceof Error) {
				return navigate('/login');
			}
			setData(res || fakeData);
			setFilteredData(res || fakeData);
		};
		fetch();
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
		setFilteredData(tmp);
	}, [search]);
	return (
		<CustomCard>
			<Box direction='vertical'>
				<CustomTable
					style={{ minWidth: '700px' }}
					onTabChange={onTabChange}
					activeKey={activeKey}
					rowKey={(record) => record.id + 'applicants'}
					onSearch={onSearchChange}
					loading={loading}
					pagination={{
						...paginationConfig,
					}}
					dataSource={filteredData}
				>
					{applicantColumns.map((item) => {
						return (
							<Column
								title={item.title}
								dataIndex={item.dataIndex}
								key={item.key + '-applicantColumn'}
								render={item.render}
							/>
						);
					})}
					{activeKey === tabStatusConfig[0].key && (
						<Column
							title='Action'
							dataIndex='action'
							key='action-applicantColumn'
							render={(text, record) => (
								<Space size='middle'>
									<Link to={`/applicants/${record.id}`}>View</Link>
								</Space>
							)}
						/>
					)}
				</CustomTable>
			</Box>
		</CustomCard>
	);
};

export default Applicants;
