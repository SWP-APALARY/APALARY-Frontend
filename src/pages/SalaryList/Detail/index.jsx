import React, { useContext, useEffect, useState } from 'react';

import { Button, Col, DatePicker, Form, Input, Row, Statistic, Typography } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import AnimatedCountUp from '../../../components/AnimatedCountup';
import CustomCard from '../../../components/Card';
import Loading, { LoadingContext } from '../../../components/Loading';
import apiHandler from '../../../utils/Apis/handler';
import salaryAPI from '../../../utils/Apis/salaryAPI';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import themeConfig from '../../../utils/Theme';
import moneyConverter from '../../../utils/moneyConverter';
import { SalaryDetailForm } from '../ColumnConfig';
import ModalSalaryList from '../Modal';
import statisticCardConfig from '../Modal/StatisticColumnConfic';

const { Title } = Typography;

const initData = {
	id: 0,
	employeeName: '',
	employeeId: '',
	month: 0,
	year: 0,
	bonus: 0,
	penalty: 0,
	total: 0,
	net: 0,
	description: '',
	ruleSalaryObtain: [],
};
const SalaryListDetail = () => {
	const [openModal, setOpenModal] = useState(false);
	// const [loading, setLoading] = useState(false);
	const params = useParams();
	const { loading, setLoading } = useContext(LoadingContext);
	const [data, setData] = useState(initData);
	const startDate = dayjs(new Date());
	const onOpenModal = () => {
		setOpenModal(true);
	};
	const [token, setToken] = usePersistedState('token');
	useEffect(() => {
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
			setData({
				...res,
				receiveDate: dayjs()
					.month(res.month - 1)
					.year(res.year),
			});
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
											<Form.Item label={item.title}>
												{!item.type && (
													<Input readOnly value={data[item.dataIndex]} />
												)}
												{/* {item.type === 'number' && (
													<Input
														readOnly
														suffix='VNĐ'
														value={moneyConverter(data[item.dataIndex])}
													/>
												)} */}
												{item.type === 'date' && (
													<DatePicker
														format='MM/YYYY'
														picker='month'
														disabled
														value={data[item.dataIndex]}
													/>
												)}
											</Form.Item>
										</Col>
									</Row>
								</Col>
							);
						})}
						<Col span={24}>
							<Row gutter={16}>
								{statisticCardConfig.map((item) => (
									<Col
										key={'statistic-column-config-' + item.dataIndex}
										span={item.col}
									>
										<CustomCard width='100%'>
											<Statistic
												title={item.title}
												valueStyle={{
													color: themeConfig.token.colorPrimary,
												}}
												formatter={AnimatedCountUp}
												value={data[item.dataIndex]}
												suffix={'VNĐ'}
											/>
										</CustomCard>
									</Col>
								))}
								{data.ruleSalaryObtain.map((item) => (
									<Col span={12} key={'salary-rule-detail' + item.description}>
										<CustomCard width='100%'>
											<Statistic
												title={item.description}
												valueStyle={{
													color: themeConfig.token.colorPrimary,
												}}
												value={item.count}
											/>
										</CustomCard>
									</Col>
								))}
							</Row>
						</Col>
					</Row>
				</Form>
				<ModalSalaryList open={openModal} setOpen={setOpenModal} data={data} />
			</CustomCard>
		</Loading>
	);
};

export default SalaryListDetail;
