import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Rate, Space, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import CustomTable from '../../components/Table';
import toast from '../../components/Toast';
import employeeAPI from '../../utils/Apis/employeeAPI';
import feedbackApi from '../../utils/Apis/feedbackAPI';
import useSearch from '../../utils/hooks/useSearch';
import { employeeColumns } from './config';

import { FileAddTwoTone } from '@ant-design/icons';

const { Column } = Table;
const { TextArea } = Input;
const { Title } = Typography;

export default function CreateFeedback() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchText, searchRef, onSearchChange] = useSearch();
	const [loading, setLoading] = useState(false);
	const [isCreate, setIsCreate] = useState(null);
	const [rateNum, setRateNum] = useState(1);
	const [isRateError, setIsRateError] = useState(null);
	const [form] = Form.useForm();

	const onFinishForm = (values) => {
		if (rateNum < 1) {
			setIsRateError('Rate star must be >= 1');
		} else {
			feedbackApi
				.createOne({ ...values, star: rateNum, employeeId: isCreate })
				.then(() => {
					setIsCreate(null);
					toast('Create successfully', 'success');
					form.resetFields();
				})
				.catch((err) => {
					toast(err.response.data, 'error');
				});
		}
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
					pagination={{ pageSize: 6 }}
					onSearch={onSearchChange}
				>
					{employeeColumns.map((column) => (
						<Column
							title={column.title}
							dataIndex={column.dataIndex}
							key={column.key + 'employee'}
							sorter={column.sorter}
							ellipsis={column.ellipsis}
							render={column.render}
							width={column.width}
						/>
					))}
					<Column
						title={'Feedback'}
						key={'action feedback'}
						render={(text, record) => (
							<Space size='large'>
								<Link
									onClick={() => setIsCreate(record.id)}
									style={{ marginLeft: '100%' }}
								>
									<FileAddTwoTone
										twoToneColor='red'
										style={{ fontSize: '20px' }}
									/>
								</Link>
							</Space>
						)}
					/>
				</CustomTable>
			</Box>
			<Modal
				open={isCreate !== null}
				footer={false}
				centered
				onCancel={() => setIsCreate(null)}
				width='40%'
				style={{ minWidth: '520px' }}
			>
				<Title style={{ textAlign: 'center' }}>Feedback</Title>
				<Form form={form} name='basic' onFinish={onFinishForm} autoComplete='off'>
					<span>
						<span style={{ color: 'red' }}>*</span>
						Title
					</span>
					<Form.Item
						name='title'
						rules={[{ required: true, message: 'Please input title!' }]}
					>
						<Input placeholder='FEEDBACK ABOUT SECURITY' />
					</Form.Item>

					<span>
						<span style={{ color: 'red' }}>*</span>
						Star
					</span>
					{/* <Form.Item name='star' style={isRateError ? { margin: 0 } : {}}>
						<Rate
							allowHalf
							defaultValue={1}
							onFocus={() => setIsRateError(null)}
							onChange={(e) => setRateNum(e)}
						/>
					</Form.Item> */}
					{isRateError && (
						<p style={{ color: 'red', padding: 0, marginTop: 0 }}>{isRateError}</p>
					)}

					<span>
						<span style={{ color: 'red' }}>*</span>
						Description
					</span>
					<Form.Item
						name='description'
						rules={[{ required: true, message: 'Please input description!' }]}
					>
						<TextArea rows={4} placeholder='Something more about this feedback' />
					</Form.Item>

					<Form.Item style={{ width: '100%', textAlign: 'center', margin: '0' }}>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</CustomCard>
	);
}
