import { useState, useEffect } from 'react';

import { Button, Card, Rate, Space, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import feedbackApi from '../../utils/Apis/feedbackAPI';
import apiHandler from '../../utils/Apis/handler';
import FeedBacks from './data';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Review = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);
	const [month, setMonth] = useState();
	const [text, setText] = useState([
		{
			id: 0,
			title: '',
			description: '',
			star: '',
			createdDate: '',
		},
	]);

	const prevPerson = () => {
		setIndex((index) => {
			let newIndex = index - 1;
			return checkNumber(newIndex);
		});
	};
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(feedbackApi, 'get', '', setLoading, month.month(), null);
			setText(res || []);
		};
		fetch();
	});
	const checkNumber = (number) => {
		if (number > text.length - 1) {
			return 0;
		}
		if (number < 0) {
			return text.length - 1;
		}
		return number;
	};
	const nextPerson = () => {
		setIndex((index) => {
			let newIndex = index + 1;
			return checkNumber(newIndex);
		});
	};
	// useEffect(() => {
	// 	feedbackApi
	// 		.get(month)
	// 		.then((res) => setText(res.data))
	// 		.catch(() => navigate('/'));
	// }, []);
	return (
		<Row justify={'center'}>
			<Card size='large' title='FeedBack' extra={text[index].createdDate}>
				<p>{text[index].title}</p>
				<p>{text[index].description}</p>
				<p>
					<Rate disabled value={text[index].star} />
				</p>
				<Space>
					<Button type='primary' onClick={prevPerson}>
						<ArrowLeftOutlined />
					</Button>

					<Button type='primary' onClick={nextPerson}>
						<ArrowRightOutlined />
					</Button>
				</Space>
			</Card>
		</Row>
	);
};

export default Review;
