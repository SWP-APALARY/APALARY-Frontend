import { Table, Row, Col, Button, Tabs, Space, Switch } from 'antd';
import { Link } from 'react-router-dom';

import Box from '../../../components/Box';
import { routeKey } from '../../../components/Layout/ManagerItems';
import SearchBar from '../../../components/SearchBar';
import { tabContractStatusConfig } from '../../../config/TabsConfig';

import { PlusOutlined } from '@ant-design/icons';

export const CustomCTable = ({
	addNewButton,
	columns,
	onSearch,
	activeKey,
	onTabChange,
	onStatusChange,
	children,
	...rest
}) => {
	return (
		<Box direction='vertical' width='100%'>
			<Row justify={'space-between'} gutter={20}>
				<Col>
					<Row justify={'center'} align='middle'>
						<Col>
							{onStatusChange && (
								<Space direction='vertical' style={{ marginRight: '1rem' }}>
									<Switch
										checkedChildren='ACTIVE'
										unCheckedChildren='INACTIVE'
										defaultChecked
										onChange={onStatusChange}
									/>
								</Space>
							)}
						</Col>
						<Col style={{ marginRight: 20, marginBottom: 14 }}>
							{addNewButton && (
								<Link to={routeKey.contractsCreate}>
									<Button icon={<PlusOutlined />} type='primary'>
										Add new
									</Button>
								</Link>
							)}
						</Col>
						{/* <Col>
							{onTabChange && (
								<Tabs
									defaultActiveKey='PROCESSING'
									activeKey={activeKey}
									onChange={onTabChange}
									items={tabContractStatusConfig.map((item) => item)}
								/>
							)}
						</Col> */}
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

export default CustomCTable;
