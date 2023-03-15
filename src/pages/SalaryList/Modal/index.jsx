import React from 'react';

import { Modal, Typography } from 'antd';

const { Title } = Typography;

const ModalSalaryList = (props) => {
	const { open, setOpen, onOk, onClose, ruleOption } = props;
	const bonus = ruleOption.filter((item) => item.type === 'BONUS');
	return (
		<Modal open={open} onCancel={() => setOpen(false)}>
			<Title>Bonus Detail</Title>
		</Modal>
	);
};

export default ModalSalaryList;
