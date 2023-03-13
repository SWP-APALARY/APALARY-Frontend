import React, { useContext, useEffect, useState } from 'react';

import { Button, Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import CustomCard from '../../../components/Card';
import Loading, { LoadingContext } from '../../../components/Loading';
import apiHandler from '../../../utils/Apis/handler';
import salaryAPI from '../../../utils/Apis/salaryAPI';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import { SalaryDetailForm } from '../ColumnConfig';
import ModalSalaryList from '../Modal';

const { Title } = Typography;
const SalaryListDetail = () => {
	const [openModal, setOpenModal] = useState(false);
	// const [loading, setLoading] = useState(false);
	const params = useParams();
	const { loading, setLoading } = useContext(LoadingContext);
	const startDate = dayjs(new Date());
	const onOpenModal = () => {
		setOpenModal(true);
	};
	const [token, setToken] = usePersistedState('token');
	useEffect(() => {
		const memor = true;
		const fetch = async () => {
			setLoading(true);
			const res = await apiHandler(
				salaryAPI,
				'getOneByMonth',
				'',
				setLoading,
				params.id,
				startDate.month(),
				startDate.year(),
				token
			);
			console.log(res);
		};
		fetch();
	}, []);
	return (
		<Loading>
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
		</Loading>
	);
};

export default SalaryListDetail;
