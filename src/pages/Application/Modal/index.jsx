import React, { useEffect, useState } from 'react';

import { Button, Col, Modal, Row, Typography } from 'antd';

import Box from '../../../components/Box';
import toast from '../../../components/Toast';
import applicationAPI from '../../../utils/Apis/applicationAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';

const { Title, Text } = Typography;

const ApplicationModal = (props) => {
	const { id, open, setOpen } = props;
	const [token, setToken] = usePersistedState('token');
	const [approveLoading, setApproveLoading] = useState(false);
	const [rejectLoading, setRejectLoading] = useState(false);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const handleOk = () => {
		// TODO: call approve here
		setApproveLoading(true);
		setTimeout(() => {
			setOpen(false);
			setApproveLoading(false);
			toast('Approve successfully', 'success');
		}, 2000);
	};
	const handleReject = () => {
		// TODO: call reject here
		setRejectLoading(true);
		setTimeout(() => {
			setOpen(false);
			setRejectLoading(false);
			toast('Reject successfully', 'success');
		}, 2000);
	};

	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(applicationAPI, 'getOne', '', setLoading, id, token);
			setData(res);
		};
		fetch();
	}, []);
	// TODO: Change data when api done
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
					{/* {application.status === 'pending' && (  TODO: using this when have api ) */}
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
					{/* )} */}
				</Row>
			}
		>
			<Box direction='vertical'>
				<Title>Application infomation</Title>
				<Text>
					Created by:{' '}
					<Text type='span' strong>
						{data.name}
					</Text>
				</Text>
				<Text>Date: 22/12/2022</Text>
				<Text>
					Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac
					cursus massa. Sed tincidunt pulvinar justo, et congue augue ornare eget. In
					eleifend nisl non orci euismod vehicula. Fusce pellentesque accumsan massa, at
					rutrum enim viverra vel. Praesent sagittis, justo sed congue convallis, justo
					elit tristique tellus, nec congue nibh dolor sit amet nisi. Morbi convallis
					rhoncus pellentesque. Morbi sagittis porttitor facilisis. Maecenas mi velit,
					imperdiet vel efficitur in, iaculis sed dolor. Sed dui turpis, placerat eget
					erat eget, dapibus venenatis mi. Phasellus non elit non enim mollis dapibus quis
					in massa. Aenean malesuada, dolor sit amet condimentum congue, magna nisi ornare
					quam, ut cursus massa sem ut diam. Maecenas quis arcu est. Mauris mi dolor,
					molestie et justo in, cursus commodo neque. Sed sollicitudin, augue sed cursus
					ultrices, quam lorem laoreet arcu, non lacinia lectus ipsum sit amet quam.
					Praesent elit est, efficitur vel posuere nec, volutpat sed ex. Morbi
					pellentesque, augue et pharetra efficitur, sapien ipsum suscipit metus, nec
					ultricies metus arcu id magna. In at purus laoreet massa lacinia viverra sit
					amet tempus tellus. Fusce sit amet euismod dolor, vitae congue diam. Duis
					convallis dictum accumsan. Donec sed lacus non nisi suscipit volutpat eget eu
					tortor. Maecenas accumsan, nulla eu interdum sagittis, risus diam commodo arcu,
					at molestie tellus neque id urna. In urna turpis, eleifend lacinia ex nec,
					tincidunt facilisis elit. Cras feugiat elit eu rutrum efficitur. Fusce ultricies
					dolor non ante vestibulum, in pulvinar quam vehicula. Aliquam tempus sit amet
					justo at elementum. Aliquam erat volutpat. Etiam hendrerit eros ex, ac pretium
					metus dapibus sed. Mauris ante leo, commodo non ipsum sed, rhoncus vestibulum
					nisl. Integer ac consectetur justo, vel aliquet nisl. Proin quam justo,
					tincidunt vel ullamcorper dictum, venenatis quis enim. Suspendisse rhoncus lacus
					non eleifend tempus. Praesent quis dui elit. Morbi at faucibus dui. Pellentesque
					fringilla, purus consectetur sodales condimentum, risus velit cursus nisl, eu
					lacinia ex purus vehicula risus. Suspendisse euismod odio urna, et ultricies
					ante rhoncus vitae. Nunc tincidunt risus ac leo mollis hendrerit. Etiam eget
					nisi sed magna congue gravida. Fusce semper cursus posuere. Maecenas id nunc
					mollis, suscipit leo sit amet, cursus erat.
				</Text>
			</Box>
		</Modal>
	);
};

export default ApplicationModal;
