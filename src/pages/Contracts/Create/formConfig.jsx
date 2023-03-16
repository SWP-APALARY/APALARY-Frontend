import { Button, Input, InputNumber } from 'antd';

export const formConfig = [
	{
		label: 'Name',
		name: 'nameOfEmployee',
		type: 'text',
		rules: [{ required: true, message: 'Please input name!' }],
	},
	{
		label: 'Singed Date',
		name: 'singedDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input day!' }],
	},
	{
		label: 'Start Date',
		name: 'startDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input day!' }],
	},
	{
		label: 'End Date',
		name: 'endDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input day!' }],
	},
	{
		label: 'Base Salary',
		name: 'base',
		type: 'number',
		rules: [
			{ type: 'number', min: 0, message: 'Please, Enter a valid number!' },
			{ required: true, message: 'Please input a valid number!' },
		],
	},
];
