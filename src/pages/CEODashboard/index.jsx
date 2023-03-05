import React from 'react';

import { Col, Row } from 'antd';

import { DashboardComponent } from './styles';

export default function CEODashboard() {
	return (
		<DashboardComponent>
			<Row gutter={[16, 16]}>
				<Col className='col-left'>
					<p className='title'>APPLICATIONS</p>
				</Col>
				<Col className='col-right'></Col>
			</Row>
		</DashboardComponent>
	);
}
