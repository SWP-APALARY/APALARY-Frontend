import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Input, Modal, Row, Skeleton, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import CustomCard from '../../../components/Card';
import PDFReader from '../../../components/PDFReder';
import applicantAPI from '../../../utils/Apis/applicantAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import { applicantFormConfig, gender } from './config';

const { Title } = Typography;
const ApplicantDetails = () => {
	const params = useParams();
	const [token] = usePersistedState('token');
	const navigate = useNavigate();
	const [applicant, setApplicant] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicantAPI, 'getOne', '', setLoading, params.id, token);
			setApplicant(res);
		};

		fetch();
	}, []);
	const onAccept = async () => {
		let statusSend;
		applicant.status === 'PROCESSING' ? (statusSend = 'approve') : (statusSend = 'accept');
		await apiHandler(applicantAPI, statusSend, 'Success', setLoading, params.id, true, token);
		navigate('/applicants');
	};
	const onReject = async () => {
		await apiHandler(applicantAPI, 'accept', 'Success', setLoading, params.id, false, token);
		navigate('/applicants');
	};
	return (
		<CustomCard>
			<Title>Applicant Information</Title>
			{loading ? (
				<Skeleton />
			) : (
				<Form layout='vertical'>
					{applicantFormConfig.map((item) => {
						return (
							<Form.Item
								key={item.label + 'applicant-information'}
								label={item.label}
							>
								{item.key == 'gender' ? (
									<Input
										style={{ width: '100%' }}
										value={gender[applicant[item.key]]}
										readOnly
									/>
								) : (
									<Input style={{ width: '100%' }} value={applicant[item.key]} />
								)}
							</Form.Item>
						);
					})}
					<PDFReader
						file={applicant.cv}
						id={applicant.id}
						onAccept={onAccept}
						onReject={onReject}
						isWaiting={
							applicant.status === 'PROCESSING' || applicant.status === 'PROCESSING_2'
						}
					/>
				</Form>
			)}
		</CustomCard>
	);
};

export default ApplicantDetails;
