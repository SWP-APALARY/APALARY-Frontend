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
	const date = new Date();
	const [month, setMoth] = useState(date.getMonth());
	const [index, setIndex] = useState(0);
	console.log(month);
	const [text, setText] = useState([
		{
			id: 0,
			title: '',
			description: '',
			star: '',
			createdDate: '',
		},
	]);

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(feedbackApi, 'get', '', setLoading, month, null);
			setText(res || []);
		};

		fetch();
	}, [month]);
	const prevMonth = () => {
		const previousMonth = month === 0 ? 11 : month - 1;
		setMoth(previousMonth);
	};
	const nextMonth = () => {
		const nextMonth = month === 0 ? 11 : month + 1;
		setMoth(nextMonth);
	};
	const checkNumber = (number) => {
		if (number > text.length - 1) {
			return 0;
		}
		if (number < 0) {
			return text.length - 1;
		}
		return number;
	};
	const prevPerson = () => {
		setIndex((index) => {
			let newIndex = index - 1;
			return checkNumber(newIndex);
		});
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
			<Card size='large' title='FeedBack'>
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
				<Space>
					<Button type='primary' onClick={prevMonth}>
						past
					</Button>

					<Button type='primary' onClick={nextMonth}>
						next
					</Button>
				</Space>
			</Card>
		</Row>
	);
};

export default Review;
