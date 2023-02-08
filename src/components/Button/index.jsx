import React from 'react';

import { Button } from 'antd';

export const StyledButton = (props) => {
	const { children, ...rest } = props;
	return <Button {...rest}>{children}</Button>;
};

export default StyledButton;
