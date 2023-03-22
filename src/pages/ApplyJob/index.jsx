import React from 'react';

import { Button, Form, Input, notification, Select, Spin } from 'antd';

import applicantAPI from '../../utils/Apis/applicantAPI';
import { ApplyJobComponent } from './styles';

import { LoadingOutlined } from '@ant-design/icons/lib/icons';

const { Option } = Select;

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 18,
			marginLeft: '5px',
			color: 'white',
		}}
		spin
	/>
);

export default function ApplyJob({ onOk, id }) {
	const [api, contextHolder] = notification.useNotification();
	const [fileBase64, setFileBase64] = React.useState('');
	const [isLoad, setIsLoad] = React.useState(false);
	const [fileError, setFileError] = React.useState();

	const onFinish = async (value) => {
		if (fileError || isLoad) return;
		if (fileBase64 === '') {
			setFileError('Please upload your CV!');
		} else if (!fileBase64.includes('data:application/pdf')) {
			setFileError('File upload must be PDF file');
		} else {
			await setIsLoad(true);
			await applicantAPI.createApplicant({
				name: value.name,
				phone: value.phone,
				email: value.email,
				gender: value.sex,
				cv: fileBase64,
				jobOfferingId: id,
			});
			await setIsLoad(false);
			openNotificationWithIcon();
			await onOk();
		}
	};

	const convertToBase64 = (file) => {
		if (file) {
			if (file.size < 3000000) {
				const reader = new FileReader();

				reader.onloadend = async () => {
					await setFileBase64(reader.result.toString());
					setFileError();
				};

				reader.readAsDataURL(file);
			} else {
				setFileError('File size too large, should be less than 3gb!');
			}
		} else {
			setFileBase64('');
			setFileError('Please upload your CV!');
		}
	};

	const openNotificationWithIcon = () => {
		api['success']({
			message: 'Submit successfully',
			description: `We will response to you soon ❤️`,
		});
	};

	return (
		<ApplyJobComponent>
			{contextHolder}
			<h3>Apply Job</h3>
			<Form name='basic' onFinish={onFinish} autoComplete='off'>
				<span>
					<span style={{ color: 'red' }}>*</span>
					Name
				</span>
				<Form.Item
					name='name'
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input placeholder='Input your name' />
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
					Sex
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
					<Input type='number' placeholder='Input your phone number' />
				</Form.Item>
				<Form.Item
					name='sex'
					rules={[{ required: true, message: 'Please choose your sex!' }]}
					style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
				>
					<Select placeholder='Select'>
						<Option value={0}>Male</Option>
						<Option value={1}>Female</Option>
						<Option value={2}>Other</Option>
					</Select>
				</Form.Item>

				<span>
					<span style={{ color: 'red' }}>*</span>
					Email
				</span>
				<Form.Item
					name='email'
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input type='email' placeholder='Input your email' />
				</Form.Item>

				<span>
					<span style={{ color: 'red' }}>*</span>
					CV
				</span>
				<Form.Item
					name='cv'
					getValueFromEvent={(e) => convertToBase64(e.target.files[0])}
					style={fileError ? { marginBottom: 0 } : {}}
				>
					<Input type='file' accept='application/pdf' />
				</Form.Item>
				{fileError && (
					<span style={{ display: 'inline-block', color: 'red', marginBottom: '1rem' }}>
						{fileError}
					</span>
				)}

				<Form.Item style={{ width: '100%', textAlign: 'center', margin: '0' }}>
					<Button type='primary' htmlType='submit'>
						Submit {isLoad && <Spin indicator={antIcon} />}
					</Button>
				</Form.Item>
			</Form>
		</ApplyJobComponent>
	);
}
