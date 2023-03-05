import { useEffect, useState } from 'react';

import { Button, Col, Form, Row, Typography } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import CustomEditor from '../../../components/Editor';
import CustomInput from '../../../components/Input';
import applicationAPI from '../../../utils/Apis/applicationAPI';
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
	const [currentType, setCurrentType] = useState();
	const [token, setToken] = usePersistedState('token');
	const onSubmit = () => {
		// Get content from editor then convert to raw
		const raw = convertToRaw(editorState.getCurrentContent());
		// set the content to form
		form.setFieldValue('description', JSON.stringify(raw));
		console.log(form.getFieldsValue());
	};
	useEffect(() => {
		const fetchType = async () => {
			const res = await apiHandler(applicationAPI, 'getAllType', '', null, token);
			console.log(res);
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
				<Row gutter={4}>
					{form.getFieldValue('type') === 4 &&
						applicationConfigTypeReport.map((item) => (
							<Col key={item.label + 'create-application'} span={item.col}>
								<Form.Item label={item.label} name={item.name} rules={item.rules}>
									<CustomInput type={item.type} option={type} />
								</Form.Item>
							</Col>
						))}
					<Col>
						<Form.Item
							label='Description'
							name='description'
							required
							validateStatus={'error'}
						>
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
					</Col>
				</Row>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Create
					</Button>
				</Form.Item>
			</Form>
		</CustomCard>
	);
};

export default CreateApplication;
