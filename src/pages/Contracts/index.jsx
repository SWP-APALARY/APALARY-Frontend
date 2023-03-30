import { useState, useEffect } from 'react';

import { Modal, Space, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import toast from '../../components/Toast';
import { paginationConfig, contractColumns } from '../../config/ColumnConfig';
import { tabContractStatusConfig } from '../../config/TabsConfig';
import contractsAPI from '../../utils/Apis/contractsAPI';
import employeeAPI from '../../utils/Apis/employeeAPI';
import apiHandler from '../../utils/Apis/handler';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import CustomCTable from './Table';

import { DeleteTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;
const Contracts = () => {
	const [loading, setLoading] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const navigate = useNavigate();
	const [role] = usePersistedState('role');
	const [data, setData] = useState([]);
	const [search, searchRef, onSearchChange] = useSearch();
	const [activeKey, setActiveKey] = useState(tabContractStatusConfig[0].key);
	const [status, setStatus] = useState('ACTIVE');
	const [isCreate, setIsCreate] = useState(false);
	const [token] = usePersistedState('token');
	const onTabChange = async (key) => {
		setActiveKey(key);
		const res = await apiHandler(contractsAPI, 'get' + key, '', setLoading, token);
		setFilteredData(res || []);
	};
	// const handleDelete = async (id) => {
	// 	const tmpData = data.filter((item) => item.id !== id);
	// 	await apiHandler(contractsAPI, 'delete', 'Success Deleted Contract', setLoading, id, token)
	// 		.then(() => {
	// 			setData(tmpData);
	// 			setFilteredData(tmpData);
	// 		})
	// };
	const handleDelete = async (id) => {
		contractsAPI
			.delete(id)
			.then(() => {
				const tmpData = data.filter((item) => item.id !== id);
				setData(tmpData);
				setFilteredData(tmpData);
				toast('Delete employee successfully!', 'success');
			})
			.catch(() => toast('Something wrong please try again!', 'error'));
	};
	const showDeleteConfirm = (id) => {
		confirm({
			title: 'Are you sure delete this contract?',
			icon: <ExclamationCircleTwoTone twoToneColor='red' />,
			content: 'This action make sure that this contract will be remove!',
			okText: 'OK',
			okType: 'danger',
			cancelText: 'Cancel',
			closable: true,
			centered: true,
			bodyStyle: {
				marginTop: '15px',
			},
			onOk() {
				handleDelete(id);
			},
			onCancel() {
				setIsCreate(false);
			},
		});
	};

	useEffect(() => {
		const fetch = async () => {
			const tmpStatus = status ? 'Active' : 'Inactive';
			const res = await apiHandler(contractsAPI, 'get' + tmpStatus, '', setLoading, token);
			if (res instanceof Error) {
				navigate('/');
			}
			setData(res || []);
			setFilteredData(res || []);
		};
		fetch();
	}, [status]);
	useEffect(() => {
		const tmp = data.filter((item) =>
			item.nameEmp.toLowerCase().includes(search.toLowerCase())
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
					addNewButton={role.includes('HR_EMPLOYEE')}
					loading={loading}
					pagination={{
						...paginationConfig,
					}}
					dataSource={filteredData}
					onStatusChange={(status) => setStatus(status)}
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
								<Link to={`/contracts/${record.id}`}>View</Link>

								{record.status !== 'INACTIVE' && role.includes('HR_EMPLOYEE') && (
									<Link onClick={() => showDeleteConfirm(record.id)}>
										<DeleteTwoTone twoToneColor='red' />
									</Link>
								)}
							</Space>
						)}
					/>
				</CustomCTable>
			</Box>
		</CustomCard>
	);
};

export default Contracts;
