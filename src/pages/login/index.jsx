import React from 'react';

import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import characterImage from '../../assets/login/character.png';
import codeImage from '../../assets/login/code.png';
import laptopImage from '../../assets/login/laptop-blank.png';
import screenImage from '../../assets/login/screen.png';
import authApi from '../../utils/Apis/auth';
import { LoginComponent } from './style';

import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons/lib/icons';

const { Title } = Typography;

export default function Login() {
	const [loginError, setLoginError] = React.useState(false);
	const navigate = useNavigate();

	const onFinish = (values) => {
		authApi
			.login(values)
			.then((response) => {
				setLoginError(false);
				localStorage.setItem('token', response.data);
				return navigate('/');
			})
			.catch(() => setLoginError(true));
	};

	return (
		<LoginComponent>
			<div className='container-login-form'>
				<div className='image-secure'>
					<img src={laptopImage} className='laptop' />
					<img src={codeImage} className='code' />
					<img src={characterImage} className='character' />
					<img src={screenImage} className='screen' />
				</div>

				<Form
					name='normal_login'
					className='login-form'
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Title level={2}>Login</Title>
					<Form.Item
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your Username!',
							},
						]}
					>
						<Input
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder='Username'
							onFocus={() => setLoginError(false)}
						/>
					</Form.Item>
					<Form.Item
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
							onFocus={() => setLoginError(false)}
						/>
					</Form.Item>
					{loginError && (
						<p style={{ color: 'red', textAlign: 'start', marginTop: '-10px' }}>
							Username or password wrong!
						</p>
					)}

					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button'>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</div>
		</LoginComponent>
	);
}