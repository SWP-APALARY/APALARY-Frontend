import React, { useEffect, useState } from 'react';

import { Button, DatePicker, Form, Input, Select, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import contractAPI from '../../../utils/Apis/contractAPI';
import { departmentAPI } from '../../../utils/Apis/departmentAPI';

const { Option } = Select;

export default function CreateEmployee({ onFinish }) {
	const navigate = useNavigate();
	const [time, setTime] = useState();
	const [listDepartment, setListDepartment] = useState([]);
	const [listContract, setListContract] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState();
	const [form] = Form.useForm();

	const fetch = async () => {
		setLoading(true);
		await departmentAPI
			.getAll()
			.then(async (res) => await setListDepartment(res.data))
			.catch((err) => {
				console.log(err);
				navigate('/');
			});
		await contractAPI
			.getUnassigned()
			.then(async (res) => await setListContract(res.data))
			.catch((err) => {
				console.log(err);
				navigate('/');
			});
		setLoading(false);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div>
			<h3 style={{ textAlign: 'center', fontSize: '25px' }}>Create employee</h3>
			{loading ? (
				<Skeleton active />
			) : (
				<Form
					name='basic'
					onFinish={(e) => onFinish({ ...e, dateOfBirth: time }, form, fetch, setMessage)}
					autoComplete='off'
					form={form}
					onChange={() => setMessage()}
				>
					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Name
					</span>
					<span style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
						<span style={{ color: 'red' }}>*</span>
						National identification
					</span>
					<Form.Item
						name='name'
						rules={[{ required: true, message: 'Please input your name!' }]}
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
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
						style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
					>
						<Input type='text' placeholder='Ex: 01234567' />
					</Form.Item>

					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Username
					</span>
					<span style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
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
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
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
						style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
					>
						<Input type='password' placeholder='Ex: 123' />
					</Form.Item>

					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Phone
					</span>
					<span style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
						<span style={{ color: 'red' }}>*</span>
						Gender
					</span>
					<Form.Item
						name='phone'
						rules={[{ required: true, message: 'Please input your phone!' }]}
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<Input type='number' placeholder='Ex: 0123456789' />
					</Form.Item>
					<Form.Item
						name='gender'
						rules={[{ required: true, message: 'Please choose your sex!' }]}
						style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
					>
						<Select placeholder='Select'>
							<Option value={0}>Male</Option>
							<Option value={1}>Female</Option>
							<Option value={2}>Other</Option>
						</Select>
					</Form.Item>

					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Email
					</span>
					<span style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
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
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<Input type='email' placeholder='Ex: employee1' />
					</Form.Item>
					<Form.Item
						name='dateOfBirth'
						rules={[{ required: true, message: 'Please select date of birth!' }]}
						style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
					>
						<DatePicker onChange={(e, d) => setTime(d)} style={{ width: '100%' }} />
					</Form.Item>

					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Employee ID
					</span>
					<span style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
						<span style={{ color: 'red' }}>*</span>
						Role
					</span>
					<Form.Item
						name='id'
						rules={[{ required: true, message: 'Please input employee id!' }]}
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<Input placeholder='Ex: SE123' />
					</Form.Item>
					<Form.Item
						name='role'
						rules={[{ required: true, message: 'Please select role!' }]}
						style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
					>
						<Select placeholder='Select'>
							<Option value='EMPLOYEE'>Employee</Option>
							<Option value='MANAGER'>Manager</Option>
							<Option value='HR_EMPLOYEE'>Employee of HR</Option>
							<Option value='HR_MANAGER'>Manager of HR</Option>
							<Option value='HEAD_MANAGER'>CEO</Option>
						</Select>
					</Form.Item>

					<span
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<span style={{ color: 'red' }}>*</span>
						Contract
					</span>
					<span style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}>
						<span style={{ color: 'red' }}>*</span>
						Department
					</span>
					<Form.Item
						name='contractId'
						rules={[
							{ required: true, message: 'Please choose contract of this employee!' },
						]}
						style={{
							display: 'inline-block',
							width: 'calc(50% - 10px)',
							marginRight: '20px',
						}}
					>
						<Select placeholder='Select'>
							{listContract.map((todo) => (
								<Option value={todo.id} key={todo.id}>
									{todo.nameOfEmployee}
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
						style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
					>
						<Select placeholder='Select'>
							{listDepartment.map((todo) => (
								<Option value={todo.id} key={todo.id}>
									{todo.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					{message && <span style={{ color: 'red' }}>{message} Please change it.</span>}

					<Form.Item style={{ width: '100%', textAlign: 'center', margin: '0' }}>
						<Button type='primary' htmlType='submit' disabled={message}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	);
}
