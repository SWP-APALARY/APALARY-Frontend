import React, { useEffect, useState } from 'react';

import { Card, Col, List, Rate, Row } from 'antd';

export default function ListFeedback({ data }) {
	const [list, setList] = useState();

	useEffect(() => {
		setList(data);
	}, [data]);

	return (
		<Card>
			<List
				itemLayout='vertical'
				size='large'
				pagination={{
					pageSize: 3,
				}}
				dataSource={list}
				footer={false}
				renderItem={(item) => (
					<List.Item key={item.title}>
						<List.Item.Meta
							title={
								<Row>
									<Col span={12}>
										{/* <Rate
											disabled
											allowHalf
											defaultValue={item.star}
											style={{ fontSize: '15px' }}
										/> */}
									</Col>
									<Col span={12} style={{ textAlign: 'end' }}>
										{item.createdDate}
									</Col>
								</Row>
							}
							style={{ margin: 0 }}
						/>
						<div>
							<b>{item.title}</b>
							<p style={{ margin: 0 }}>{item.description}</p>
						</div>
					</List.Item>
				)}
			/>
		</Card>
	);
}
