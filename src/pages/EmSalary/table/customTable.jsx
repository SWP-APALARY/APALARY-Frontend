import { Table, Row, Col, Button, Tabs, Space } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import { routeKey } from '../../../components/Layout/ManagerItems';
import SearchBar from '../../../components/SearchBar';
import { tabStatusConfig } from '../../../config/TabsConfig';

import { PlusOutlined } from '@ant-design/icons';

export const CustomSTable = ({
	addNewButton,
	columns,
	onSearch,
	activeKey,
	onTabChange,
	children,
	...rest
}) => {
	return (
		<Box direction='vertical' width='100%'>
			<Row>
				<Table columns={columns} {...rest}>
					{children}
				</Table>
			</Row>
		</Box>
	);
};

export default CustomSTable;
