import { Button, Input, InputNumber } from 'antd';

export const formConfig = [
	{
		label: 'Name',
		name: 'nameOfEmployee',
		type: 'text',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'Singed Date',
		name: 'singedDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'Start Date',
		name: 'startDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'End Date',
		name: 'endDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'Base Salary',
		name: 'base',
		type: 'number',
		rules: [
			{ type: 'number', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
];
