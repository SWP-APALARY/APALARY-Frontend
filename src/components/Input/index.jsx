import React from 'react';

import { Input, InputNumber, Select } from 'antd';

const { TextArea } = Input;
const CustomInput = (props) => {
	1;
	const { key, type, option, ...rest } = props;

	return (
		<>
			{type === 'text' && <Input {...rest} />}
			{type === 'number' && <InputNumber style={{ width: '100%' }} {...rest} />}
			{type === 'textarea' && <TextArea {...rest} />}
			{type === 'select' && (
				<Select
					{...rest}
					showSearch
					filterOption={(input, option) =>
						(option?.children.toLowerCase() ?? '').includes(input)
					}
				>
					{option?.map((item, index) => (
						<Select.Option key={`${item.id} - ${key}`} value={item.id}>
							{item.type}
						</Select.Option>
					))}
				</Select>
			)}
		</>
	);
};

export default CustomInput;
