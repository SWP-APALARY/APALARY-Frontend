import { useState, useEffect } from 'react';

import { Form, Input, Select, DatePicker, Upload, Radio, Card } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import PDFReader from '../../components/PDFReder';
import contractAPI from '../../utils/Apis/contractAPI/index.js';

// import data from './data.js';
import { PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const Contract = () => {
	const navigate = useNavigate();

	const [text, setText] = useState({
		id: '',
		base: '',
		tax: '',
		socialAssurances: '',
		medicalAssurances: '',
		accidentalAssurances: '',
		description: '',
		signedDate: '',
		startDate: '',
		endDate: '',
		contractImage: '',
		contractTypeId: '',
		ruleSalaryRuleNumbers: '',
	});
	useEffect(() => {
		contractAPI
			.get()
			.then((res) => setText(res.data))
			.catch(() => navigate('/'));
	}, []);
	return (
		<Card
			title='Contract'
			bordered={false}
			style={{
				width: 700,
			}}
		>
			<Form
				labelCol={{ span: 7 }}
				wrapperCol={{ span: 14 }}
				layout='horizontal'
				style={{ maxWidth: 800 }}
			>
				<Form.Item label='Type Of Work' style={{ width: 600 }}>
					<Radio.Group value={1}>
						<Radio value={1}> Full Time </Radio>
						<Radio value={2}> Part Time </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='SignDate'>
					<DatePicker value={dayjs(text.signedDate, 'YYYY-MM-DD')} readOnly />
				</Form.Item>
				<Form.Item label='Term'>
					<RangePicker
						value={[
							dayjs(text.startDate, 'YYYY-MM-DD'),
							dayjs(text.endDate, 'YYYY-MM-DD'),
						]}
						style={{ width: 400 }}
						readOnly
					/>
				</Form.Item>
				<Form.Item label='Salary'>
					<Input value={text.base} readOnly />
				</Form.Item>

				<PDFReader file={text.contractImage} id={text.id} />
			</Form>
		</Card>
	);
};

export default () => <Contract />;
