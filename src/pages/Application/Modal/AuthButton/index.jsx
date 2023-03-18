import React from 'react';

import { Button, Col } from 'antd';

import { roles } from '../../../../components/Layout/ManagerItems';
import usePersistedState from '../../../../utils/LocalStorage/usePersistedState';

const AuthButton = ({ status, rejectLoading, approveLoading, handleReject, handleOk }) => {
	const [role] = usePersistedState('role');
	const condition = status === 'PROCESSING' || (status === 'PROCESSING_2' && role === roles.CEO);
	// TODO: may be change to HR_Manager if requirements change
	const acceptedRole = role === roles.CEO || role === roles.HR_EMPLOYEE;
	return (
		condition &&
		acceptedRole && (
			<Col>
				<Button
					loading={rejectLoading}
					disabled={approveLoading}
					onClick={handleReject}
					danger
					type='primary'
				>
					Reject
				</Button>
				<Button
					loading={approveLoading}
					disabled={rejectLoading}
					type='primary'
					onClick={handleOk}
				>
					Approve
				</Button>
			</Col>
		)
	);
};

export default AuthButton;
