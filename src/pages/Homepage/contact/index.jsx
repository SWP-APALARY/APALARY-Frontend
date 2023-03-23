import { useState } from 'react';

import { Button, Col, Form, Input, notification, Row, Tag } from 'antd';

import FacebookIcon from '../../../assets/homepage/facebook-logo.png';
import GmailIcon from '../../../assets/homepage/gmail-logo.png';
import toast from '../../../components/Toast';
import contactAPI from '../../../utils/Apis/contactAPI';
import themeConfig from '../../../utils/Theme';
import InstagramIcon from './../../../assets/homepage/instagram-logo.png';
import TwitterIcon from './../../../assets/homepage/twitter-logo.png';
import {
	buttonStyle,
	componentStyle,
	formStyle,
	imgStyle,
	mediaStyle,
	tagStyle,
	titleStyle,
} from './styles';

const { TextArea } = Input;

export default function Contact() {
	const [api, contextHolder] = notification.useNotification();
	const [form] = Form.useForm();
	const [onHover, setOnHover] = useState(false);

	const buttonHover = {
		...buttonStyle,
		background: themeConfig.token.colorPrimary,
		color: 'white',
	};
	const buttonBlur = {
		...buttonStyle,
		color: themeConfig.token.colorPrimary,
		background: 'white',
	};
	const openNotificationWithIcon = (name) => {
		api['success']({
			message: 'Send successfully',
			description: `We will response to ${name} soon ❤️`,
		});
	};
	const handleSubmit = (values) => {
		contactAPI
			.send(values)
			.then(() => {
				form.resetFields();
				openNotificationWithIcon(values.name);
			})
			.catch(() => toast('Something error please try again!', 'error'));
	};

	return (
		<Row justify='space-between' style={componentStyle}>
			<Col span={8}>
				<h3 style={titleStyle}>
					Looking for jobs to brew your own magic potion? We can help you!
				</h3>
				<Row>
					<Col span={12}>
						<a style={mediaStyle} href='https://fb.com/profile'>
							<img src={FacebookIcon} alt='facebook icon' style={imgStyle} />
							<span style={{ marginLeft: '10px' }}>fb.com</span>
						</a>
					</Col>
					<Col span={12}>
						<a style={mediaStyle} href='https://www.gmail.com'>
							<img src={GmailIcon} alt='facebook icon' style={imgStyle} />
							<span style={{ marginLeft: '10px' }}>apalary@gmail.com</span>
						</a>
					</Col>
					<Col span={12}>
						<a style={mediaStyle} href='https://www.twitter.com'>
							<img src={TwitterIcon} alt='facebook icon' style={imgStyle} />
							<span style={{ marginLeft: '10px' }}>www.twitter.com</span>
						</a>
					</Col>
					<Col span={12}>
						<a style={mediaStyle} href='https://www.instagram.com'>
							<img src={InstagramIcon} alt='facebook icon' style={imgStyle} />
							<span style={{ marginLeft: '10px' }}>www.instagram.com</span>
						</a>
					</Col>
				</Row>
			</Col>
			<Col span={11}>
				{contextHolder}
				<Form
					form={form}
					layout='horizontal'
					size={{
						size: 'large',
					}}
					style={formStyle}
					onFinish={handleSubmit}
				>
					<h3 style={titleStyle}>Contact Us</h3>
					<Form.Item
						name='name'
						rules={[{ required: true, message: 'Please input your name!' }]}
						style={{ textAlign: 'start' }}
					>
						<Input
							prefix={
								<Tag color={themeConfig.token.colorPrimary} style={tagStyle}>
									Name
								</Tag>
							}
							placeholder='Nguyen Van A'
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: 'Please input your email!' }]}
						name='email'
						style={{ textAlign: 'start' }}
					>
						<Input
							prefix={
								<Tag color={themeConfig.token.colorPrimary} style={tagStyle}>
									Email
								</Tag>
							}
							placeholder='example@gmail.com'
							type='email'
						/>
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: 'Please input your subject!' }]}
						name='subject'
						style={{ textAlign: 'start' }}
					>
						<Input
							prefix={
								<Tag color={themeConfig.token.colorPrimary} style={tagStyle}>
									Subject
								</Tag>
							}
							placeholder='Ask a about company'
						/>
					</Form.Item>
					<Form.Item
						label={
							<p color={themeConfig.token.colorPrimary} style={tagStyle}>
								Message
							</p>
						}
						rules={[{ required: true, message: 'Please input your message!' }]}
						name='message'
						style={{ textAlign: 'start' }}
					>
						<TextArea placeholder='Today I feel so good' />
					</Form.Item>
					<Button
						style={onHover ? buttonHover : buttonBlur}
						onMouseEnter={() => setOnHover(true)}
						onMouseLeave={() => setOnHover(false)}
						htmlType='submit'
					>
						Submit
					</Button>
				</Form>
			</Col>
		</Row>
	);
}
