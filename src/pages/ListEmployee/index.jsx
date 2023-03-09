import React, { useEffect, useState } from 'react';

import { Modal, Space, Table } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import toast from '../../components/Toast';
import { employeeColumns, paginationConfig } from '../../config/ColumnConfig';
import employeeAPI from '../../utils/Apis/employeeAPI';
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
	const [searchText, searchRef, onSearchChange] = useSearch();
	const [loading, setLoading] = useState(false);
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
			title: 'Are you sure delete this employee?',
			icon: <ExclamationCircleTwoTone twoToneColor='red' />,
			content: 'This action make sure that this employee will be remove!',
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
			onCancel(err) {
				console.log(err);
			},
		});
	};
	const handleAdd = () => {
		setIsCreate(true);
	};
	const onFinishForm = (values) => {
		console.log(values);
	};

	// Fetching data from employeeApi
	useEffect(() => {
		const getData = async () => {
			await setLoading(true);
			await employeeAPI
				.getAll()
				.then((res) => {
					setData(res.data);
					setFilteredData(res.data);
				})
				.catch((err) => console.log(err));
			setLoading(false);
		};
		getData();
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
					pagination={{
						...paginationConfig,
					}}
					addNewButton={handleAdd}
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
				</CustomTable>
			</Box>
			<Modal
				open={isCreate}
				footer={false}
				centered
				onClose={true}
				onCancel={() => setIsCreate(false)}
			>
				<CreateEmployee onFinish={onFinishForm} />
			</Modal>
		</CustomCard>
	);
}
