import React, { useEffect, useState } from 'react';

import { Button, DatePicker, Form, Input, InputNumber, Skeleton, Typography, Upload } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomEditor from '../../../components/Editor';
import toast from '../../../components/Toast';
import contractsAPI from '../../../utils/Apis/contractsAPI';
import apiHandler from '../../../utils/Apis/handler';
import { convertToEditor } from '../../../utils/DraftjsHelper';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import themeConfig from '../../../utils/Theme';
import { formConfig } from './formConfig';

import { PlusOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import TextArea from 'antd/es/input/TextArea';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Title, Text } = Typography;
const ContractCreation = () => {
	const [data, setData] = useState();
	const [token] = usePersistedState('token');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const onSubmit = async () => {
		const formData = form.getFieldsValue();
		await apiHandler(contractsAPI, 'post', 'success', setLoading, formData, token).then(() => {
			form.resetFields();
		});
		navigate(-1);
	};

	const onFinishFailed = (errorInfo) => {
		toast(errorInfo, 'error');
	};
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
										key={item.name + '-post-form'}
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
												<DatePicker style={{ width: '100%' }} />
											) : null
											// <Input />
										}
									</Form.Item>
								);
							})}
							<Form.Item label='Description' valuePropName='fileList'>
								<Upload listType='picture-card'>
									<div>
										<PlusOutlined />
										<div style={{ marginTop: 8 }}>Upload</div>
									</div>
								</Upload>
							</Form.Item>
							<Form.Item>
								<Button type='primary' htmlType='submit'>
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
