import React from 'react';

import { Button, Col } from 'antd';

import { roles } from '../../../../components/Layout/ManagerItems';
import usePersistedState from '../../../../utils/LocalStorage/usePersistedState';

const AuthButton = ({ status, rejectLoading, approveLoading, handleReject, handleOk }) => {
	const [role] = usePersistedState('role');
	const condition =
		(status === 'PROCESSING' && role === roles.HR_MANAGER) ||
		(status === 'PROCESSING_2' && role === roles.CEO);

	return (
		condition && (
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
