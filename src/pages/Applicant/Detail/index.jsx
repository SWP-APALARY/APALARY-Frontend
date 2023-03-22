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
const { TextArea } = Input;
const ApplicantDetails = () => {
	const params = useParams();
	const [token] = usePersistedState('token');
	const navigate = useNavigate();
	const [applicant, setApplicant] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const [confirmReject, setConfirmReject] = React.useState(null);
	const [reason, setReason] = React.useState();
	const statusSend = applicant.status === 'PROCESSING' ? 'approve' : 'accept';
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicantAPI, 'getOne', '', setLoading, params.id, token);
			setApplicant(res);
		};

		fetch();
	}, []);
	const onAccept = async () => {
		await apiHandler(applicantAPI, statusSend, 'Success', setLoading, params.id, true, token);
		navigate('/applicants');
	};
	const onReject = async () => {
		console.log(reason);
		setConfirmReject(null);
		// await apiHandler(applicantAPI, statusSend, 'Success', setLoading, params.id, false, token);
		// navigate('/applicants');
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
						onReject={() => setConfirmReject(applicant.id)}
						isWaiting={
							applicant.status === 'PROCESSING' || applicant.status === 'PROCESSING_2'
						}
					/>
				</Form>
			)}
			<Modal
				open={confirmReject !== null}
				onOk={onReject}
				onCancel={() => setConfirmReject(null)}
				title='Reason to reject this applicant'
				centered
			>
				<TextArea
					rows={4}
					placeholder='Reason ...'
					maxLength={6}
					value={reason}
					onChange={(e) => setReason(e.target.value)}
				/>
			</Modal>
		</CustomCard>
	);
};

export default ApplicantDetails;
