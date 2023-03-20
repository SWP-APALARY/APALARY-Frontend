import { Table, Row, Col, Button, Tabs, Space } from 'antd';

import Box from '../../../components/Box';
import SearchBar from '../../../components/SearchBar';
import { tabSalaryMonthConfig, tabSalaryYearConfig } from '../../../config/TabsConfig';

export const CustomSTable = ({
	columns,
	onSearch,
	activeKey1,
	activeKey2,
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
									defaultActiveKey='2023'
									activeKey={activeKey1}
									onChange={onTabChange}
									items={tabSalaryYearConfig.map((item) => item)}
								/>
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
				<Col>
					{onTabChange && (
						<Tabs
							defaultActiveKey='1'
							activeKey={activeKey2}
							onChange={onTabChange}
							items={tabSalaryMonthConfig.map((item) => item)}
						/>
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

export default CustomSTable;
