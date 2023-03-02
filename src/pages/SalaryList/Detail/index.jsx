import React from 'react';

import { Col, DatePicker, Form, Input, Row, Typography } from 'antd';

import CustomCard from '../../../components/Card';
import moneyConverter from '../../../utils/moneyConverter';
import { SalaryDetailForm } from '../ColumnConfig';

const { Title } = Typography;
const SalaryListDetail = () => {
	console.log(moneyConverter(12345678));
	return (
		<CustomCard width={'450px'}>
			<Title>Salary Detail</Title>
			<Form labelAlign='left' layout='vertical'>
				<Row gutter={4} justify={'space-between'}>
					{SalaryDetailForm.map((item) => {
						return (
							<Col key={item.key + 'salary-list-detail'} span={item.span}>
								<Form.Item label={item.title} name={item.dataIndex}>
									{!item.type && <Input readOnly />}
									{item.type === 'number' && (
										<Input readOnly suffix='VNĐ' value='100000' />
									)}
									{item.type === 'date' && (
										<DatePicker format='MM/YYYY' picker='month' />
									)}
								</Form.Item>
							</Col>
						);
					})}
				</Row>
			</Form>
		</CustomCard>
	);
};

export default SalaryListDetail;
