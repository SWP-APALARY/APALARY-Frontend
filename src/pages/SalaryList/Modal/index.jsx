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
	return (
		<Modal
			okButtonProps={{ style: { display: 'none' } }}
			open={open}
			onCancel={() => setOpen(false)}
			width={600}
			title={data.description}
		>
			<Row gutter={16}>
				<Col span={24}>
					<CustomCard width='100%'>
						<Statistic
							title={'Money per hit'}
							valueStyle={{
								color: themeConfig.token.colorPrimary,
							}}
							formatter={AnimatedCountUp}
							value={data.money / data.count}
							suffix={'VNĐ'}
						/>
					</CustomCard>
				</Col>
				<Col span={12}>
					<CustomCard width='100%'>
						<Statistic
							title={'Rule hit'}
							valueStyle={{
								color: themeConfig.token.colorPrimary,
							}}
							formatter={AnimatedCountUp}
							value={data.count}
							suffix={'Times'}
						/>
					</CustomCard>
				</Col>
				<Col span={12}>
					<CustomCard width='100%'>
						<Statistic
							title={'Money hit'}
							valueStyle={{
								color: themeConfig.token.colorPrimary,
							}}
							formatter={AnimatedCountUp}
							value={data.money}
							suffix={'VNĐ'}
						/>
					</CustomCard>
				</Col>
			</Row>
		</Modal>
	);
};

export default ModalSalaryList;
