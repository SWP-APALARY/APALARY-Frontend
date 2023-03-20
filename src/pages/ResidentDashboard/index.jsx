import { useEffect, useState } from 'react';

import { Layout, Card, Image, Row, Col, Rate, Form } from 'antd';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { VscFeedback } from 'react-icons/vsc';
import { NavLink, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '../../components/Box/index.jsx';
import apiHandler from '../../utils/Apis/handler';
import residentAPI from '../../utils/Apis/residentAPI/index.js';

// import ProData from '../Profile/data.js';
import { FileTextFilled, IdcardFilled, ProfileFilled, MailFilled } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import { Column } from '@ant-design/plots';

const { Header, Content, Footer } = Layout;

const EmDashboard = () => {
	const [loading, setLoading] = useState(false);

	const [resident, setResident] = useState({
		phone: '',
		name: '',
		identifyNumber: '',
		username: '',
		password: '',
		dateOfBirth: '',
		gender: '',
		email: '',
	});

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(residentAPI, 'get', '', setLoading, null);
			setResident(res || []);
		};
		fetch();
	}, []);
	const [currentDateTime, setCurrentDateTime] = useState('');

	useEffect(() => {
		setInterval(() => {
			const date = new Date();
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			const formattedDate = date.toLocaleDateString('en-US', options);
			const time = date.toLocaleTimeString();
			setCurrentDateTime(`${formattedDate} ${time}`);
		}, 1000);
	}, []);

	const dashboardStyle = {
		backgroundColor: '#f5f5f5',
		padding: '20px',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	};

	const greetingStyle = {
		fontSize: '32px',
		fontWeight: 'bold',
		margin: '0',
		marginBottom: '10px',
	};

	const usernameStyle = {
		color: '#FF6F61',
	};

	const dateTimeStyle = {
		fontSize: '24px',
		fontWeight: 'bold',
		margin: '0',
		marginBottom: '20px',
	};

	const iconStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none',
		color: '#666666',
		margin: '10px',
		cursor: 'pointer',
		transition: 'all 0.3s ease-in-out',
	};

	const iconLabelStyle = {
		fontSize: '16px',
		fontWeight: 'bold',
		margin: '5px',
	};

	const iconHoverStyle = {
		transform: 'scale(1.1)',
		color: '#FF6F61',
	};
	return (
		<Box direction='vertical'>
			<Image
				width={1000}
				height={450}
				src='https://www.umassalumni.com/s/1640/images/gid2/editor/alumni_association/campus_partners/architecture/dbexterior.jpg'
			/>
			<div style={dashboardStyle}>
				<h1 style={greetingStyle}>
					Hello <span style={usernameStyle}>{resident.name}</span>, welcome back!
				</h1>
				<p style={dateTimeStyle}> {currentDateTime}</p>
			</div>
		</Box>
	);
};
export default EmDashboard;
