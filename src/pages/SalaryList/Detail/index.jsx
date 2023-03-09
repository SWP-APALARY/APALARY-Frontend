import React, { useState } from 'react';

import { Button, Col, DatePicker, Form, Input, Row, Typography } from 'antd';

import CustomCard from '../../../components/Card';
import { SalaryDetailForm } from '../ColumnConfig';
import ModalSalaryList from '../Modal';

const { Title } = Typography;
const SalaryListDetail = () => {
	const [openModal, setOpenModal] = useState(false);
	const onOpenModal = () => {
		setOpenModal(true);
	};
	return (
		<CustomCard width={'500px'}>
			<Title>Salary Detail</Title>
			<Form labelAlign='left' layout='vertical'>
				<Row gutter={4} justify={'space-between'}>
					{SalaryDetailForm.map((item) => {
						return (
							<Col key={item.key + 'salary-list-detail'} span={item.span}>
								<Row gutter={10} justify={'space-between'} align='middle'>
									<Col span={item.wrapperCol || 24}>
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
									<Col span={4}>
										{item.detail === true && (
											<Button type='primary' onClick={onOpenModal}>
												Detail
											</Button>
										)}
									</Col>
								</Row>
							</Col>
						);
					})}
				</Row>
			</Form>
			<ModalSalaryList open={openModal} setOpen={setOpenModal} />
		</CustomCard>
	);
};

export default SalaryListDetail;
