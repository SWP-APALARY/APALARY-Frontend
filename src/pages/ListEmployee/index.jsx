import React, { useEffect, useState } from 'react';

import { Modal, Space, Table } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
// import CustomTable from '../../components/Table';
import toast from '../../components/Toast';
import { employeeColumns, paginationConfig } from '../../config/ColumnConfig';
import employeeAPI from '../../utils/Apis/employeeAPI';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import themeConfig from '../../utils/Theme';
import useSearch from '../../utils/hooks/useSearch';
import CreateEmployee from './Create';
import CustomTable from './Detail/customTable';

import { DeleteTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;

export default function ListEmployee() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [role] = usePersistedState('role');
	const [searchText, searchRef, onSearchChange] = useSearch();
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState('0');
	const [isCreate, setIsCreate] = useState(false);
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
		employeeAPI
			.deleteById(id)
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
			title: 'Are you sure this employee has quit?',
			icon: <ExclamationCircleTwoTone twoToneColor='red' />,
			content: 'This action make sure that this employee change status to inactive!',
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
	const handleAdd = () => {
		setIsCreate(true);
	};
	const onFinishForm = (values, form, fetch, setMessage) => {
		employeeAPI
			.createOne(values)
			.then(() => {
				setIsCreate(false);
				toast('Create successfully', 'success');
				form.resetFields();
				fetch();
			})
			.catch((err) => {
				setMessage(err.response.data);
				toast(err.response.data, 'error');
			});
	};

	const getData = async (status) => {
		await setLoading(true);
		if (status) {
			await employeeAPI
				.getAllActive()
				.then((res) => {
					setData(res.data);
					setFilteredData(res.data);
				})
				.catch((err) => console.log(err));
		} else {
			await employeeAPI
				.getAllInactive()
				.then((res) => {
					setData(res.data);
					setFilteredData(res.data);
				})
				.catch((err) => console.log(err));
		}
		setLoading(false);
	};

	// Fetching data from employeeApi
	useEffect(() => {
		getData(true);
	}, []);
	useEffect(() => {
		const tmp = data.filter((item) =>
			item.name.toLowerCase().includes(searchText.trim().toLowerCase())
		);
		setFilteredData(tmp);
	}, [searchText]);

	return (
		<CustomCard>
			<Box direction='vertical'>
				<CustomTable
					rowKey={(record) => record.id + 'employee'}
					dataSource={filteredData}
					loading={loading}
					onStatusChange={getData}
					pagination={{
						...paginationConfig,
					}}
					addNewButton={role.includes('HR_EMPLOYEE') ? handleAdd : null}
					onSearch={onSearchChange}
					onChange={handleTableChange}
				>
					{employeeColumns.map((column) => (
						<Column
							title={column.title}
							dataIndex={column.dataIndex}
							key={column.key + 'employee'}
							sorter={column.sorter}
							sortOrder={tableParams.columnKey === column.key && tableParams.order}
							ellipsis={column.ellipsis}
							render={column.render}
							width={column.width}
						/>
					))}
					{role.includes('HR') && (
						<Column
							title={'Action'}
							key={'action job-offering'}
							render={(text, record) => (
								<Space size='middle'>
									<Link
										to={`/employees/${record.id}`}
										style={{ color: themeConfig.token.colorPrimary }}
									>
										Detail
									</Link>
									<Link onClick={() => showDeleteConfirm(record.id)}>
										<DeleteTwoTone twoToneColor='red' />
									</Link>
								</Space>
							)}
						/>
					)}
				</CustomTable>
			</Box>
			<Modal
				open={isCreate}
				footer={false}
				centered
				onClose={true}
				onCancel={() => setIsCreate(false)}
				width='50%'
				style={{ minWidth: '520px' }}
			>
				<CreateEmployee onFinish={onFinishForm} />
			</Modal>
		</CustomCard>
	);
}
