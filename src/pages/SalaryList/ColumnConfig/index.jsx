import { Space } from 'antd';
import { Link } from 'react-router-dom';

import { routeKey } from '../../../components/Layout/ManagerItems';

export const SalaryListColumnConfig = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Receive',
		dataIndex: 'receive',
		key: 'receive',
		render: (text, record) => {
			return <span>{text} VND</span>;
		},
	},
	{
		title: 'Bonus',
		dataIndex: 'bonus',
		key: 'bonus',
		render: (text, record) => {
			return <span>{text} VND</span>;
		},
	},
	{
		title: 'Receive Date',
		dataIndex: 'receiveDate',
		key: 'receiveDate',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		render: (text, record) => {
			return (
				<Space size='middle'>
					<Link to={`${routeKey.employeesSalaries}/${record.id}`}>View</Link>
				</Space>
			);
		},
	},
];
