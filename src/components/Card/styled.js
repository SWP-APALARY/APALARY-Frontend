import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	border: 0;
	margin-bottom: 20px;
	width: ${(props) => props.width || 'fit-content'};
	transition: all 0.3s ease-in-out;
	:hover {
		cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
	}
`;
