import React, { useEffect, useState } from 'react';

import {
	Button,
	DatePicker,
	Form,
	Image,
	Input,
	InputNumber,
	Select,
	Skeleton,
	Typography,
	Upload,
} from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomEditor from '../../../components/Editor';
import toast from '../../../components/Toast';
import contractsAPI from '../../../utils/Apis/contractsAPI';
import { departmentAPI } from '../../../utils/Apis/departmentAPI';
import employeeAPI from '../../../utils/Apis/employeeAPI';
import apiHandler from '../../../utils/Apis/handler';
import { convertToEditor } from '../../../utils/DraftjsHelper';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import themeConfig from '../../../utils/Theme';
import { formConfig } from './formConfig';

import { PlusOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import TextArea from 'antd/es/input/TextArea';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Option } = Select;
const { Title, Text } = Typography;
const ContractCreation = () => {
	const [data, setData] = useState();
	const [token] = usePersistedState('token');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [fileBase64, setFileBase64] = React.useState('');
	const [fileError, setFileError] = React.useState();
	const [dateSigned, setDateSigned] = React.useState();
	const [startDate, setStartDate] = React.useState();
	const [endDate, setEndDate] = React.useState();
	const [contractType, setContractType] = React.useState([]);
	const [contractList, setContractList] = React.useState([]);
	const [message, setMessage] = useState();
	const onSubmit = async () => {
		if (fileError) return;
		if (fileBase64 === '') {
			setFileError('Please upload contract file!');
		} else {
			const formData = form.getFieldsValue();
			if (formData.employeeId == 'undefined') {
				await apiHandler(contractsAPI, 'post', 'success', setLoading, {
					...formData,
					contractImage: fileBase64,
				}).then(() => {
					form.resetFields();
				});
				navigate(-1);
			} else {
				await apiHandler(contractsAPI, 'resign', 'success', setLoading, {
					...formData,
					contractImage: fileBase64,
				}).then(() => {
					form.resetFields();
				});
				navigate(-1);
			}
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast(errorInfo, 'error');
	};

	const convertToBase64 = (file) => {
		if (file) {
			if (file.size < 3000000) {
				const reader = new FileReader();

				reader.onloadend = async () => {
					if (reader.result.toString().startsWith('data:application/pdf')) {
						await setFileBase64(reader.result.toString());
						setFileError();
					} else {
						setFileBase64('');
						setFileError('File upload must be pdf file!');
					}
				};

				reader.readAsDataURL(file);
			} else {
				setFileBase64('');
				setFileError('File size too large, should be less than 3gb!');
			}
		} else {
			setFileBase64('');
			setFileError('Please upload contract file!');
		}
	};
	useEffect(() => {
		const fetch = async () => {
			const resCon = await apiHandler(contractsAPI, 'getContractType', '', setLoading, null);
			setContractType(resCon || []);
			const res = await apiHandler(employeeAPI, 'getAllActive', '', setLoading, null);
			setContractList(res || []);
		};
		fetch();
	}, []);
	return (
		<Box>
			<CustomCard bordered width='800px' loading={loading}>
				<Box direction='vertical'>
					<Box direction='vertical' align='center'>
						<Title>Create New Contract</Title>
					</Box>
					<Box direction='vertical'>
						<Form
							form={form}
							layout='vertical'
							onFinish={onSubmit}
							onFinishFailed={onFinishFailed}
						>
							{formConfig.map((item) => {
								return (
									<Form.Item
										key={item.label + '-contract-form'}
										label={item.label}
										name={item.name}
										rules={[...item.rules]}
										style={{
											display: 'inline-block',
											width: 'calc(50% - 8px)',
											marginLeft: 5,
										}}
									>
										{
											item.type === 'number' ? (
												<InputNumber style={{ width: '100%' }} />
											) : item.type === 'text' ? (
												<Input style={{ width: '100%' }} />
											) : item.type === 'textarea' ? (
												<TextArea style={{ width: '100%' }} />
											) : item.type === 'date' ? (
												<DatePicker
													style={{ width: '100%' }}
													onChange={(date, dateString) =>
														setDateSigned(dateString)
													}
												/>
											) : item.type === 'date1' ? (
												<DatePicker
													style={{ width: '100%' }}
													onChange={(date, dateString) =>
														setStartDate(dateString)
													}
												/>
											) : item.type === 'date2' ? (
												<DatePicker
													style={{ width: '100%' }}
													onChange={(date, dateString) =>
														setEndDate(dateString)
													}
												/>
											) : item.type === 'type' ? (
												<Select placeholder='Select'>
													{contractType.map((todo) => (
														<Option value={todo.id} key={todo.id}>
															{todo.type}
														</Option>
													))}
												</Select>
											) : null
											// <Input />
										}
									</Form.Item>
								);
							})}
							<Form.Item
								label='Employee Name'
								name='employeeId'
								style={{
									display: 'inline-block',
									width: 'calc(50% - 8px)',
									marginLeft: 5,
								}}
							>
								<Select placeholder='Select'>
									{contractList.map((todo) => (
										<Option value={todo.id} key={todo.id}>
											{todo.name}
										</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								label='Contract'
								name='contractImage'
								getValueFromEvent={(e) => convertToBase64(e.target.files[0])}
								style={fileError ? { marginBottom: 0 } : {}}
							>
								<Input type='file' accept='application/pdf' />
							</Form.Item>
							{fileError && (
								<span
									style={{
										display: 'inline-block',
										color: 'red',
										marginBottom: '1rem',
									}}
								>
									{fileError}
								</span>
							)}

							<Form.Item>
								<Button type='primary' htmlType='submit' loading={loading}>
									Create
								</Button>
							</Form.Item>
						</Form>
					</Box>
				</Box>
			</CustomCard>
		</Box>
	);
};

export default ContractCreation;
