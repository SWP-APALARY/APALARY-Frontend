import { routeKey } from '../../../components/Layout/ManagerItems';
import moneyConverter from '../../../utils/moneyConverter';

export const SalaryColumnConfig = [
	{
		title: 'Month',
		dataIndex: 'month',
		key: 'month',
	},
	{ title: 'Year', dataIndex: 'year', key: 'year' },
	{
		title: 'Total Amount',
		dataIndex: 'net',
		key: 'net',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
	},
	{
		title: 'Bonus',
		dataIndex: 'bonus',
		key: 'bonus',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
	},
	{
		title: 'Penalty',
		dataIndex: 'penalty',
		key: 'penalty',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
	},
	{
		title: 'Tax',
		dataIndex: 'tax',
		key: 'tax',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
	},
	{
		title: 'Total',
		dataIndex: 'total',
		key: 'total',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
	},
];
