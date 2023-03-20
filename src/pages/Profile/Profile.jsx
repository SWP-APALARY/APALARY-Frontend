import { useEffect, useState } from 'react';

import { Button, DatePicker, Form, Input, Radio, Card, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useNavigate } from 'react-router-dom';

import PDFReader from '../../components/PDFReder';
import toast from '../../components/Toast';
import contractAPI from '../../utils/Apis/contractAPI';
import employeeAPI from '../../utils/Apis/employeeAPI';

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
		dateOfBirth: '',
		gender: '',
		base: '',
		tax: '',
		description: '',
		signedDate: '',
		startDate: '',
		endDate: '',
		contractId: '',
		contractImage: '',
		contractTypeId: '',
		ruleSalaryRuleNumbers: '',
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
		employeeAPI
			.updateProfile({
				name: text.name,
				gender: text.gender,
				phone: text.phone,
				dateOfBirth: text.dateOfBirth,
			})
			.then(() => toast('success'))
			.catch((e) => toast('error', e));
	};

	useEffect(() => {
		employeeAPI
			.get()
			.then((res) =>
				//setText(res.data))
				{
					contractAPI
						.get(res.data.ContractId)
						.then((rest) => setText({ ...rest.data, ...res.data }));
					// .catch(() => navigate('/'));
				}
			)
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
					<Radio.Group value={text.gender}>
						<Radio
							value={0}
							onChange={(e) => setText({ ...text, gender: e.target.value })}
						>
							Female
						</Radio>
						<Radio
							value={1}
							onChange={(e) => setText({ ...text, gender: e.target.value })}
						>
							Male
						</Radio>
						<Radio
							value={2}
							onChange={(e) => setText({ ...text, gender: e.target.value })}
						>
							Other
						</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label='Birth'
					rules={[
						{
							required: true,
							message: 'Please input your Birth!',
						},
					]}
				>
					<DatePicker value={dayjs(text.dateOfBirth, 'YYYY-MM-DD')} />
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
				<Form.Item label='IdentifyNumber' style={{ marginTop: 10 }}>
					<Input value={text.identifyNumber} disabled />
				</Form.Item>
				<Form.Item label='UserName' style={{ marginTop: 10 }}>
					<Input value={text.username} disabled />
				</Form.Item>

				<Form.Item label='Type Of Work' style={{ width: 600 }}>
					<Radio.Group value={text.contractTypeId}>
						<Radio value={2}> Full Time </Radio>
						<Radio value={1}> Part Time </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='SignDate'>
					<DatePicker value={dayjs(text.signedDate, 'YYYY-MM-DD')} disabled />
				</Form.Item>
				<Form.Item label='Term'>
					<RangePicker
						value={[
							dayjs(text.startDate, 'YYYY-MM-DD'),
							dayjs(text.endDate, 'YYYY-MM-DD'),
						]}
						style={{ width: 400 }}
						disabled
					/>
				</Form.Item>

				<Form.Item label='Salary'>
					<Input value={text.base} disabled />
				</Form.Item>
				<Form.Item label='Upload' valuePropName='fileList'>
					<PDFReader file={text.contractImage} id={text.id} />
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
