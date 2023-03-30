import React, { useEffect, useState } from 'react';

import { Button, DatePicker, Form, Image, Input, Select, Skeleton } from 'antd';

import toast from '../../../components/Toast';
import contractAPI from '../../../utils/Apis/contractAPI';
import { departmentAPI } from '../../../utils/Apis/departmentAPI';

const { Option } = Select;

const styleItem = {
	display: 'inline-block',
	width: 'calc(50% - 10px)',
	marginRight: '20px',
	marginBottom: '10px',
};
const styleSpan = {
	display: 'inline-block',
	width: 'calc(50% - 10px)',
	marginRight: '20px',
	marginBottom: '5px',
};

export default function CreateEmployee({ onFinish }) {
	const [time, setTime] = useState();
	const [listDepartment, setListDepartment] = useState([]);
	const [listContract, setListContract] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState();
	const [form] = Form.useForm();
	const [fileBase64, setFileBase64] = React.useState('');
	const [fileError, setFileError] = React.useState();

	const fetch = async () => {
		setLoading(true);
		await departmentAPI
			.getAll()
			.then(async (res) => await setListDepartment(res.data))
			.catch((err) => {
				console.log(err);
				toast('Error when get list department!', 'error');
			});
		await contractAPI
			.getUnassigned()
			.then(async (res) => await setListContract(res.data))
			.catch((err) => {
				console.log(err);
				toast('Error when get list contract!', 'error');
			});
		setLoading(false);
	};

	const convertToBase64 = (file) => {
		if (file) {
			if (file.size < 3000000) {
				const reader = new FileReader();

				reader.onloadend = async () => {
					if (reader.result.toString().startsWith('data:image')) {
						await setFileBase64(reader.result.toString());
						setFileError();
					} else {
						setFileBase64('');
						setFileError('File upload must be image type!');
					}
				};

				reader.readAsDataURL(file);
			} else {
				setFileBase64('');
				setFileError('File size too large, should be less than 3gb!');
			}
		} else {
			setFileBase64('');
			setFileError('Please upload employee avatar!');
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div>
			<h3 style={{ textAlign: 'center', fontSize: '25px' }}>Create employee information</h3>
			{loading ? (
				<Skeleton active />
			) : (
				<Form
					name='basic'
					onFinish={(e) =>
						onFinish(
							{ ...e, dateOfBirth: time, avatar: fileBase64 },
							form,
							fetch,
							setMessage
						)
					}
					autoComplete='off'
					form={form}
					onChange={() => setMessage()}
				>
					<span style={styleSpan}>
						<span style={{ color: 'red' }}>*</span>
						Name
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						National identification
					</span>
					<Form.Item
						name='name'
						rules={[{ required: true, message: 'Please input your name!' }]}
						style={styleItem}
					>
						<Input placeholder='Ex: Nguyen Van A' />
					</Form.Item>
					<Form.Item
						name='identifyNumber'
						rules={[
							{ required: true, message: 'Please input identify number!' },
							{
								pattern: new RegExp(/^[0-9]*$/),
								message: 'Only numbers are accepted!',
							},
						]}
						style={{
							display: 'inline-block',
							marginBottom: '10px',
							width: 'calc(50% - 10px)',
						}}
					>
						<Input type='text' placeholder='Ex: 01234567' />
					</Form.Item>

					<span style={styleSpan}>
						<span style={{ color: 'red' }}>*</span>
						Username
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Password
					</span>
					<Form.Item
						name='username'
						rules={[
							{ required: true, message: 'Please input username!' },
							{
								pattern: new RegExp(/^[a-zA-Z0-9]*$/),
								message: 'No space or special characters allowed',
							},
						]}
						style={styleItem}
					>
						<Input type='text' placeholder='Ex: employee1' />
					</Form.Item>
					<Form.Item
						name='password'
						rules={[
							{ required: true, message: 'Please input password!' },
							{
								pattern: new RegExp(/^[a-zA-Z0-9]*$/),
								message: 'No space or special characters allowed',
							},
						]}
						style={{
							display: 'inline-block',
							marginBottom: '10px',
							width: 'calc(50% - 10px)',
						}}
					>
						<Input type='password' placeholder='Ex: 123' />
					</Form.Item>

					<span style={styleSpan}>
						<span style={{ color: 'red' }}>*</span>
						Phone
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Gender
					</span>
					<Form.Item
						name='phone'
						rules={[{ required: true, message: 'Please input your phone!' }]}
						style={styleItem}
					>
						<Input type='number' placeholder='Ex: 0123456789' />
					</Form.Item>
					<Form.Item
						name='gender'
						rules={[{ required: true, message: 'Please choose your sex!' }]}
						style={{
							display: 'inline-block',
							marginBottom: '10px',
							width: 'calc(50% - 10px)',
						}}
					>
						<Select placeholder='Select'>
							<Option value={0}>Male</Option>
							<Option value={1}>Female</Option>
							<Option value={2}>Other</Option>
						</Select>
					</Form.Item>

					<span style={styleSpan}>
						<span style={{ color: 'red' }}>*</span>
						Email
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Date of birth
					</span>
					<Form.Item
						name='email'
						rules={[
							{ required: true, message: 'Please input email!' },
							{
								pattern: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
								message: 'Please enter a valid email address!',
							},
						]}
						style={styleItem}
					>
						<Input type='email' placeholder='Ex: employee1@gmail.com' />
					</Form.Item>
					<Form.Item
						name='dateOfBirth'
						rules={[{ required: true, message: 'Please select date of birth!' }]}
						style={{
							display: 'inline-block',
							marginBottom: '10px',
							width: 'calc(50% - 10px)',
						}}
					>
						<DatePicker onChange={(e, d) => setTime(d)} style={{ width: '100%' }} />
					</Form.Item>

					<span style={styleSpan}>
						<span style={{ color: 'red' }}>*</span>
						Contract
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Department
					</span>
					<Form.Item
						name='contractId'
						rules={[
							{ required: true, message: 'Please choose contract of this employee!' },
						]}
						style={styleItem}
					>
						<Select placeholder='Select'>
							{listContract.map((todo) => (
								<Option value={todo.id} key={todo.id}>
									{todo.nameEmp}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name='departmentId'
						rules={[
							{
								required: true,
								message: 'Please choose department of this employee!',
							},
						]}
						style={{
							display: 'inline-block',
							marginBottom: '10px',
							width: 'calc(50% - 10px)',
						}}
					>
						<Select placeholder='Select'>
							{listDepartment.map((todo) => (
								<Option value={todo.id} key={todo.id}>
									{todo.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<span style={styleSpan}>
						<span style={{ color: 'red' }}>*</span>
						Avatar
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Role
					</span>
					<Form.Item
						name='avatar'
						getValueFromEvent={(e) => convertToBase64(e.target.files[0])}
						style={styleItem}
					>
						<Input type='file' accept='image/*' />
					</Form.Item>
					<Form.Item
						name='role'
						rules={[{ required: true, message: 'Please select role!' }]}
						style={{
							display: 'inline-block',
							marginBottom: '10px',
							width: 'calc(50% - 10px)',
						}}
					>
						<Select placeholder='Select'>
							<Option value='EMPLOYEE'>Employee</Option>
							<Option value='MANAGER'>Manager</Option>
							<Option value='HR_EMPLOYEE'>Employee of HR</Option>
							<Option value='HR_MANAGER'>Manager of HR</Option>
							<Option value='HEAD_MANAGER'>CEO</Option>
						</Select>
					</Form.Item>
					{fileError && (
						<span
							style={{ display: 'inline-block', color: 'red', marginBottom: '1rem' }}
						>
							{fileError}
						</span>
					)}
					{fileBase64 && fileBase64.trim() !== '' && (
						<Image src={fileBase64} width={100} />
					)}

					{message && <span style={{ color: 'red' }}>{message}</span>}

					<Form.Item style={{ width: '100%', textAlign: 'center', margin: '1rem 0 0 0' }}>
						<Button type='primary' htmlType='submit' disabled={message}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	);
}
