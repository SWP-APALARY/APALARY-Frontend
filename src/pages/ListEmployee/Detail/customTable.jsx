import { Table, Row, Col, Button, Tabs, Space } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import { routeKey } from '../../../components/Layout/ManagerItems';
import SearchBar from '../../../components/SearchBar';
import { tabStatusConfig } from '../../../config/TabsConfig';

import { PlusOutlined } from '@ant-design/icons';

export const CustomTable = ({
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
			<Row justify={'space-between'} gutter={20}>
				<Col>
					<Row justify={'center'} align='middle'>
						<Col>
							{onTabChange && (
								<Tabs
									defaultActiveKey='PROCESSING'
									activeKey={activeKey}
									onChange={onTabChange}
									items={tabStatusConfig.map((item) => item)}
								/>
							)}
						</Col>
						<Col>
							{addNewButton && (
								<Button
									icon={<PlusOutlined />}
									type='primary'
									onClick={addNewButton}
								>
									Add new
								</Button>
							)}
						</Col>
					</Row>
				</Col>
				<Col>
					{onSearch && (
						<SearchBar placeholder='Search by name' enterButton onSearch={onSearch} />
					)}
				</Col>
			</Row>
			<Row>
				<Table columns={columns} {...rest}>
					{children}
				</Table>
			</Row>
		</Box>
	);
};

export default CustomTable;
