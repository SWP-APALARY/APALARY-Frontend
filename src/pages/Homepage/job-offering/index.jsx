import { useEffect, useState } from 'react';

import { Button, Modal, Typography } from 'antd';
import { Editor, EditorState } from 'draft-js';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '../../../components/Box';
import CustomCard from '../../../components/Card';
import jobOfferingApi from '../../../utils/Apis/jobOffering';
import { convertToEditor } from '../../../utils/DraftjsHelper';
import ApplyJob from '../../ApplyJob/index';

const { Title, Text } = Typography;
const JobOfferingDetail = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const id = params.id;
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const [openModel, setOpenModal] = useState(false);
	const showModal = () => {
		setOpenModal(true);
	};
	const handleOk = () => {
		setOpenModal(false);
	};
	const handleCancel = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		const fetch = async () => {
			const response = await jobOfferingApi
				.getOne(id)
				.then((res) => res.data)
				.catch(() => navigate(-1));

			setData(response);
			setEditorState(convertToEditor(JSON.parse(response.description)));
		};
		fetch();
	}, []);

	return (
		<Box
			style={{
				justifyContent: 'center',
				width: '100%',
				padding: '2rem',
			}}
		>
			<CustomCard bordered>
				<Button onClick={() => navigate(-1)} style={{ position: 'absolute' }}>
					Home
				</Button>
				{data && (
					<Box direction='vertical' style={{ minWidth: '50rem' }}>
						<Box direction='vertical' align='center' style={{ width: '100%' }}>
							<Title>{data.title}</Title>
						</Box>
						<Box direction='vertical'>
							<Text level={5} type='danger'>
								<b>Upto:</b> {data.baseSalary} VNĐ
							</Text>
							<Text level={5} type='success'>
								<b>Max Employees:</b> {data.maxEmployee}
							</Text>
							<Text level={5}>
								<b>Department:</b> {data.departmentName}
							</Text>
							<Editor readOnly editorState={editorState}></Editor>
						</Box>
						<Box direction='vertical' align='center' style={{ width: '100%' }}>
							<Button type='primary' onClick={() => showModal()}>
								Apply
							</Button>
						</Box>
					</Box>
				)}
			</CustomCard>
			<Modal open={openModel} onOk={handleOk} onCancel={handleCancel} centered footer={null}>
				<ApplyJob onOk={handleOk} id={id} />
			</Modal>
		</Box>
	);
};

export default JobOfferingDetail;
