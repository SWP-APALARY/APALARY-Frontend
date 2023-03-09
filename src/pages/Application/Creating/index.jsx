import { useEffect, useState } from 'react';

import { Button, Col, Form, Row, Typography } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import { useNavigate } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomEditor from '../../../components/Editor';
import CustomInput from '../../../components/Input';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import employeeAPI from '../../../utils/Apis/employeeAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import themeConfig from '../../../utils/Theme';
import { applicationConfigForm, applicationConfigTypeReport } from './configForm';

import { useForm } from 'antd/es/form/Form';

const { Title } = Typography;
const CreateApplication = () => {
	const [type, setType] = useState();
	const [form] = Form.useForm();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [destinationEmployees, setDestinationEmployees] = useState([]);
	const [token, setToken] = usePersistedState('token');
	const [loading, setLoading] = usePersistedState(false);
	const navigate = useNavigate();

	const onSubmit = async () => {
		// Get content from editor then convert to raw
		const raw = convertToRaw(editorState.getCurrentContent());
		// set the content to form
		form.setFieldValue('description', JSON.stringify(raw));
		const formData = form.getFieldsValue();
		await apiHandler(applicationAPI, 'post', 'success', setLoading, formData, token).then(
			() => {
				form.resetFields();
				setEditorState(EditorState.createEmpty());
			}
		);
	};
	useEffect(() => {
		const fetchType = async () => {
			const res = await apiHandler(applicationAPI, 'getAllType', '', null, token);
			const employeeList = await apiHandler(employeeAPI, 'getAll', '', null, token);
			setDestinationEmployees(
				employeeList.map((item) => ({
					type: `${item.username} - ${item.name}`,
					id: `${item.id}`,
				}))
			);
			setType(res);
		};
		fetchType();
	}, []);
	return (
		<CustomCard width={'800px'}>
			<Title>Create Application</Title>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				{applicationConfigForm.map((item) => (
					<Form.Item
						key={item.label + 'create-application'}
						label={item.label}
						name={item.name}
						rules={item.rules}
					>
						<CustomInput
							type={item.type}
							option={type}
							key={'option-application-type'}
						/>
					</Form.Item>
				))}
				<Form.Item
					noStyle
					shouldUpdate={(prevValues, currentValues) =>
						prevValues.applicationTypeId !== currentValues.applicationTypeId
					}
				>
					{({ getFieldValue }) =>
						getFieldValue('applicationTypeId') === 4 ? (
							<Row gutter={5}>
								{applicationConfigTypeReport.map((item) => (
									<Col
										key={item.label + 'create-application-report'}
										span={item.col}
									>
										<Form.Item
											label={item.label}
											name={item.name}
											rules={item.rules}
										>
											<CustomInput
												type={item.type}
												option={destinationEmployees}
												key={'option-application-destination'}
											/>
										</Form.Item>
									</Col>
								))}
							</Row>
						) : null
					}
				</Form.Item>

				<Form.Item label='Description' name='description' required validateStatus={'error'}>
					<Box bordered={true}>
						<CustomEditor
							height='200px'
							required
							editorState={editorState}
							editorStyle={{
								border: '1px solid ' + themeConfig.customColor.border,
								padding: '10px',
								minHeight: '200px',
							}}
							onEditorStateChange={setEditorState}
						/>
					</Box>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' loading={loading}>
						Create
					</Button>
				</Form.Item>
			</Form>
		</CustomCard>
	);
};

export default CreateApplication;
