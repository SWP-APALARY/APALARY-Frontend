import React, { useState } from 'react';

import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

export default function CreateEmployee({ onFinish }) {
	return (
		<div>
			<h3>Create employee</h3>
			<Form name='basic' onFinish={onFinish} autoComplete='off'>
				<span>
					<span style={{ color: 'red' }}>*</span>
					Name
				</span>
				<Form.Item
					name='name'
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input placeholder='Ex: Nguyen Van A' />
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
					<Input type='number' placeholder='Ex: 0123456789' />
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
					<Input type='email' placeholder='Ex: employee@gmail.com' />
				</Form.Item>

				<Form.Item style={{ width: '100%', textAlign: 'center', margin: '0' }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
