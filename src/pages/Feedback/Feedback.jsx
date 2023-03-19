import { useState } from 'react';

import { Button, Card, Rate, Space, Row, Col, Typography } from 'antd';

import Box from '../../components/Box';
import CustomCard from '../../components/Card';
import FeedBacks from './data';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Text } = Typography;
const Review = () => {
	const [index, setIndex] = useState(1);
	const { title, description, star } = FeedBacks[index];
	const [readMore, setReadMore] = useState(false);
	const checkNumber = (number) => {
		if (number > FeedBacks.length - 1) {
			return 0;
		}
		if (number < 0) {
			return FeedBacks.length - 1;
		}
		return number;
	};
	const nextPerson = () => {
		setIndex((index) => {
			let newIndex = index + 1;
			return checkNumber(newIndex);
		});
	};
	const prevPerson = () => {
		setIndex((index) => {
			let newIndex = index - 1;
			return checkNumber(newIndex);
		});
	};

	return (
		<Row justify={'center'}>
			<CustomCard width={'450px'} title='FeedBack'>
				<p>{title}</p>
				<p>{readMore ? description : `${description.substring(0, 50)}...`}</p>
				<Box>
					<Button onClick={() => setReadMore(!readMore)}>
						{readMore ? 'Show Less' : '  Read More'}
					</Button>
				</Box>
				<Row justify='center' align='middle'>
					<Col>
						<Rate disabled defaultValue={star} />
					</Col>
					<Col span={24}>
						<Row justify={'space-between'}>
							<Col>
								<Button type='primary' onClick={prevPerson}>
									<ArrowLeftOutlined />
									Previous
								</Button>
							</Col>
							<Col>
								<Button type='primary' onClick={nextPerson}>
									Next
									<ArrowRightOutlined />
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</CustomCard>
		</Row>
	);
};

export default Review;
