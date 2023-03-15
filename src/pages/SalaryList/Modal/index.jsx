import React from 'react';

import { Col, Modal, Row, Statistic, Typography } from 'antd';

import AnimatedCountUp from '../../../components/AnimatedCountup';
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
		>
			<Row gutter={16}>
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
			</Row>
			<Row gutter={16}>
				{ruleOption.map((item) => (
					<Col span={10} key={'salary-rule-detail' + item.description}>
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
		</Modal>
	);
};

export default ModalSalaryList;
