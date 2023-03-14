import React from 'react';

import { Modal } from 'antd';

const ModalSalaryList = (props) => {
	const { open, setOpen, onOk, onClose } = props;
	return (
		<Modal open={open} onCancel={() => setOpen(false)}>
			Hello
		</Modal>
	);
};

export default ModalSalaryList;
