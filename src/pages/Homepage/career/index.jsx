import { useEffect } from 'react';
import { useState } from 'react';

import { Col, Row, Space, Table, Modal } from 'antd';

import careerImg from '../../../assets/homepage/hiring.png';
import jobOfferingApi from '../../../utils/Apis/jobOffering';
import { getValueFromBlock } from '../../../utils/DraftjsHelper';
import moneyConverter from '../../../utils/moneyConverter';
import ApplyJob from '../../ApplyJob/index';
import { buttonStyle, componentStyle, imgStyle, titleStyle } from './styles';

const { Column } = Table;

export default function Career() {
	const [list, setList] = useState([]);

	useEffect(() => {
		jobOfferingApi.getJobOffering().then((jobOffering) => {
			const realData = jobOffering.data.map((todo, index) => ({
				...todo,
				key: index,
				baseSalary: todo.baseSalary,
				description: getValueFromBlock(JSON.parse(todo.description)),
			}));
			setList(realData);
		});
	}, []);

	const [idModal, setIdModal] = useState(null);
	const showModal = (id) => {
		setIdModal(id);
	};
	const handleOk = () => {
		setIdModal(null);
	};
	const handleCancel = () => {
		setIdModal(null);
	};

	return (
		<Row style={componentStyle} justify='space-between'>
			<Col span={8}>
				<img src={careerImg} alt='career list' style={imgStyle} />
			</Col>
			<Col span={15}>
				<h3 style={titleStyle}>Career</h3>
				<Table dataSource={list} pagination={{ pageSize: 7 }}>
					<Column title='Title' dataIndex='title' key='title' width={150} />
					<Column
						title='Description'
						dataIndex='description'
						key='description'
						ellipsis={true}
						// width={400}
					/>
					<Column title='Quantity' dataIndex='maxEmployee' key='maxEmployee' width={90} />
					<Column
						title='Base Salary'
						dataIndex='baseSalary'
						key='baseSalary'
						width={150}
						style={{ textAlign: 'center' }}
						render={(text) => (
							<span style={{ color: 'green' }}>{moneyConverter(text)} VNĐ</span>
						)}
					/>
					<Column
						title='Action'
						key='action'
						render={({ id }) => (
							<Space size='middle'>
								<a style={buttonStyle} href={`/job-offering/detail/${id}`}>
									Detail
								</a>
								<a style={buttonStyle} onClick={() => showModal(id)}>
									Apply
								</a>
							</Space>
						)}
						width={115}
					/>
				</Table>
			</Col>
			<Modal open={idModal} onOk={handleOk} onCancel={handleCancel} centered footer={null}>
				<ApplyJob onOk={handleOk} id={idModal} />
			</Modal>
		</Row>
	);
}
