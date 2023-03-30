import { useEffect, useState } from 'react';

import { Button, DatePicker, Form, Input, Radio, Card, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useNavigate } from 'react-router-dom';

import PDFReader from '../../components/PDFReder';
import toast from '../../components/Toast';
import contractAPI from '../../utils/Apis/contractAPI';
import employeeAPI from '../../utils/Apis/employeeAPI';
import moneyConverter from '../../utils/moneyConverter';

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
		dateOfBirth: dayjs(new Date()),
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
		managerName: '',
		departmentName: '',
		role: '',
		email: '',
	});
	const onFormLayoutChange = ({ disabled }) => {
		setComponentDisabled(disabled);
	};
	const onFinish = (values) => {
		toast(values, 'success');
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
				dateOfBirth: text.dateOfBirth.toString(),
				identifyNumber: text.identifyNumber,
				email: text.email,
			})
			.then(() => toast('Success', 'success'))
			.catch((e) => toast('Fail to update', 'error'));
	};

	useEffect(() => {
		employeeAPI
			.get()
			.then((res) =>
				//setText(res.data))
				{
					contractAPI.get(res.data.ContractId).then((rest) =>
						setText({
							...rest.data,
							...res.data,
							dateOfBirth: dayjs(res.data.dateOfBirth, 'YYYY/MM/DD'),
						})
					);
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
					label='Birth'
					rules={[
						{
							required: true,
							message: 'Please input your Birth!',
						},
					]}
				>
					<DatePicker
						onChange={(value) =>
							setText({ ...text, dateOfBirth: dayjs(value, 'YYYY-MM-DD') })
						}
						value={text.dateOfBirth}
					/>
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
					label='Identify number'
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
				<Form.Item label='Username' style={{ marginTop: 10 }}>
					<Input value={text.username} disabled />
				</Form.Item>
				<Form.Item label='Type Of Work' style={{ width: 600 }}>
					<Radio.Group value={text.contractTypeId} disabled>
						<Radio value={2}> Full Time </Radio>
						<Radio value={1}> Part Time </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Sign Date'>
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
				<Form.Item label='Base Salary'>
					<Input value={moneyConverter(text.base) + ' VNĐ'} disabled />
				</Form.Item>
				{
					// <Form.Item label='Manager Name' style={{ marginTop: 10 }}>
					// 	// <Input value={text.managerName} disabled />
					// 	//{' '}
					// </Form.Item>
				}
				<Form.Item label='Department Name' style={{ marginTop: 10 }}>
					<Input value={text.departmentName} disabled />
				</Form.Item>
				<Form.Item>
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
