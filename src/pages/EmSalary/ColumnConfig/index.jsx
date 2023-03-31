import { routeKey } from '../../../components/Layout/ManagerItems';
import moneyConverter from '../../../utils/moneyConverter';

export const SalaryColumnConfig = [
	{
		title: 'Month',
		dataIndex: 'month',
		key: 'month',
		sorter: (a, b) => a.month - b.month,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Year',
		dataIndex: 'year',
		key: 'year',
		sorter: (a, b) => a.year - b.year,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Net Receive',
		dataIndex: 'net',
		key: 'net',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.net - b.net,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Bonus',
		dataIndex: 'bonus',
		key: 'bonus',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.bonus - b.bonus,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Penalty',
		dataIndex: 'penalty',
		key: 'penalty',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.penalty - b.penalty,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Tax',
		dataIndex: 'tax',
		key: 'tax',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.tax - b.tax,
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Total',
		dataIndex: 'total',
		key: 'total',
		render: (text, record) => {
			return <span>{moneyConverter(text)} VNĐ</span>;
		},
		sorter: (a, b) => a.total - b.total,
		sortDirections: ['descend', 'ascend'],
	},
];
