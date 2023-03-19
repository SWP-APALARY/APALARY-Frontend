import { useEffect, useState } from 'react';

import { Button, Col, Modal, Row, Skeleton, Typography } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import Box from '../../../components/Box';
import { tabConfigWithAPIStatus } from '../../../config/TabsConfig';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import { convertToEditor } from '../../../utils/DraftjsHelper';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import AuthButton from './AuthButton';

const { Title, Text } = Typography;
const initData = {
	employeeName: null,
	employeeId: '',
	department: '',
	role: '',
	createdDate: '',
	updatedDate: '',
	status: null,
	description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
};

const ApplicationModal = (props) => {
	const { id, open, setOpen, activeKey } = props;
	const [token, setToken] = usePersistedState('token');
	const [approveLoading, setApproveLoading] = useState(false);
	const [rejectLoading, setRejectLoading] = useState(false);
	const [data, setData] = useState({
		description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
		status: null,
	});
	const [loading, setLoading] = useState(false);
	const handleAction = async (actionR1, actionR2, setLoading) => {
		if (activeKey === tabConfigWithAPIStatus[0].key) {
			return await apiHandler(
				applicationAPI,
				actionR1,
				'Success',
				setLoading,
				id,
				token
			).finally(() => setOpen(false));
		}
		return await apiHandler(applicationAPI, actionR2, 'Success', setLoading, id, token).finally(
			() => setOpen(false)
		);
	};
	const handleOk = async () => {
		return await handleAction('approveOne', 'approveSalaryR2', setApproveLoading);
	};
	const handleReject = async () => {
		return await handleAction('disapproveOne', 'disapproveSalaryR2', setRejectLoading);
	};

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicationAPI, 'getOne', '', setLoading, id, token);
			setData(res || initData);
		};
		fetch();
	}, [open]);
	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			width='768px'
			footer={
				<Row justify={'space-between'}>
					<Col>
						<Button onClick={() => setOpen(false)}>Cancel</Button>
					</Col>
					<AuthButton
						status={data.status}
						rejectLoading={rejectLoading}
						approveLoading={approveLoading}
						handleReject={handleReject}
						handleOk={handleOk}
					/>
				</Row>
			}
		>
			<Skeleton loading={loading}>
				<Box direction='vertical'>
					<Title>{data.title}</Title>
					<Text>
						Created by:{' '}
						<Text type='span' strong>
							{data.employeeName}
						</Text>
					</Text>
					<Text>Date: {new Date(data.createdTime).toLocaleString()}</Text>
					<Editor
						readOnly
						toolbarHidden
						editorState={convertToEditor(JSON.parse(data?.description))}
					/>
				</Box>
			</Skeleton>
		</Modal>
	);
};

export default ApplicationModal;
