import React from 'react';

import { Input, InputNumber, Select } from 'antd';

const { TextArea } = Input;
const CustomInput = (props) => {
	const { key, type, option, ...rest } = props;

	return (
		<>
			{type === 'text' && <Input {...rest} />}
			{type === 'number' && <InputNumber style={{ width: '100%' }} {...rest} />}
			{type === 'textarea' && <TextArea {...rest} />}
			{type === 'select' && (
				<Select {...rest}>
					{option?.map((item) => (
						<Select.Option key={item.id + key} value={item.id}>
							{item.type}
						</Select.Option>
					))}
				</Select>
			)}
		</>
	);
};

export default CustomInput;
