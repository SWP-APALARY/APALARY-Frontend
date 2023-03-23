import React from 'react';

import { Button, Form, Input, Typography } from 'antd';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import toast from '../../components/Toast';
import { authAPI } from '../../utils/Apis/authAPI';
import apiHandler from '../../utils/Apis/handler';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';

const { Title } = Typography;
const ChangePassword = () => {
	const [loading, setLoading] = React.useState(false);
	const [token, setToken] = usePersistedState('token');
	const onFinish = async (value) => {
		await apiHandler(
			authAPI,
			'changePassword',
			'Change password success',
			setLoading,
			value.oldPassword,
			value.newPassword
		)
			.then((res) => {
				setToken(res.token);
			})
			.catch(() => {
				toast('Change password failed', 'error');
			});
	};
	return (
		<CustomCard width='450px' loading={loading}>
			<Title>Change Password</Title>
			<Form onFinish={onFinish} layout='vertical'>
				<Form.Item
					label='Current Password'
					name='currentPassword'
					rules={[{ required: true, message: 'Please input your current password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label='New Password'
					name='newPassword'
					rules={[
						{ required: true, message: 'Please input new password!' },
						{
							min: 8,
							message: 'Password must be at least 8 characters',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label='Repeat New Password'
					name='repeatedPassword'
					rules={[
						{ required: true, message: 'Please repeat your password!' },
						({ getFieldValue }) => ({
							validator: (_, value) => {
								if (!value || getFieldValue('newPassword') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Confirm
					</Button>
				</Form.Item>
			</Form>
		</CustomCard>
	);
};

export default ChangePassword;
