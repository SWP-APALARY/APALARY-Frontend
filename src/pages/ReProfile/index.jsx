import { useEffect, useState } from 'react';

import { Button, DatePicker, Form, Input, Radio, Card, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useNavigate } from 'react-router-dom';

import PDFReader from '../../components/PDFReder';
import toast from '../../components/Toast';
import residentAPI from '../../utils/Apis/residentAPI/index.js';

import { PlusOutlined } from '@ant-design/icons';

// import Profile from './data';

const FormDisabledDemo = () => {
	const { RangePicker } = DatePicker;
	const navigate = useNavigate();
	const [componentDisabled, setComponentDisabled] = useState(true);
	const [text, setText] = useState({
		phone: '',
		name: '',
		identifyNumber: '',
		username: '',
		password: '',
		gender: '',
		apartmentNumber: '',
		email: '',
	});
	const onFormLayoutChange = ({ disabled }) => {
		setComponentDisabled(disabled);
	};
	const onFinish = (values) => {
		toast('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		toast(errorInfo, 'error');
	};
	const onSubmitForm = (e) => {
		setComponentDisabled(!e.target.checked);
		residentAPI
			.updateProfile({
				name: text.name,
				gender: text.gender,
				phone: text.phone,
				dateOfBirth: text.dateOfBirth.toString(),
				identifyNumber: text.identifyNumber,
				email: text.email,
			})
			.then(() => toast('success'))
			.catch((e) => toast('error', e));
	};

	useEffect(() => {
		residentAPI
			.get()
			.then((res) => setText(res.data))
			.catch(() => navigate('/'));
	}, []);

	return (
		<Card
			title='Personal Information'
			bordered={false}
			style={{
				width: 700,
			}}
		>
			<Form
				labelCol={{
					span: 7,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'
				onValuesChange={onFormLayoutChange}
				disabled={componentDisabled}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				style={{
					maxWidth: 600,
					marginBottom: 20,
				}}
			>
				<Form.Item
					label='Full Name'
					rules={[
						{
							required: true,
							message: 'Please input your Name!',
						},
					]}
					style={{ marginTop: 10 }}
				>
					<Input
						value={text.name}
						onChange={(e) => setText({ ...text, name: e.target.value })}
					/>
				</Form.Item>
				<Form.Item label='Gender'>
					<Radio.Group
						value={text.gender}
						onChange={(e) => setText({ ...text, gender: e.target.value })}
					>
						<Radio value={0}>Female</Radio>
						<Radio value={1}>Male</Radio>
						<Radio value={2}>Other</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label='Phone'
					rules={[
						{
							type: 'number',
							min: 0,
							message: 'Please, Enter a valid number',
							required: true,
						},
					]}
					style={{ marginTop: 10 }}
				>
					<Input
						value={text.phone}
						onChange={(e) => setText({ ...text, phone: e.target.value })}
					/>
				</Form.Item>
				<Form.Item
					label='IdentifyNumber'
					rules={[
						{
							pattern: new RegExp(/^[0-9]*$/),
							message: 'Please, Enter a valid number',
							required: true,
						},
					]}
					style={{ marginTop: 10 }}
				>
					<Input
						value={text.identifyNumber}
						onChange={(e) => setText({ ...text, identifyNumber: e.target.value })}
					/>
				</Form.Item>
				<Form.Item
					label='Email'
					rules={[
						{
							required: true,
							message: 'Please input your Email!',
						},
					]}
					style={{ marginTop: 10 }}
				>
					<Input
						value={text.email}
						onChange={(e) => setText({ ...text, email: e.target.value })}
					/>
				</Form.Item>

				<Form.Item label='Apartment Number' style={{ marginTop: 10 }}>
					<Input value={text.apartmentNumber} disabled />
				</Form.Item>

				<Button
					type='dashed'
					htmlType='submit'
					style={{
						marginLeft: 275,
					}}
					onClick={(e) => onSubmitForm(e)}
				>
					Update
				</Button>
			</Form>

			<Button
				type='primary'
				style={{ marginLeft: 286 }}
				onClick={() => setComponentDisabled(!componentDisabled)}
			>
				{componentDisabled ? 'Edit' : '  Cancel'}
			</Button>
		</Card>
	);
};
export default FormDisabledDemo;
