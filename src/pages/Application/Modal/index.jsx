import React, { useEffect, useState } from 'react';

import { Button, Col, Modal, Row, Skeleton, Typography } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import Box from '../../../components/Box';
import { roles } from '../../../components/Layout/ManagerItems';
import toast from '../../../components/Toast';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import { convertToEditor } from '../../../utils/DraftjsHelper';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';

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
	const [role, setRole] = usePersistedState('role');
	const [approveLoading, setApproveLoading] = useState(false);
	const [rejectLoading, setRejectLoading] = useState(false);
	const [data, setData] = useState({
		description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
		status: null,
	});
	const [loading, setLoading] = useState(false);
	const handleOk = async () => {
		setApproveLoading(true);
		await apiHandler(
			applicationAPI,
			'approveOne',
			'Approve successfully',
			setApproveLoading,
			id,
			token
		).finally(() => {
			setOpen(false);
		});
	};
	const handleReject = async () => {
		setRejectLoading(true);
		await apiHandler(
			applicationAPI,
			'disapproveOne',
			'Reject successfully',
			setRejectLoading,
			id,
			token
		).finally(() => {
			setOpen(false);
		});
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
					{data.status === 'PROCESSING' && (
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
					)}
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
