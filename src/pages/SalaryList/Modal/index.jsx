import React from 'react';

import { Col, Modal, Row, Statistic, Typography } from 'antd';

import AnimatedCountUp from '../../../components/AnimatedCountup';
import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import themeConfig from '../../../utils/Theme';
import statisticCardConfig from './StatisticColumnConfic';

const { Title } = Typography;

const ModalSalaryList = (props) => {
	const { open, setOpen, onOk, onClose, data } = props;
	const ruleOption = data.ruleSalaryObtain;
	return (
		<Modal
			okButtonProps={{ style: { display: 'none' } }}
			open={open}
			onCancel={() => setOpen(false)}
			width={600}
			title={'All rule hit in last month'}
		>
			{/* <Row gutter={16}>
				{statisticCardConfig.map((item) => (
					<Col key={'statistic-column-config-' + item.dataIndex} span={item.col}>
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
			</Row> */}
			<Row gutter={16}>
				{ruleOption.length ? (
					ruleOption.map((item) => (
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
					))
				) : (
					<Col span={18}>
						{/* <CustomCard> */}
						{/* <Statistic
								title='No rule has been hit'
								valueStyle={{
									color: themeConfig.token.colorPrimary,
								}}
								value='You have no rule to be hit in last month'
							/> */}
						<Box>
							<Title style={{ color: themeConfig.token.colorPrimary }} level={4}>
								No rule has been hit
							</Title>
						</Box>
						{/* </CustomCard> */}
					</Col>
				)}
			</Row>
		</Modal>
	);
};

export default ModalSalaryList;
