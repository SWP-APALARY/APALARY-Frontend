import React, { useEffect, useState } from 'react';

import { Button, Col, Form, Input, Modal, Row, Skeleton, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import CustomCard from '../../../components/Card';
import PDFReader from '../../../components/PDFReder';
import contractsAPI from '../../../utils/Apis/contractsAPI';
import apiHandler from '../../../utils/Apis/handler';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import { contractsFormConfig } from './config';

const { Title } = Typography;
const ContractDetails = () => {
	const params = useParams();
	const [token] = usePersistedState('token');
	const navigate = useNavigate();
	const [contract, setContract] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(contractsAPI, 'getOne', '', setLoading, params.id, token);

			setContract(res);
		};

		fetch();
	}, []);
	return (
		<CustomCard>
			<Title>Contract Information</Title>
			{loading ? (
				<Skeleton />
			) : (
				<Form layout='vertical'>
					{contractsFormConfig.map((item) => {
						return (
							<Form.Item key={item.label + 'contract-information'} label={item.label}>
								<Input
									style={{ width: '100%' }}
									value={contract[item.key]}
									readOnly
								/>
							</Form.Item>
						);
					})}

					<PDFReader file={contract.contractImage} id={contract.id} />
				</Form>
			)}
		</CustomCard>
	);
};

export default ContractDetails;
